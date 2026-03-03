import React, { useEffect, useRef } from "react";

import AlertIcon from "@ui/components/alert/AlertIcon";
import { StandardButton } from "@ui/components/buttons/StandardButton";

export interface AlertProps {
  /**
   * 알림 표시 여부
   */
  isOpen: boolean;
  /**
   * 알림 타입
   * - `error`: 에러/경고 알림
   * - `confirm`: 확인 요청 알림
   * - `complete`: 완료 알림
   */
  type: "error" | "confirm" | "complete";
  /**
   * 알림 본문에 표시할 추가 컨텐츠
   */
  children?: React.ReactElement;
  /**
   * 확인 버튼 텍스트
   * @default "확인"
   */
  confirmText?: string;
  /**
   * 취소 버튼 텍스트
   * - 값이 제공되면 취소 버튼이 표시됩니다
   */
  cancelText?: string;
  /**
   * 알림의 주요 메시지 (제목)
   */
  mainText?: string;
  /**
   * 알림의 부가 설명 (본문)
   */
  subText?: string;
  /**
   * 확인 버튼 클릭 시 실행할 콜백 함수
   */
  onConfirm?: () => void;
  /**
   * 알림 닫기 시 실행할 콜백 함수
   */
  onClose: () => void;
}

/**
 * 알림 다이얼로그 컴포넌트
 *
 * 사용자에게 중요한 정보를 전달하거나 확인을 요청할 때 사용하는 모달 다이얼로그입니다.
 *
 * @param type - 알림 타입 (`error` | `confirm` | `complete`)
 * @param isOpen - 알림 표시 여부
 * @param mainText - 알림의 주요 메시지 (제목)
 * @param subText - 알림의 부가 설명 (본문)
 * @param confirmText - 확인 버튼 텍스트 (기본값: `확인`)
 * @param cancelText - 취소 버튼 텍스트 (제공 시 취소 버튼 표시)
 * @param children - 알림 본문에 표시할 추가 컨텐츠
 * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백
 * @param onClose - 알림 닫기 시 실행할 콜백
 *
 * @example
 * ```tsx
 * // 완료 알림
 * <Alert
 *   type="complete"
 *   isOpen={isOpen}
 *   mainText="저장되었습니다"
 *   subText="데이터가 성공적으로 저장되었습니다."
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * // 확인 요청 알림 (취소 버튼 포함)
 * <Alert
 *   type="confirm"
 *   isOpen={isOpen}
 *   mainText="정말 삭제하시겠습니까?"
 *   subText="삭제된 데이터는 복구할 수 없습니다."
 *   confirmText="삭제"
 *   cancelText="취소"
 *   onConfirm={() => handleDelete()}
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * // 에러 알림 (추가 컨텐츠 포함)
 * <Alert
 *   type="error"
 *   isOpen={isOpen}
 *   mainText="오류가 발생했습니다"
 *   subText="다시 시도해주세요."
 *   onClose={() => setIsOpen(false)}
 * >
 *   <div className="text-left">
 *     <p>오류 코드: 500</p>
 *   </div>
 * </Alert>
 * ```
 */
const Alert: React.FC<AlertProps> = ({
  type,
  isOpen,
  mainText,
  subText,
  children,
  cancelText,
  confirmText = "확인",
  onClose,
  onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

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

  if (!isOpen) {
    return;
  }

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      className="backdrop:bg-inz-overlay mx-auto my-auto max-h-[753px] w-[488px] rounded-lg px-8 py-6 text-center"
      onClick={(e) => {
        e.stopPropagation();
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
      }}
    >
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="space-y-3">
          <AlertIcon type={type} />
          <div className="gap-y-1 whitespace-pre-line">
            <p className="title1 text-inz-greyscale-10">{mainText}</p>
            <p className="body2 text-inz-coolgrey-20">{subText}</p>
          </div>
        </div>
        {/* 추가 컨텐츠 */}
        {children}
        {/* 버튼 */}
        <div className="flex justify-between gap-x-3">
          {cancelText && (
            <StandardButton
              variant="secondary"
              size="md"
              className="w-full"
              onClick={onClose}
            >
              {cancelText}
            </StandardButton>
          )}
          <StandardButton
            variant="primary"
            size="md"
            className="w-full"
            onClick={handleConfirmClick}
          >
            {confirmText}
          </StandardButton>
        </div>
      </div>
    </dialog>
  );
};

export default Alert;
