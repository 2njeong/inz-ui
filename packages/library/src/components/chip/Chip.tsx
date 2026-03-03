import { cva, type VariantProps } from "class-variance-authority";

import DeleteSolidIcon from "@ui/icons/DeleteSolidIcon";
import { cn } from "@ui/utils/cn";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-sm border border-inz-coolgrey-70 bg-white text-inz-coolgrey-20 transition-all cursor-pointer select-none text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inz-primary-40 focus-visible:border-none",
  {
    variants: {
      size: {
        sm: "body3 h-8",
        md: "body1 h-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// 공통 ChipProps 타입
interface BaseChipProps extends VariantProps<typeof chipVariants> {
  /**
   * Chip의 고유 식별자 (필수)
   */
  id: string;
  /**
   * Chip에 표시될 텍스트 (필수)
   */
  label: string;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 단일 선택 Chip
 */
interface SelectChipProps extends BaseChipProps {
  /**
   * Chip 타입: `select` (단일 선택)
   */
  type: "select";
  /**
   * 선택 상태 여부
   * @default false
   */
  selected?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * 다중 선택 Chip
 */
interface MultiSelectChipProps extends BaseChipProps {
  /**
   * Chip 타입: `multi-select` (다중 선택)
   */
  type: "multi-select";
  /**
   * 선택 상태 여부
   * @default false
   */
  selected?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * 제안/추천 Chip
 */
interface SuggestionChipProps extends BaseChipProps {
  /**
   * Chip 타입: `suggestion` (제안/추천)
   */
  type: "suggestion";
  /**
   * 선택 상태 여부
   * @default false
   */
  selected?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
  /**
   * Chip 앞에 표시할 아이콘
   */
  icon?: React.ReactNode;
}

/**
 * 입력/삭제 가능한 Chip
 */
interface InputChipProps extends BaseChipProps {
  /**
   * Chip 타입: `input` (입력/삭제 가능)
   */
  type: "input";
  /**
   * 삭제 버튼 클릭 시 실행할 콜백
   */
  onDelete: () => void;
  /**
   * 편집 모드 토글 시 실행할 콜백
   */
  onEdit: () => void;
  /**
   * 입력 값 변경 시 실행할 콜백
   */
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 편집 모드 여부
   */
  isEditing: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
}

type ChipProps =
  | SelectChipProps
  | MultiSelectChipProps
  | SuggestionChipProps
  | InputChipProps;

/**
 * Chip 컴포넌트
 *
 * 다양한 용도의 칩 컴포넌트입니다. 단일 선택, 다중 선택, 제안, 입력 등 4가지 타입을 제공합니다.
 *
 * @param type - Chip 타입: `select` (단일 선택) | `multi-select` (다중 선택) | `suggestion` (제안) | `input` (입력/삭제)
 * @param id - Chip의 고유 식별자 (필수)
 * @param label - Chip에 표시될 텍스트 (필수)
 * @param size - Chip 크기: `sm` | `md` (기본값: `md`)
 * @param selected - 선택 상태 여부 (select, multi-select, suggestion 타입)
 * @param disabled - 비활성화 여부
 * @param onClick - 클릭 이벤트 핸들러 (select, multi-select, suggestion 타입)
 * @param icon - 아이콘 (suggestion 타입에서 사용)
 * @param onDelete - 삭제 핸들러 (input 타입에서 필수)
 * @param onEdit - 편집 모드 토글 핸들러 (input 타입에서 필수)
 * @param onInputChange - 입력 변경 핸들러 (input 타입에서 필수)
 * @param isEditing - 편집 모드 여부 (input 타입에서 필수)
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 단일 선택 Chip
 * <Chip
 *   type="select"
 *   id="chip-1"
 *   label="옵션 1"
 *   selected={selected}
 *   onClick={() => setSelected(!selected)}
 * />
 *
 * // 다중 선택 Chip
 * <Chip
 *   type="multi-select"
 *   id="chip-2"
 *   label="태그 1"
 *   selected={tags.includes("tag1")}
 *   onClick={() => toggleTag("tag1")}
 * />
 *
 * // 제안 Chip (아이콘 포함)
 * <Chip
 *   type="suggestion"
 *   id="chip-3"
 *   label="인기 태그"
 *   icon={<StarIcon />}
 *   onClick={handleSuggestion}
 * />
 *
 * // 입력 Chip
 * <Chip
 *   type="input"
 *   id="chip-4"
 *   label={value}
 *   isEditing={isEditing}
 *   onEdit={() => setIsEditing(!isEditing)}
 *   onInputChange={(e) => setValue(e.target.value)}
 *   onDelete={() => handleDelete()}
 * />
 * ```
 */
const Chip = ({
  ref,
  ...props
}: ChipProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const { type, label, size, className, disabled } = props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (type === "input" || type === "suggestion") return;
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        props.onClick?.();
        break;
      case "Escape":
        e.preventDefault();
        // 현재 포커스된 요소에서 blur()
        e.currentTarget.blur();
        break;
    }
  };

  const disabledClass =
    "cursor-not-allowed bg-inz-greyscale-80 border-inz-greyscale-80 text-inz-greyscale-50";

  switch (type) {
    case "select":
    case "multi-select": {
      const { selected = false, disabled = false, onClick } = props;

      // select/multi-select 전용 호버 스타일
      const hoverClass =
        type === "select"
          ? "hover:bg-inz-greyscale-90 hover:border-inz-coolgrey-70"
          : "hover:bg-white hover:border-inz-coolgrey-50";

      // 타입별 selected 스타일 설정
      const getSelectedStyles = () => {
        if (!selected) return "";
        return type === "select"
          ? "bg-inz-primary-50 border-inz-primary-50 text-white"
          : "bg-white border-inz-primary-50 text-inz-primary-50";
      };

      return (
        <div
          role="button"
          ref={ref}
          onClick={onClick}
          className={cn(
            chipVariants({ size }),
            "px-2.5 py-1.5",
            !disabled && !selected && hoverClass,
            getSelectedStyles(),
            disabled && disabledClass,
            className
          )}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKeyDown}
          aria-disabled={disabled}
        >
          <span className="truncate">{label}</span>
        </div>
      );
    }

    case "suggestion": {
      const { disabled = false, selected = false, onClick, icon } = props;

      return (
        <div
          role="button"
          onClick={onClick}
          ref={ref}
          className={cn(
            chipVariants({ size: "sm" }),
            "gap-1 px-2.5 py-2",
            "hover:border-inz-coolgrey-50 hover:bg-inz-greyscale-95",
            selected && "bg-inz-greyscale-90",
            disabled && disabledClass,
            className
          )}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
        >
          {icon}
          <span className="truncate">{label}</span>
        </div>
      );
    }

    case "input": {
      const {
        disabled = false,
        onDelete,
        onEdit,
        isEditing,
        onInputChange,
      } = props;

      return (
        <div
          ref={ref}
          className={cn(
            chipVariants({ size: "sm" }),
            "gap-1 px-2.5 py-2",
            "border-inz-primary-90 bg-inz-primary-90",
            disabled && disabledClass,
            className
          )}
          tabIndex={disabled ? -1 : 0}
          onClick={disabled ? undefined : onEdit}
          aria-disabled={disabled}
        >
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent outline-none"
              onChange={onInputChange}
              value={label}
              size={label.length + 1}
              autoFocus
              onBlur={onEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  onEdit();
                }
              }}
            />
          ) : (
            <span className="truncate">{label}</span>
          )}
          <DeleteSolidIcon
            size={20}
            bgColor="white"
            strokeColor="var(--color-inz-coolgrey-50)"
            className="disabled:stroke-inz-coolgrey-60"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      );
    }

    default:
      return null;
  }
};

export default Chip;
