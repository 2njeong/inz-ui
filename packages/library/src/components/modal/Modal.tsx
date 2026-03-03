import React, { useEffect, useRef } from "react";

import { StandardButton } from "@ui/components/buttons/StandardButton";
import CloseIcon from "@ui/icons/CloseIcon";

interface ModalProps {
  /**
   * 모달 표시 여부
   */
  isOpen: boolean;
  /**
   * 모달 닫기 시 실행할 콜백 함수
   */
  onClose: () => void;
  /**
   * 취소 버튼 클릭 시 실행할 콜백 함수
   */
  onCancel?: () => void;
  /**
   * 모달 헤더에 표시될 제목
   */
  title: string;
  /**
   * 모달 헤더에 표시될 컨텐츠
   */
  headerContent?: React.ReactNode;
  /**
   * 모달 본문에 표시될 컨텐츠
   */
  children: React.ReactNode;
  /**
   * 확인 버튼에 표시될 텍스트
   */
  buttonText: string;
  /**
   * 취소 버튼에 표시될 텍스트
   */
  footerContent?: React.ReactNode;
  /**
   * 푸터에 표시될 컨텐츠
   */
  cancelText: string;
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
  /**
   * 확인 버튼 비활성화 여부
   * @default false
   */
  isConfirmDisabled?: boolean;
}

/**
 * 모달 다이얼로그 컴포넌트
 *
 * 사용자에게 중요한 정보를 표시하거나 확인을 요청할 때 사용하는 모달입니다.
 *
 * @param isOpen - 모달 표시 여부
 * @param onClose - 모달 닫기 시 실행할 콜백 함수
 * @param onCancel - 취소 버튼 클릭 시 실행할 콜백 함수
 * @param headerContent - 모달 헤더에 표시될 컨텐츠 (필수)
 * @param children - 모달 본문에 표시될 컨텐츠
 * @param buttonText - 확인 버튼에 표시될 텍스트 (필수)
 * @param cancelText - 취소 버튼에 표시될 텍스트 (필수)
 * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백 함수 (필수)
 * @param isLoading - 로딩 상태 표시 여부 (기본값: `false`)
 * @param isConfirmDisabled - 확인 버튼 비활성화 여부 (기본값: `false`)
 *
 * @example
 * ```tsx
 * // 기본 모달
 * <Modal
 *   isOpen={isOpen}
 *   headerContent="제목"
 *   buttonText="확인"
 *   cancelText="취소"
 *   onConfirm={() => handleConfirm()}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <p>모달 내용입니다.</p>
 * </Modal>
 *
 * // 로딩 상태 모달
 * <Modal
 *   isOpen={isOpen}
 *   headerContent="저장 중"
 *   buttonText="저장"
 *   cancelText="취소"
 *   isLoading={true}
 *   isConfirmDisabled={true}
 *   onConfirm={() => handleSave()}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <p>데이터를 저장하고 있습니다...</p>
 * </Modal>
 * ```
 */
const Modal: React.FC<ModalProps> = ({
  isConfirmDisabled,
  isLoading,
  isOpen,
  onClose,
  onCancel,
  title,
  headerContent,
  children,
  buttonText,
  cancelText,
  footerContent,
  onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      if (isOpen) {
        if (!dialogNode.open) {
          dialogNode.showModal();
        }
      } else {
        if (dialogNode.open) {
          dialogNode.close();
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      const handleDialogCloseEvent = () => {
        onClose();
      };

      dialogNode.addEventListener("close", handleDialogCloseEvent);
      return () => {
        dialogNode.removeEventListener("close", handleDialogCloseEvent);
      };
    }
    return undefined;
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        onClose();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      className="max-h-80vh backdrop:bg-inz-overlay mx-auto my-auto max-w-[1200px] rounded-xl"
      onClick={handleBackdropClick}
    >
      <div className="flex h-full flex-col">
        {/* 헤더 */}
        <div className="flex w-full flex-shrink-0 items-center justify-between gap-[48px] px-[32px] py-[24px]">
          <div className="flex items-center gap-2">
            <h2 className="heading3 text-inz-greyscale-10">{title}</h2>
            {headerContent}
          </div>
          <button
            type="button"
            className="text-inz-coolgrey-50 hover:text-inz-coolgrey-30 rounded-sm"
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon size={24} color="currentColor" />
          </button>
        </div>
        {/* 본문 */}
        <div className="flex-1 px-[32px]">
          <div className="max-h-[calc(80vh-96px)] w-full overflow-y-auto">
            {children}
          </div>
        </div>
        {/* 푸터 추가 (필요한 경우) */}
        <div className="flex w-full justify-between items-center px-[32px] py-[24px]">
          {footerContent}
          <div className="flex gap-3 items-center ml-auto">
            <StandardButton
              variant="secondary"
              size="md"
              onClick={() => {
                onCancel?.();
                onClose();
              }}
            >
              {cancelText}
            </StandardButton>
            <StandardButton
              isLoading={isLoading}
              disabled={isLoading || isConfirmDisabled}
              variant="primary"
              size="md"
              onClick={onConfirm}
            >
              {buttonText}
            </StandardButton>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
