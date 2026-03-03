import { StandardButton } from "@ui/components/buttons/StandardButton";

import {
  FloatingFocusManager,
  FloatingOverlay,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useEffect, useId, useRef, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";

const SIZE_CLASS: Record<"sm" | "lg", string> = {
  sm: "w-[40vw] min-w-[480px]",
  lg: "w-[50vw] min-w-[720px]",
};

interface DrawerProps {
  /**
   * Drawer 헤더에 표시될 제목 또는 요소
   */
  title: string | React.ReactNode;
  /**
   * 확인 버튼에 표시될 텍스트
   * @default "완료"
   */
  btnText: string;
  /**
   * Drawer 본문에 표시될 컨텐츠
   */
  children: React.ReactNode;
  /**
   * Drawer 크기
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * Drawer 표시 여부
   */
  isOpen: boolean;
  /**
   * 취소 버튼 표시 여부
   * @default true
   */
  withCancelBtn?: boolean;
  /**
   * Drawer 닫기 시 실행할 콜백 함수
   */
  onClose: () => void;
  /**
   * 확인 버튼 클릭 시 실행할 콜백 함수
   */
  onConfirm: () => void;
  /**
   * 로딩 상태 표시 여부
   * - `true`일 경우 확인 버튼이 로딩 상태로 표시됩니다
   * @default false
   */
  isLoading?: boolean;
}

/**
 * Drawer 컴포넌트 (사이드 패널)
 *
 * 화면 오른쪽에서 슬라이드되어 나타나는 사이드 패널 컴포넌트입니다.
 * 디바운싱이 내장되어 있어 빠른 연속 클릭을 방지합니다.
 *
 * @param title - Drawer 헤더에 표시될 제목 또는 요소
 * @param btnText - 확인 버튼에 표시될 텍스트 (기본값: `완료`)
 * @param children - Drawer 본문에 표시될 컨텐츠
 * @param size - Drawer 크기: `sm` (40vw, 최소 480px) | `lg` (50vw, 최소 720px) (기본값: `sm`)
 * @param isOpen - Drawer 표시 여부
 * @param withCancelBtn - 취소 버튼 표시 여부 (기본값: `true`)
 * @param onClose - Drawer 닫기 시 실행할 콜백 함수
 * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백 함수
 * @param isLoading - 로딩 상태 표시 여부 (기본값: `false`)
 *
 * @example
 * ```tsx
 * // 기본 Drawer
 * <Drawer
 *   isOpen={isOpen}
 *   title="설정"
 *   btnText="저장"
 *   onConfirm={() => handleSave()}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <div>설정 컨텐츠</div>
 * </Drawer>
 *
 * // 큰 크기 Drawer
 * <Drawer
 *   isOpen={isOpen}
 *   title="상세 정보"
 *   btnText="완료"
 *   size="lg"
 *   withCancelBtn={false}
 *   isLoading={isSaving}
 *   onConfirm={() => handleConfirm()}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <div>상세 컨텐츠</div>
 * </Drawer>
 * ```
 */
const Drawer = (props: DrawerProps) => {
  const {
    btnText = "완료",
    title = "title",
    children,
    isOpen,
    onClose,
    onConfirm,
    size = "sm",
    withCancelBtn = true,
    isLoading = false,
  } = props;

  const [isAnyDialogOpen, setIsAnyDialogOpen] = useState(false);

  const labelId = useId();
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
    placement: "right",
  });

  const dismiss = useDismiss(context, {
    escapeKey: !isAnyDialogOpen,
    outsidePress: true,
  });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, transform: "translateX(100%)" },
    open: { opacity: 1, transform: "translateX(0)" },
    close: { opacity: 0, transform: "translateX(100%)" },
    common: { willChange: "opacity, transform" },
  });

  // overlay 순서 관리 이펙트
  useEffect(() => {
    const checkDialog = () => {
      setIsAnyDialogOpen(!!document.querySelector("dialog[open]"));
    };

    const observer = new MutationObserver(() => {
      checkDialog();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });

    checkDialog();

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingOverlay
      lockScroll
      className="bg-inz-overlay fixed inset-0 z-10 transition-opacity duration-300"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <FloatingFocusManager context={context} modal={true}>
        <div
          ref={(node) => {
            refs.setFloating(node);
            floatingRef.current = node;
          }}
          aria-labelledby={labelId}
          tabIndex={-1}
          data-testid="drawer-dialog"
          className={`fixed right-0 top-0 flex h-full flex-col ${SIZE_CLASS[size]} z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out`}
          style={styles}
          {...getFloatingProps({
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation();
            },
          })}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-8 py-6">
            <h2
              className="heading3 text-inz-greyscale-10"
              id={labelId}
              data-testid="drawer-title"
            >
              {title}
            </h2>
            <span
              role="button"
              aria-label="close"
              data-testid="drawer-close-btn"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CloseIcon size={24} color="#929ba4" aria-hidden="true" />
            </span>
          </div>
          {/* 컨텐츠 */}
          <div
            className="relative flex-1 overflow-y-auto pb-4"
            data-testid="drawer-content"
          >
            {children}
          </div>
          {/* 버튼 영역 */}
          <div className="border-inz-line-border flex justify-end gap-2 border-t px-8 py-6">
            {withCancelBtn && (
              <StandardButton
                onClick={onClose}
                variant="secondary"
                data-testid="drawer-cancel-btn"
              >
                취소
              </StandardButton>
            )}
            <StandardButton
              onClick={onConfirm}
              isLoading={isLoading}
              data-testid="drawer-confirm-btn"
            >
              {btnText}
            </StandardButton>
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  );
};

export default Drawer;
