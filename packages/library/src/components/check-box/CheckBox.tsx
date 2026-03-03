import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { InputHTMLAttributes } from "react";

import { cn } from "@ui/utils/cn";

const checkBoxVariants = cva(
  [
    "appearance-none",
    "shrink-0",
    "border",
    "bg-white",
    "rounded-xs",
    "relative",
    'checked:after:content-[""]',
    "checked:after:absolute",
    "checked:after:left-[50%]",
    "checked:after:top-[50%]",
    "checked:after:-translate-x-1/2",
    "checked:after:-translate-y-[60%]",
    "checked:after:border-l-2",
    "checked:after:border-b-2",
    "checked:after:border-white",
    "checked:after:rotate-[-45deg]",
    "focus:outline-none",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-inz-primary-40",
    "focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: {
        sm: "w-5 h-5 checked:after:w-2.5 checked:after:h-1.5",
        md: "w-6 h-6 checked:after:w-3 checked:after:h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const checkBoxLabelVariants = cva(
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

interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkBoxVariants> {
  /**
   * 체크박스 옆에 표시될 라벨 텍스트
   */
  label?: string;
  /**
   * 필수 표시 여부 (라벨 옆에 * 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 체크박스의 고유 식별자
   */
  id?: string;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 체크박스 컴포넌트
 *
 * 단일 또는 다중 선택을 위한 체크박스 컴포넌트입니다.
 *
 * @param label - 체크박스 옆에 표시될 라벨 텍스트
 * @param size - 체크박스 크기: `sm` (20px) | `md` (24px) (기본값: `md`)
 * @param required - 필수 표시 여부 (기본값: `false`)
 * @param id - 체크박스의 고유 식별자
 * @param checked - 체크 상태 (제어 컴포넌트)
 * @param defaultChecked - 기본 체크 상태 (비제어 컴포넌트)
 * @param onChange - 체크 상태 변경 시 실행할 콜백 함수
 * @param disabled - 비활성화 여부
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 체크박스
 * <CheckBox
 *   id="agree"
 *   label="이용약관에 동의합니다"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 * />
 *
 * // 필수 체크박스
 * <CheckBox
 *   id="required-check"
 *   label="필수 항목"
 *   required
 *   size="sm"
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 * />
 *
 * // 비제어 컴포넌트
 * <CheckBox
 *   id="default-check"
 *   label="기본 체크됨"
 *   defaultChecked={true}
 * />
 * ```
 */
const CheckBox = ({
  ref,
  label,
  size = "md",
  required,
  className,
  ...rest
}: CheckBoxProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <div className={cn("flex items-center gap-2")}>
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          checkBoxVariants({ size, className }),
          "checked:border-inz-primary-50 checked:bg-inz-primary-50",
          "border-inz-coolgrey-70 disabled:bg-inz-greyscale-80 disabled:cursor-not-allowed",
          "disabled:checked:border-inz-coolgrey-70 disabled:checked:bg-inz-greyscale-80"
        )}
        aria-invalid={undefined}
        tabIndex={rest.disabled ? -1 : 0}
        {...rest}
      />
      {label && (
        <label
          htmlFor={rest.id}
          className={cn(checkBoxLabelVariants({ size, className }))}
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

export default CheckBox;
