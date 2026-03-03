import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@ui/utils/cn";

const tooltipVariants = cva(
  [
    "p-2.5",
    "rounded-sm",
    "transition-opacity",
    "duration-200",
    "body3",
    "z-tooltip",
    "flex gap-2",
    "max-w-[400px]",
  ],
  {
    variants: {
      variant: {
        default: "bg-[#121212] text-white shadow-md",
        white:
          "bg-white text-inz-greyscale-10 shadow-md border border-inz-line-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type Placement = "top" | "bottom" | "left" | "right";

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  /**
   * 툴팁을 표시할 대상 요소 (필수)
   */
  children: ReactNode;
  /**
   * 툴팁에 표시될 컨텐츠 (필수)
   */
  content: string | ReactNode;
  /**
   * 툴팁 위치
   * @default "top"
   */
  placement?: Placement;
  /**
   * 툴팁 앞에 표시할 아이콘
   */
  icon?: ReactNode;
  /**
   * 최대 표시 줄 수
   * @default 2
   */
  maxLines?: number;
  /**
   * 줄바꿈 문자 보존 여부
   * @default false
   */
  preserveNewlines?: boolean;
  /**
   * 텍스트 정렬
   * @default "center"
   */
  align?: "left" | "center" | "right";
}

/**
 * 툴팁 컴포넌트
 *
 * 호버 또는 포커스 시 추가 정보를 표시하는 툴팁 컴포넌트입니다.
 *
 * @param children - 툴팁을 표시할 대상 요소 (필수)
 * @param content - 툴팁에 표시될 컨텐츠 (필수)
 * @param variant - 툴팁 스타일: `default` (어두운 배경) | `white` (흰색 배경, 테두리) (기본값: `default`)
 * @param placement - 툴팁 위치: `top` | `bottom` | `left` | `right` (기본값: `top`)
 * @param icon - 툴팁 앞에 표시할 아이콘
 * @param maxLines - 최대 표시 줄 수 (기본값: `2`)
 * @param preserveNewlines - 줄바꿈 문자 보존 여부 (기본값: `false`)
 * @param align - 텍스트 정렬: `left` | `center` | `right` (기본값: `center`)
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 툴팁
 * <Tooltip content="이것은 툴팁입니다">
 *   <button>호버하세요</button>
 * </Tooltip>
 *
 * // 흰색 배경 툴팁 (아이콘 포함)
 * <Tooltip
 *   variant="white"
 *   content="추가 정보"
 *   icon={<InfoIcon />}
 *   placement="bottom"
 * >
 *   <IconButton icon={<QuestionIcon />} />
 * </Tooltip>
 *
 * // 여러 줄 툴팁 (줄바꿈 보존)
 * <Tooltip
 *   content="첫 번째 줄\n두 번째 줄\n세 번째 줄"
 *   preserveNewlines
 *   maxLines={3}
 * >
 *   <span>긴 설명</span>
 * </Tooltip>
 * ```
 */
const Tooltip = ({
  children,
  content,
  variant,
  align = "center",
  placement: initialPlacement = "top",
  className,
  icon,
  maxLines = 2,
  preserveNewlines = false,
  ...rest
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: initialPlacement,
    middleware: [offset(8), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 0, close: 0 },
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // 가장 가까운 dialog 조상을 찾아 포털 대상 반환
  const getPortalRoot = () => {
    const dialog = (refs.reference.current as HTMLElement)?.closest("dialog");
    return dialog ?? document.body;
  };

  const renderContent = () => {
    if (typeof content === "string" && preserveNewlines) {
      const lines = content.split("\n");
      return lines.map((line, index) => {
        // Create a stable key based on line content and position
        const lineHash = line.length > 0 ? line.charCodeAt(0) + line.length : 0;
        return (
          <React.Fragment key={`line-${String(lineHash)}-${line.slice(0, 10)}`}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        );
      });
    }
    return content;
  };

  return (
    <div
      className="inline-flex"
      ref={refs.setReference}
      {...getReferenceProps()}
      {...rest}
    >
      {children}
      {isOpen &&
        createPortal(
          <div
            ref={refs.setFloating}
            className={cn(
              tooltipVariants({ variant }),
              "opacity-100",
              className
            )}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {icon}
            <div
              className={cn(
                "w-full break-words",
                maxLines && `line-clamp-${String(maxLines)}`,
                align === "left" && "text-left",
                align === "center" && "text-center",
                align === "right" && "text-right"
              )}
            >
              {renderContent()}
            </div>
          </div>,
          getPortalRoot()
        )}
    </div>
  );
};

export default Tooltip;
