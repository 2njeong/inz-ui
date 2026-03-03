import StatusDangerIcon from "@ui/icons/StatusDangerIcon";

interface ErrorTextProps {
  /**
   * 에러 메시지 텍스트 (필수)
   */
  text: string;
}

/**
 * 에러 텍스트 컴포넌트
 *
 * 입력 필드 하단에 표시되는 에러 메시지입니다. 에러 아이콘과 함께 표시됩니다.
 *
 * @param text - 에러 메시지 텍스트 (필수)
 *
 * @example
 * ```tsx
 * <InvalidText text="올바른 이메일 주소를 입력하세요" />
 * ```
 */
const InvalidText = ({ text }: ErrorTextProps) => {
  return (
    <span className="body4 text-inz-status-danger flex items-center gap-x-1">
      <StatusDangerIcon size={16} color="#ff5a4f" />
      {text}
    </span>
  );
};

export default InvalidText;
