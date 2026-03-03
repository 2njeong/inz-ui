import { ReactNode, useEffect, useRef } from "react";

import { IconButton } from "@ui/components/buttons/IconButton";
import { StandardButton } from "@ui/components/buttons/StandardButton";
import CloseIcon from "@ui/icons/CloseIcon";

interface PopUpProps {
  /**
   * 팝업 표시 여부
   */
  isOpen: boolean;
  /**
   * 팝업 헤더에 표시될 제목
   * @default "title"
   */
  title: string;
  /**
   * 팝업 본문에 표시될 설명 텍스트
   * @default "text"
   */
  text: string;
  /**
   * 팝업 본문에 표시될 컨텐츠
   * @default "context"
   */
  content: ReactNode;
  /**
   * 확인 버튼에 표시될 텍스트
   * @default "확인"
   */
  confirmText: string;
  /**
   * 팝업 닫기 시 실행할 콜백 함수
   */
  onClose: () => void;
  /**
   * 확인 버튼 클릭 시 실행할 콜백 함수
   */
  onConfirm: () => void;
}

/**
 * 팝업 다이얼로그 컴포넌트
 *
 * 정보 표시용 팝업 다이얼로그입니다. 제목, 설명 텍스트, 추가 컨텐츠를 표시하고 확인 버튼을 제공합니다.
 *
 * @param isOpen - 팝업 표시 여부
 * @param title - 팝업 헤더에 표시될 제목 (기본값: `title`)
 * @param text - 팝업 본문에 표시될 설명 텍스트 (기본값: `text`)
 * @param content - 팝업 본문에 표시될 컨텐츠 (기본값: `context`)
 * @param confirmText - 확인 버튼에 표시될 텍스트 (기본값: `확인`)
 * @param onClose - 팝업 닫기 시 실행할 콜백 함수
 * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백 함수
 *
 * @example
 * ```tsx
 * // 기본 팝업
 * <PopUp
 *   isOpen={isOpen}
 *   title="안내"
 *   text="다음 정보를 확인해주세요."
 *   content={<div>상세 내용</div>}
 *   confirmText="확인"
 *   onConfirm={() => handleConfirm()}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
const PopUp = ({
  isOpen,
  title = "title",
  text = "text",
  content = "context",
  confirmText = "확인",
  onClose,
  onConfirm,
}: PopUpProps) => {
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

  if (!isOpen) {
    return;
  }

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      className="backdrop:bg-inz-overlay mx-auto my-auto max-h-[753px] min-w-[464px] w-fit space-y-6 rounded-lg px-8 py-6 text-center [&>*:last-child]:ml-auto [&>*:last-child]:block"
    >
      <div className="flex items-center justify-between">
        <p className="heading3 text-inz-greyscale-10">{title}</p>
        <IconButton
          onClick={onClose}
          icon={<CloseIcon size={24} color="black" />}
        />
      </div>
      <div className="body2 space-y-4 text-justify">
        <div className="text-inz-greyscale-30">{text}</div>
        <div className="text-inz-text-body max-h-[400px] w-full overflow-y-auto">
          {content}
        </div>
      </div>
      <StandardButton variant="primary" size="md" onClick={onConfirm}>
        {confirmText}
      </StandardButton>
    </dialog>
  );
};

export default PopUp;
