interface HelpTextProps {
  /**
   * 도움말 텍스트 (필수)
   */
  text: string;
}

/**
 * 도움말 텍스트 컴포넌트
 *
 * 입력 필드 하단에 표시되는 도움말 텍스트입니다.
 *
 * @param text - 도움말 텍스트 (필수)
 *
 * @example
 * ```tsx
 * <HelpText text="8자 이상 입력해주세요" />
 * ```
 */
const HelpText = ({ text }: HelpTextProps) => {
  return <span className="body4 text-inz-text-helper">{text}</span>;
};

export default HelpText;
