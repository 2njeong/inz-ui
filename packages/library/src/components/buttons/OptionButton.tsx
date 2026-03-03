import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, Ref } from "react";

import { cn } from "@ui/utils/cn";

import Indicator from "@ui/components/loading-indicator/Indicator";

const buttonVariants = cva(
  "flex items-center cursor-pointer justify-center h-[28px] px-2 py-1 rounded-sm body3 disabled:bg-inz-disable-fill disabled:text-inz-disable-text min-w-10",
  {
    variants: {
      variant: {
        default: "bg-inz-primary-50 text-white",
        edit: "bg-inz-greyscale-100 text-inz-primary-50 border-[1px] border-inz-greyscale-80",
        cancel:
          "bg-inz-greyscale-100 text-inz-status-danger border-[1px] border-inz-greyscale-80",
        copy: "bg-inz-greyscale-100 text-inz-greyscale-30 border-[1px] border-inz-greyscale-80",
        dark: "bg-inz-coolgrey-30 text-white border-[1px] border-inz-coolgrey-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface OptionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 버튼 ref
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * 버튼 내부에 표시될 텍스트 또는 요소
   */
  children?: ReactNode;
  /**
   * 로딩 상태 표시 여부
   * - `true`일 경우 로딩 인디케이터가 표시됩니다
   * @default false
   */
  isLoading?: boolean;
}

/**
 * 옵션 액션 버튼 컴포넌트
 *
 * 작은 크기의 옵션 버튼으로, 다양한 액션 타입을 제공합니다.
 *
 * @param variant - 버튼 스타일: `default` (주요 색상) | `edit` (편집) | `cancel` (취소) | `copy` (복사) | `dark` (어두운 배경) (기본값: `default`)
 * @param children - 버튼에 표시할 텍스트
 * @param isLoading - 로딩 상태 표시 여부 (기본값: `false`)
 * @param disabled - 버튼 비활성화 여부
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 옵션 버튼
 * <OptionButton variant="default" onClick={handleAction}>
 *   실행
 * </OptionButton>
 *
 * // 편집 버튼
 * <OptionButton variant="edit" onClick={handleEdit}>
 *   편집
 * </OptionButton>
 *
 * // 로딩 상태
 * <OptionButton variant="default" isLoading>
 *   처리 중...
 * </OptionButton>
 * ```
 */
export const OptionButton = ({
  ref,
  className,
  variant,
  children,
  isLoading,
  ...props
}: OptionButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {isLoading ? <Indicator size={16} /> : children}
    </button>
  );
};
