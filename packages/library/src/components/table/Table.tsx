import React from "react";

import EmptyListIcon from "@ui/icons/NoDataIcon";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "./TableCompound";

/**
 * 테이블 컬럼 정의
 */
export interface TableColumn<T> {
  /**
   * 컬럼의 고유 키 (필수)
   */
  key: string;
  /**
   * 헤더에 표시될 라벨 (필수)
   */
  label: string;
  /**
   * 각 행 데이터를 렌더링하는 함수 (필수)
   */
  render: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  /**
   * 테이블 컬럼 정의 배열 (필수)
   */
  columns: TableColumn<T>[];
  /**
   * 테이블에 표시할 데이터 배열 (필수)
   * 각 데이터 객체는 `id` 속성을 가져야 합니다
   */
  data: T[];
  /**
   * 행 클릭 시 실행할 콜백 함수
   */
  onRowClick?: (row: T) => void;
  /**
   * 데이터가 없을 때 표시할 메시지 조건
   * - 값이 제공되면 "검색 결과가 없습니다" 표시
   * - 값이 없으면 "목록이 없습니다" 표시
   */
  isEmptyCondition?: string;
}

/**
 * 테이블 컴포넌트
 *
 * 동적으로 컬럼과 데이터를 받아 테이블을 렌더링하는 컴포넌트입니다.
 *
 * @param columns - 테이블 컬럼 정의 배열 (필수)
 * @param data - 테이블에 표시할 데이터 배열 (필수)
 * @param onRowClick - 행 클릭 시 실행할 콜백 함수
 * @param isEmptyCondition - 데이터가 없을 때 표시할 메시지 조건
 *
 * @example
 * ```tsx
 * // 기본 테이블
 * const columns = [
 *   { key: 'name', label: '이름', render: (row) => row.name },
 *   { key: 'age', label: '나이', render: (row) => row.age },
 *   { key: 'action', label: '액션', render: () => <DeleteIcon /> },
 * ];
 * const data = [
 *   { id: 1, name: 'Alice', age: 30 },
 *   { id: 2, name: 'Bob', age: 25 },
 * ];
 * <Table columns={columns} data={data} />
 *
 * // 행 클릭 이벤트 포함
 * <Table
 *   columns={columns}
 *   data={data}
 *   onRowClick={(row) => console.log('클릭된 행:', row)}
 *   isEmptyCondition="검색"
 * />
 * ```
 */
const Table = <T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  isEmptyCondition,
}: TableProps<T>) => {
  return (
    <TableWrapper>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow
              key={row.id}
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(row);
                    }
                  : undefined
              }
              className={onRowClick ? "cursor-pointer" : undefined}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>{col.render(row)}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <tr
            data-slot="table-row"
            className="border-inz-line-table border-b last:border-b-0"
          >
            <td colSpan={columns.length} className="h-96 p-0">
              <div className="flex h-full flex-col items-center justify-center gap-y-5 py-40">
                <EmptyListIcon
                  size={148}
                  color="var(--color-inz-coolgrey-20)"
                />
                <p className="body2 text-inz-coolgrey-20">
                  {isEmptyCondition
                    ? "검색 결과가 없습니다"
                    : "목록이 없습니다"}
                </p>
              </div>
            </td>
          </tr>
        )}
      </TableBody>
    </TableWrapper>
  );
};

export default Table;
