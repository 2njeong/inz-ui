import SearchIcon from "@ui/icons/SearchIcon";
import { cn } from "@ui/utils/cn";
import { useRef, useState } from "react";

import InputClearButton from "@ui/components/inputs/InputClearButton";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * placeholder 텍스트
   * @default "검색어 입력"
   */
  placeholder?: string;
  /**
   * 입력 필드의 값 (필수)
   */
  value: string;
  /**
   * 입력 값 변경 시 실행할 콜백 함수 (필수)
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 검색 버튼 클릭 또는 Enter 키 입력 시 실행할 콜백 함수 (필수)
   */
  onSearch: () => void;
  /**
   * 지우기 버튼 클릭 시 실행할 콜백 함수 (필수)
   */
  onClear: () => void;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 자동 포커스 여부
   * @default false
   */
  autoFocus?: boolean;
  /**
   * 입력 필드 크기
   * @default "sm"
   */
  inputSize?: "sm" | "md";
}

/**
 * 검색 입력 필드 컴포넌트
 *
 * 검색 아이콘과 지우기 버튼이 포함된 검색 입력 필드 컴포넌트입니다.
 *
 * @param value - 입력 필드의 값 (필수)
 * @param onChange - 입력 값 변경 시 실행할 콜백 함수 (필수)
 * @param onSearch - 검색 버튼 클릭 또는 Enter 키 입력 시 실행할 콜백 함수 (필수)
 * @param onClear - 지우기 버튼 클릭 시 실행할 콜백 함수 (필수)
 * @param placeholder - placeholder 텍스트 (기본값: `검색어 입력`)
 * @param inputSize - 입력 필드 크기: `sm` (40px) | `md` (48px) (기본값: `sm`)
 * @param disabled - 비활성화 여부 (기본값: `false`)
 * @param autoFocus - 자동 포커스 여부 (기본값: `false`)
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 검색 입력
 * <SearchInput
 *   value={searchTerm}
 *   onChange={(e) => setSearchTerm(e.target.value)}
 *   onSearch={() => handleSearch(searchTerm)}
 *   onClear={() => setSearchTerm("")}
 * />
 *
 * // 큰 크기 검색 입력
 * <SearchInput
 *   value={query}
 *   onChange={(e) => setQuery(e.target.value)}
 *   onSearch={handleSearch}
 *   onClear={() => setQuery("")}
 *   inputSize="md"
 *   placeholder="상품명으로 검색"
 *   autoFocus
 * />
 * ```
 */
const SearchInput = ({
  placeholder = "검색어 입력",
  value = "",
  onChange,
  onSearch,
  onClear,
  className = "",
  disabled = false,
  autoFocus = false,
  inputSize = "sm",
  ...props
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showClearButton = value && !disabled;

  return (
    <div className={className}>
      <div
        className={cn(
          "border-inz-line-border bg-inz-background-container disabled:bg-inz-coolgrey-95 border-1 flex w-full items-center gap-x-1 rounded-sm px-3 py-2 outline-none",
          inputSize === "sm" ? "h-10" : "h-12",
          isFocused && "border-inz-primary-50"
        )}
      >
        <input
          id="search-input"
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
              setIsFocused(false);
            }
          }}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(
            " text-inz-text-body placeholder:text-inz-text-caption min-w-0 flex-1 outline-none",
            inputSize === "sm"
              ? "body4 placeholder-body4"
              : "body2 placeholder-body2"
          )}
          {...props}
        />
        {showClearButton ? (
          <InputClearButton onClick={onClear} />
        ) : (
          <div className="size-6" />
        )}
        <button
          type="button"
          onClick={onSearch}
          disabled={disabled}
          className="flex size-6 items-center justify-center"
        >
          <SearchIcon
            size={inputSize === "sm" ? 18 : 24}
            color="var(--color-inz-coolgrey-50)"
            className="flex-shrink-0 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
