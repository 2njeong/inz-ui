import { cva } from "class-variance-authority";
import { useLayoutEffect, useRef, useState } from "react";

import DropdownFooter from "@ui/components/dropdown/DropdownFooter";
import DropdownIcon from "@ui/components/dropdown/DropdwonIcon";
import Label, { AlignMode } from "@ui/components/texts/Label";
import { cn } from "@ui/utils/cn";

/**
 * 드롭다운 옵션 타입
 */
export interface DropdownOption {
  /**
   * 옵션의 고유 식별자 (필수)
   */
  id: number | string;
  /**
   * 옵션에 표시될 텍스트 (필수)
   */
  name: string;
  /**
   * 옵션의 값 (필수)
   */
  value: string;
}

const dropdownVariants = cva(
  "body2 w-full whitespace-nowrap rounded-sm border border-inz-line-border bg-inz-background-container px-4 py-3 pr-10 text-inz-greyscale-50 outline-none hover:border-inz-primary-50 focus:border-inz-primary-50",
  {
    variants: {
      dropdownSize: {
        sm: "body4 px-3 py-[10px] h-10",
        lg: "body2 px-4 py-3 h-12",
      },
    },
    defaultVariants: {
      dropdownSize: "sm",
    },
  }
);

const dropdownOptionVariants = cva(
  "rounded-sm border-transparent text-inz-text-body outline-none hover:bg-inz-primary-95 focus:border focus:border-inz-primary-50 focus:text-inz-primary-50 focus:outline-none",
  {
    variants: {
      dropdownSize: {
        sm: "body4 px-3 py-[10px] h-10",
        lg: "body2 px-4 py-3 h-12",
      },
    },
    defaultVariants: {
      dropdownSize: "sm",
    },
  }
);

export interface DropdownProps {
  /**
   * 유효성 검사 실패 여부
   * @default false
   */
  isInvalid?: boolean;
  /**
   * 에러 메시지 텍스트
   */
  invalidText?: string;
  /**
   * 라벨에 표시될 텍스트
   */
  labelText?: string;
  /**
   * 드롭다운 옵션 배열 (필수)
   */
  options: DropdownOption[];
  /**
   * 선택된 값
   */
  value?: string;
  /**
   * 값 변경 시 실행할 콜백 함수
   */
  onChange?: (value: string) => void;
  /**
   * 드롭다운 크기
   * @default "sm"
   */
  dropdownSize?: "sm" | "lg";
  /**
   * placeholder 텍스트
   * @default "선택하세요"
   */
  placeholder?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
  /**
   * 라벨 정렬 모드
   * @default "vertical"
   */
  alignMode?: AlignMode;
  /**
   * 필수 표시 여부
   */
  ShowAsterisk?: boolean;
  /**
   * 드롭다운 최소 너비 (CSS 단위)
   */
  minDropdownWidth?: string;
}

/**
 * 드롭다운 컴포넌트
 *
 * 옵션 목록에서 값을 선택할 수 있는 드롭다운 컴포넌트입니다. 키보드 내비게이션을 지원합니다.
 *
 * @param options - 드롭다운 옵션 배열 (필수)
 * @param value - 선택된 값
 * @param onChange - 값 변경 시 실행할 콜백 함수
 * @param dropdownSize - 드롭다운 크기: `sm` (40px) | `lg` (48px) (기본값: `sm`)
 * @param placeholder - placeholder 텍스트 (기본값: `선택하세요`)
 * @param disabled - 비활성화 여부 (기본값: `false`)
 * @param labelText - 라벨에 표시될 텍스트
 * @param alignMode - 라벨 정렬 모드 (기본값: `vertical`)
 * @param ShowAsterisk - 필수 표시 여부
 * @param isInvalid - 유효성 검사 실패 여부 (기본값: `false`)
 * @param invalidText - 에러 메시지 텍스트
 * @param className - 추가 CSS 클래스명
 * @param minDropdownWidth - 드롭다운 최소 너비
 *
 * @example
 * ```tsx
 * // 기본 드롭다운
 * const options = [
 *   { id: 1, name: '옵션 1', value: 'option1' },
 *   { id: 2, name: '옵션 2', value: 'option2' },
 * ];
 * <Dropdown
 *   options={options}
 *   value={selected}
 *   onChange={(value) => setSelected(value)}
 * />
 *
 * // 필수 드롭다운 (에러 메시지 포함)
 * <Dropdown
 *   labelText="카테고리"
 *   ShowAsterisk
 *   options={categories}
 *   value={category}
 *   onChange={setCategory}
 *   isInvalid={!category}
 *   invalidText="카테고리를 선택해주세요"
 *   dropdownSize="lg"
 * />
 * ```
 */
