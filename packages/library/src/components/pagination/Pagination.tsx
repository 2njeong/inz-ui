import { useEffect, useState } from "react";

import {
  PaginationBtn,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as Wrapper,
} from "@ui/components/pagination/PaginationCompound";

interface PaginationProps {
  /**
   * 전체 아이템 개수 (필수)
   */
  totalCount: number;
  /**
   * 한 페이지당 아이템 개수 (필수)
   */
  pageSize: number;
  /**
   * 한 번에 표시할 페이지 버튼 개수
   * @default 5
   */
  pageButtonCount?: number;

  /**
   * 페이지 변경 시 호출되는 함수
   */
  onPageChange: (page: number) => void;
}

/**
 * 전체 아이템 개수와 페이지당 아이템 개수로 마지막 페이지 번호를 반환합니다.
 * @param totalCount 전체 아이템 개수
 * @param pageSize 한 페이지당 아이템 개수
 * @returns 마지막 페이지 번호
 */
const getLastPage = (totalCount: number, pageSize: number) => {
  return Math.max(1, Math.ceil(totalCount / pageSize));
};

/**
 * 현재 페이지가 속한 그룹의 인덱스를 반환합니다.
 * @param page 현재 페이지 번호
 * @returns 그룹 인덱스
 */
const getPageGroup = (page: number, pageButtonCount: number) => {
  return Math.floor((page - 1) / pageButtonCount);
};

/**
 * 시작~끝 번호까지의 페이지 번호 배열을 반환합니다.
 * @param start 시작 페이지 번호
 * @param end 끝 페이지 번호
 * @returns 페이지 번호 배열
 */
const getPageNumbers = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * URL의 search params에서 페이지 번호를 가져옵니다.
 * @returns 현재 페이지 번호
 */
const getCurrentPageFromURL = (): number => {
  const urlParams = new URLSearchParams(window.location.search);
  return Number(urlParams.get("page")) || 1;
};

/**
 * URL의 search params를 업데이트합니다.
 * @param page 업데이트할 페이지 번호
 */
const updateURLPage = (page: number): void => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.pushState({}, "", url.toString());
};

/**
 * 페이지네이션 컴포넌트
 *
 * URL의 search params를 사용하여 페이지 상태를 관리하는 페이지네이션 컴포넌트입니다.
 * 페이지 이동 시 URL이 자동으로 업데이트됩니다.
 *
 * @param totalCount - 전체 아이템 개수 (필수)
 * @param pageSize - 한 페이지당 아이템 개수 (필수)
 * @param pageButtonCount - 한 번에 표시할 페이지 버튼 개수 (기본값: `5`)
 *
 * @example
 * ```tsx
 * // 기본 페이지네이션 (URL 파라미터 사용)
 * <Pagination totalCount={100} pageSize={10} />
 *
 * // 페이지 버튼 개수 지정
 * <Pagination totalCount={200} pageSize={20} pageButtonCount={10} />
 * ```
 */
const Pagination = ({
  totalCount,
  pageSize,
  pageButtonCount = 5,
  onPageChange,
}: PaginationProps) => {
  const [page, setPageState] = useState<number>(() => getCurrentPageFromURL());
  const lastPage = getLastPage(totalCount, pageSize);

  // URL 변경을 감지하여 페이지 상태를 동기화
  useEffect(() => {
    const handlePopState = () => {
      setPageState(getCurrentPageFromURL());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const groupIndex = getPageGroup(page, pageButtonCount);
  const groupStart = groupIndex * pageButtonCount + 1;
  const groupEnd = Math.min(groupStart + pageButtonCount - 1, lastPage);
  const pageNumbers = getPageNumbers(groupStart, groupEnd);

  const isFirstGroup = groupStart === 1;
  const isLastGroup = groupEnd === lastPage;

  const setPage = (num: number) => {
    setPageState(num);
    updateURLPage(num);
    onPageChange(num);
  };

  const handlePrevGroup = () => {
    if (!isFirstGroup) {
      setPage(groupStart - pageButtonCount);
    }
  };

  const handleNextGroup = () => {
    if (!isLastGroup) {
      setPage(groupEnd + 1);
    }
  };

  return (
    <Wrapper>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={isFirstGroup}
            onClick={handlePrevGroup}
          />
        </PaginationItem>
        {pageNumbers.map((num) => (
          <PaginationItem key={num}>
            <PaginationBtn
              onClick={() => {
                setPage(num);
              }}
              isSelected={page === num}
            >
              {num}
            </PaginationBtn>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext disabled={isLastGroup} onClick={handleNextGroup} />
        </PaginationItem>
      </PaginationContent>
    </Wrapper>
  );
};

export default Pagination;
