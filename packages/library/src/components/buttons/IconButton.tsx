import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@ui/utils/cn";

const iconButtonVariants = cva(
  "flex items-center justify-center hover:bg-inz-greyscale-10/10 gap-x-1 rounded-sm cursor-pointer disabled:bg-inz-disable-fill disabled:text-inz-disable-text bg-transparent",
  {
    variants: {
      variant: {
        normal: "size-6",
        outline: "size-8 rounded-sm border-1 border-inz-line-border",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  }
);

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /**
   * 버튼에 표시할 아이콘 요소
   */
  icon: ReactNode;
}

/**
 * 아이콘 전용 버튼 컴포넌트
 *
 * 아이콘만 표시하는 간단한 버튼입니다. 일반 버튼보다 작은 크기로 제공됩니다.
 *
 * @param icon - 표시할 아이콘 컴포넌트 (필수)
 * @param variant - 버튼 스타일: `normal` (24px) | `outline` (32px, 테두리 포함) (기본값: `normal`)
 * @param disabled - 버튼 비활성화 여부
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 아이콘 버튼
 * <IconButton icon={<CloseIcon size={20} />} onClick={handleClose} />
 *
 * // Outline 스타일 아이콘 버튼
 * <IconButton
 *   variant="outline"
 *   icon={<SettingsIcon size={24} />}
 *   onClick={handleSettings}
 * />
 * ```
 */
const IconButton = ({
  icon,
  variant,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(iconButtonVariants({ variant }), className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export { IconButton };
