import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

import Indicator from "@ui/components/loading-indicator/Indicator";
import { cn } from "@ui/utils/cn";

const buttonVariants = cva(
  "flex items-center justify-center gap-x-1 rounded-sm cursor-pointer disabled:bg-inz-disable-fill disabled:text-inz-disable-text disabled:cursor-not-allowed disabled:border-none",
  {
    variants: {
      variant: {
        primary:
          "bg-inz-primary-50 text-white hover:bg-inz-primary-40 focus-visible:ring-inz-primary-40 active:bg-inz-primary-30",
        secondary:
          "border border-inz-primary-50 bg-white text-inz-primary-50 hover:bg-inz-coolgrey-95  focus-visible:ring-inz-primary-40 active:bg-inz-primary-90 active:border-inz-primary-50",
        tertiary:
          "border border-inz-coolgrey-70 bg-inz-coolgrey-100 text-inz-greyscale-30 hover:border-inz-coolgrey-50 focus-visible:ring-inz-greyscale-30 active:bg-inz-greyscale-95 active:border-inz-greyscale-50",
        text: "text-inz-primary-50 hover:text-inz-primary-40 focus-visible:ring-inz-primary-40 active:text-inz-primary-30 disabled:text-inz-disable-text disabled:bg-transparent",
      },
      size: {
        lg: "h-[52px] px-8 py-3 heading3",
        md: "h-[48px] px-8 py-[11px] title1",
        sm: "h-[40px] px-[24px] py-2 title3",
      },
      withIcon: {
        true: "",
        false: "",
      },
      iconPosition: {
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      {
        withIcon: true,
        iconPosition: "left",
        size: "sm",
        variant: ["primary", "secondary", "tertiary"],
        className: "pl-4 pr-6",
      },
      {
        withIcon: true,
        iconPosition: "right",
        size: "sm",
        variant: ["primary", "secondary", "tertiary"],
        className: "pl-6 pr-4",
      },
      {
        withIcon: true,
        iconPosition: "left",
        size: "md",
        variant: ["primary", "secondary", "tertiary"],
        className: "pl-6 pr-8",
      },
      {
        withIcon: true,
        iconPosition: "right",
        size: "md",
        variant: ["primary", "secondary", "tertiary"],
        className: "pl-8 pr-6",
      },
      {
        withIcon: true,
        iconPosition: "left",
        size: "lg",
        variant: ["primary", "secondary", "tertiary"],
        className: "pl-6 pr-8",
      },
      {
        withIcon: true,
        iconPosition: "right",
        size: "lg",
        variant: ["primary", "secondary", "tertiary"],
        className: "pl-8 pr-6",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface StandardButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 버튼에 표시할 아이콘 요소
   * @example
   * ```tsx
   * <StandardButton icon={<IconComponent size={20} />}>
   *   버튼
   * </StandardButton>
   * ```
   */
  icon?: ReactNode;
  /**
   * 아이콘이 표시될 위치
   * @default "left"
   */
  iconPosition?: "left" | "right";
  /**
   * 버튼 내부에 표시될 텍스트 또는 요소
   */
  children?: ReactNode;
  /**
   * 로딩 상태 표시 여부
   * - `true`일 경우 버튼이 비활성화되고 로딩 인디케이터가 표시됩니다
   * @default false
   */
  isLoading?: boolean;
}

/**
 * 표준 버튼 컴포넌트
 *
 * 다양한 스타일과 크기의 버튼을 제공하며, 아이콘과 로딩 상태를 지원합니다.
 *
 * @param variant - 버튼 스타일: `primary` | `secondary` | `tertiary` | `text` (기본값: `primary`)
 * @param size - 버튼 크기: `sm` (40px) | `md` (48px) | `lg` (52px) (기본값: `md`)
 * @param icon - 표시할 아이콘 컴포넌트
 * @param iconPosition - 아이콘 위치 (기본값: `left`)
 * @param isLoading - 로딩 상태 표시 여부 (기본값: `false`)
 * @param disabled - 버튼 비활성화 여부
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <StandardButton variant="primary" size="md">
 *   확인
 * </StandardButton>
 *
 * // 아이콘과 함께 사용
 * <StandardButton
 *   variant="secondary"
 *   icon={<PlusIcon />}
 *   iconPosition="left"
 * >
 *   추가하기
 * </StandardButton>
 *
 * // 로딩 상태
 * <StandardButton variant="primary" isLoading>
 *   저장 중...
 * </StandardButton>
 * ```
 */
export const StandardButton = ({
  className,
  variant,
  size,
  icon = null,
  iconPosition = "left",
  children,
  isLoading = false,
  ...props
}: StandardButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
          withIcon: !!icon,
          iconPosition,
        }),
        isLoading && "bg-inz-primary-30",
        variant === "text" && "p-0" // text variant는 다른 컴포넌트로 처리되어야 함 (일관성 해침)
      )}
      {...props}
    >
      {isLoading ? (
        <Indicator size={24} />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="flex size-4 items-center justify-center">
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="flex size-4 items-center justify-center">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};
