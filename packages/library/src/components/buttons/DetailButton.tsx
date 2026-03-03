import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, Ref } from "react";

import { cn } from "@ui/utils/cn";

const buttonVariants = cva(
  "flex items-center cursor-pointer justify-center px-1 py-0.5 underline disabled:text-inz-disable-fill",
  {
    variants: {
      variant: {
        primary:
          "text-inz-primary-50 hover:text-inz-primary-40 focus-visible:ring-inz-primary-40 active:text-inz-primary-40",
        secondary:
          "text-inz-coolgrey-40 hover:text-inz-coolgrey-20 focus-visible:ring-inz-coolgrey-30 active:text-inz-coolgrey-20",
      },
      size: {
        md: "h-5 body4",
        sm: "h-4 details2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface DetailButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 버튼 ref
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * 버튼 내부에 표시될 텍스트
   */
  children?: ReactNode;
}

/**
 * 상세 정보 링크 스타일 버튼 컴포넌트
 *
 * 텍스트에 밑줄이 있는 링크 형태의 버튼입니다. 상세 정보 보기나 더 보기 등의 용도로 사용됩니다.
 *
 * @param variant - 버튼 색상: `primary` (주요 색상) | `secondary` (회색) (기본값: `primary`)
 * @param size - 버튼 크기: `sm` | `md` (기본값: `md`)
 * @param children - 버튼에 표시할 텍스트
 * @param disabled - 버튼 비활성화 여부
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <DetailButton onClick={handleClick}>더 보기</DetailButton>
 *
 * // Secondary 스타일
 * <DetailButton variant="secondary" size="sm">
 *   상세 정보
 * </DetailButton>
 * ```
 */
export const DetailButton = ({
  ref,
  className,
  variant,
  size,
  children,
  ...props
}: DetailButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};
