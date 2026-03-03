import { cn } from "@ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { InputHTMLAttributes } from "react";

const radioVariants = cva(
  [
    "appearance-none",
    "border border-inz-coolgrey-70",
    "bg-white",
    "rounded-full",
    "relative",
    'checked:after:content-[""]',
    "checked:after:absolute",
    "checked:after:left-[50%]",
    "checked:after:top-[50%]",
    "checked:after:-translate-x-1/2",
    "checked:after:-translate-y-1/2",
    "checked:after:rounded-full",
    "checked:after:bg-inz-primary-50",
    "focus:outline-none",
  ],
  {
    variants: {
      size: {
        sm: ["w-5 h-5", "checked:after:w-2.5 checked:after:h-2.5"],
        md: ["w-6 h-6", "checked:after:w-3 checked:after:h-3"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioLabelVariants = cva(
  [
    "text-inz-greyscale-10",
    "select-none",
    "disabled:cursor-not-allowed disabled:text-inz-greyscale-50",
  ],
  {
    variants: {
      size: {
        sm: "body4",
        md: "body2",
      },
    },
  }
);

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof radioVariants> {
  /**
   * 라디오 버튼 옆에 표시될 라벨 텍스트
   */
  label?: string;
  /**
   * 필수 표시 여부 (라벨 옆에 * 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 라디오 버튼의 고유 식별자
   */
  id?: string;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 라디오 버튼 컴포넌트
 *
 * 단일 선택을 위한 라디오 버튼 컴포넌트입니다. 같은 `name`을 가진 라디오 버튼들 중 하나만 선택할 수 있습니다.
 *
 * @param label - 라디오 버튼 옆에 표시될 라벨 텍스트
 * @param size - 라디오 버튼 크기: `sm` (20px) | `md` (24px) (기본값: `md`)
 * @param required - 필수 표시 여부 (기본값: `false`)
 * @param id - 라디오 버튼의 고유 식별자
 * @param name - 라디오 버튼 그룹 이름 (같은 name을 가진 라디오들은 그룹화됨)
 * @param value - 라디오 버튼의 값
 * @param checked - 선택 상태 (제어 컴포넌트)
 * @param defaultChecked - 기본 선택 상태 (비제어 컴포넌트)
 * @param onChange - 선택 상태 변경 시 실행할 콜백 함수
 * @param disabled - 비활성화 여부
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 라디오 버튼 그룹
 * <Radio
 *   id="option1"
 *   name="choice"
 *   value="option1"
 *   label="옵션 1"
 *   checked={selected === "option1"}
 *   onChange={(e) => setSelected(e.target.value)}
 * />
 * <Radio
 *   id="option2"
 *   name="choice"
 *   value="option2"
 *   label="옵션 2"
 *   checked={selected === "option2"}
 *   onChange={(e) => setSelected(e.target.value)}
 * />
 *
 * // 필수 라디오 버튼
 * <Radio
 *   id="required-radio"
 *   name="required"
 *   value="value"
 *   label="필수 선택"
 *   required
 *   size="sm"
 *   checked={isSelected}
 *   onChange={(e) => setIsSelected(e.target.checked)}
 * />
 * ```
 */
const Radio = ({
  ref,
  label,
  size = "md",
  required,
  className,
  onChange,
  ...rest
}: RadioProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <div className={cn("flex items-center gap-2")}>
      <input
        type="radio"
        ref={ref}
        className={cn(
          radioVariants({ size, className }),
          "checked:border-inz-primary-50",
          "disabled:border-inz-coolgrey-70 disabled:bg-inz-greyscale-80 disabled:cursor-not-allowed"
        )}
        aria-invalid={undefined}
        onChange={onChange}
        tabIndex={rest.disabled ? -1 : 0}
        {...rest}
      />
      {label && (
        <label
          htmlFor={rest.id}
          className={cn(radioLabelVariants({ size, className }))}
        >
          {label}
          {required && (
            <span className="text-body1 text-inz-red-50 ml-1">*</span>
          )}
        </label>
      )}
    </div>
  );
};

export default Radio;
