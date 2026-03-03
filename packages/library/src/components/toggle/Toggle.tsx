import { cn } from "@ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { InputHTMLAttributes } from "react";

const toggleVariants = cva([
  "relative",
  "rounded-full",
  "transition-all",
  "duration-200",
  "ease-in-out",
  "bg-inz-greyscale-80",
  "peer-checked:bg-inz-primary-50",
  "peer-focus-visible:outline-none",
  "peer-focus-visible:ring-2",
  "peer-focus-visible:ring-inz-primary-40",
  "peer-focus-visible:ring-offset-2",
]);

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof toggleVariants> {
  /**
   * Toggle의 고유 식별자
   */
  id?: string;
  /**
   * Toggle 옆에 표시될 라벨 텍스트
   */
  label?: string;
  /**
   * 라벨 위치
   * @default "left"
   */
  labelPosition?: "left" | "right";
  /**
   * 필수 표시 여부 (라벨 옆에 * 표시)
   * @default false
   */
  required?: boolean;
  /**
   * Toggle 스위치에 적용할 CSS 클래스명
   */
  className?: string;
  /**
   * 컨테이너에 적용할 CSS 클래스명
   */
  containerClassName?: string;
}

/**
 * Toggle 스위치 컴포넌트
 *
 * on/off 상태를 전환하는 토글 스위치 컴포넌트입니다.
 *
 * @param id - Toggle의 고유 식별자
 * @param label - Toggle 옆에 표시될 라벨 텍스트
 * @param labelPosition - 라벨 위치: `left` (왼쪽) | `right` (오른쪽) (기본값: `left`)
 * @param required - 필수 표시 여부 (기본값: `false`)
 * @param checked - 토글 상태 (제어 컴포넌트)
 * @param defaultChecked - 기본 토글 상태 (비제어 컴포넌트)
 * @param onChange - 토글 상태 변경 시 실행할 콜백 함수
 * @param disabled - 비활성화 여부
 * @param className - Toggle 스위치에 적용할 CSS 클래스명
 * @param containerClassName - 컨테이너에 적용할 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 Toggle
 * <Toggle
 *   id="notifications"
 *   label="알림 받기"
 *   checked={notificationsEnabled}
 *   onChange={(e) => setNotificationsEnabled(e.target.checked)}
 * />
 *
 * // 라벨이 오른쪽에 있는 Toggle
 * <Toggle
 *   id="dark-mode"
 *   label="다크 모드"
 *   labelPosition="right"
 *   defaultChecked={true}
 * />
 *
 * // 필수 Toggle
 * <Toggle
 *   id="required-toggle"
 *   label="필수 옵션"
 *   required
 *   checked={isEnabled}
 *   onChange={(e) => setIsEnabled(e.target.checked)}
 * />
 * ```
 */
const Toggle = ({
  id,
  ref,
  label,
  defaultChecked,
  required,
  labelPosition = "left",
  containerClassName,
  className,
  ...rest
}: ToggleProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      {label && labelPosition === "left" && (
        <span
          className={cn(
            "text-inz-greyscale-10",
            "select-none",
            "disabled:text-inz-greyscale-50 disabled:cursor-not-allowed"
          )}
        >
          {label}
          {required && (
            <span className="text-body1 text-inz-red-50 ml-1">*</span>
          )}
        </span>
      )}
      <label
        className={cn(
          "relative inline-flex cursor-pointer items-center",
          labelPosition === "right" && "flex-row-reverse"
        )}
      >
        <input
          id={id}
          type="checkbox"
          role="switch"
          defaultChecked={defaultChecked}
          ref={ref}
          className={cn("peer sr-only", "disabled:cursor-not-allowed")}
          aria-invalid={undefined}
          tabIndex={rest.disabled ? -1 : 0}
          {...rest}
        />
        <div
          className={cn(
            toggleVariants(),
            "h-[24px] w-[45px]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        />
        <div
          className={cn(
            "absolute",
            "top-1/2",
            "-translate-y-1/2",
            "left-1",
            "rounded-full",
            "bg-white",
            "transition-all",
            "duration-200",
            "ease-in-out",
            "w-4",
            "h-4",
            "peer-checked:left-[calc(100%-20px)]"
          )}
        />
      </label>
      {label && labelPosition === "right" && (
        <span
          className={cn(
            "text-inz-greyscale-10",
            "select-none",
            "disabled:text-inz-greyscale-50 disabled:cursor-not-allowed"
          )}
        >
          {label}
          {required && (
            <span className="text-body1 text-inz-red-50 ml-1">*</span>
          )}
        </span>
      )}
    </div>
  );
};

export default Toggle;
