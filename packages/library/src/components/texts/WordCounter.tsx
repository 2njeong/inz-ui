interface WordCounterProps {
  /**
   * 현재 입력된 텍스트 값 (필수)
   */
  value: string;
  /**
   * 최대 글자 수 (필수)
   */
  maxLength: number;
}

/**
 * 글자 수 카운터 컴포넌트
 *
 * 현재 입력된 글자 수와 최대 글자 수를 표시하는 컴포넌트입니다.
 *
 * @param value - 현재 입력된 텍스트 값 (필수)
 * @param maxLength - 최대 글자 수 (필수)
 *
 * @example
 * ```tsx
 * <WordCounter value={text} maxLength={100} />
 * // 출력: "50/100"
 * ```
 */
const WordCounter = ({ value, maxLength }: WordCounterProps) => {
  return (
    <div className="body4 text-inz-text-caption flex items-center">
      <span>{value.length}</span>
      <span>/</span>
      <span>{maxLength}</span>
    </div>
  );
};

export default WordCounter;