const Dropdown = ({
  isInvalid,
  invalidText,
  options,
  labelText,
  value,
  onChange,
  dropdownSize = "sm",
  placeholder = "선택하세요",
  disabled,
  className,
  alignMode = "vertical",
  ShowAsterisk,
  minDropdownWidth,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // 활성화된 옵션의 id
  const activeId =
    highlighted !== null && options[highlighted]
      ? `dropdown-option-${String(options[highlighted].id)}`
      : undefined;

  // value 변경 시 하이라이트 동기화
  useLayoutEffect(() => {
    const idx = options.findIndex((opt) => opt.value === value);
    setHighlighted(idx >= 0 ? idx : null);
  }, [value, options]);

  // 키보드 내비게이션 (aria-activedescendant)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Escape") setIsOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) => {
        const idx = prev === null ? 0 : Math.min(options.length - 1, prev + 1);
        return idx;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => {
        const idx = prev === null ? options.length - 1 : Math.max(0, prev - 1);
        return idx;
      });
    }
    if ((e.key === "Enter" || e.key === " ") && highlighted !== null) {
      e.preventDefault();
      onChange?.(options[highlighted]?.value ?? "");
      setIsOpen(false);
    }
  };

  const selected = options.find((opt) => opt.value === value);

  // 외부 클릭/포커스 아웃: onBlur로 처리
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <Label
      showAsterisk={ShowAsterisk}
      alignMode={alignMode}
      labelText={labelText}
    >
      <div className="relative w-full" tabIndex={-1} onBlur={handleBlur}>
        <button
          type="button"
          className={
            dropdownVariants({ dropdownSize }) +
            (className ? ` ${className}` : "") +
            (isInvalid ? " border-inz-red-50" : "") +
            (disabled ? " pointer-events-none opacity-50" : "") +
            " flex items-center justify-between"
          }
          style={{ minWidth: minDropdownWidth }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="dropdown-listbox"
          aria-invalid={isInvalid}
          onClick={() => {
            setIsOpen((v) => !v);
          }}
          disabled={disabled}
          tabIndex={0}
        >
          <span
            className={
              selected
                ? "text-inz-greyscale-10"
                : "text-inz-greyscale-50"
            }
          >
            {selected ? selected.name : placeholder}
          </span>
          <DropdownIcon open={isOpen} />
        </button>
        {isOpen && (
          <ul
            ref={(node) => {
              if (node) node.focus();
              listRef.current = node;
            }}
            id="dropdown-listbox"
            className="border-inz-line-border absolute z-10 mt-1 max-h-[200px] w-full overflow-y-auto rounded-sm border bg-white shadow-lg"
            role="listbox"
            tabIndex={0}
            aria-activedescendant={activeId}
            onKeyDown={handleKeyDown}
          >
            {options.map((opt, idx) => (
              <li
                id={`dropdown-option-${String(opt.id)}`}
                key={opt.id}
                role="option"
                aria-selected={value === opt.value}
                className={cn(
                  dropdownOptionVariants({ dropdownSize }),
                  idx === highlighted && "bg-inz-primary-95",
                  value === opt.value && "text-inz-primary-50"
                )}
                onMouseEnter={() => {
                  setHighlighted(idx);
                }}
                onMouseDown={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <DropdownFooter invalidText={invalidText} />
    </Label>
  );
};

export default Dropdown;
