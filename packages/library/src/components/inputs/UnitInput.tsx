import Input, { InputProps } from "@ui/components/inputs/Input";
import InputUnit from "@ui/components/inputs/InputUnit";

interface UnitInputProps extends InputProps {
  /**
   * 입력 필드 오른쪽에 표시될 단위 텍스트 (필수)
   */
  unit: string;
}

/**
 * 단위 입력 필드 컴포넌트
 *
 * 입력 필드 오른쪽에 단위가 표시되는 입력 필드 컴포넌트입니다.
 *
 * @param unit - 입력 필드 오른쪽에 표시될 단위 텍스트 (필수)
 * @param labelText - 라벨에 표시될 텍스트
 * @param value - 입력 필드의 값 (필수)
 * @param onChange - 입력 값 변경 시 실행할 콜백 함수 (필수)
 * @param placeholder - placeholder 텍스트
 * @param isInvalid - 유효성 검사 실패 여부
 * @param helpText - 도움말 텍스트
 * @param invalidText - 에러 메시지 텍스트
 * @param showAsterisk - 필수 표시 여부
 * @param alignMode - 라벨 정렬 모드
 * @param withWordCounter - 글자 수 카운터 표시 여부
 * @param maxLength - 최대 입력 길이
 *
 * @example
 * ```tsx
 * // 기본 단위 입력
 * <UnitInput
 *   labelText="가격"
 *   unit="원"
 *   value={price}
 *   onChange={(e) => setPrice(e.target.value)}
 * />
 *
 * // 필수 단위 입력 (에러 메시지 포함)
 * <UnitInput
 *   labelText="무게"
 *   unit="kg"
 *   showAsterisk
 *   value={weight}
 *   onChange={(e) => setWeight(e.target.value)}
 *   isInvalid={!weight}
 *   invalidText="무게를 입력해주세요"
 * />
 * ```
 */
const UnitInput = ({
  labelText,
  alignMode,
  showAsterisk,
  value,
  placeholder,
  onChange,
  isInvalid,
  helpText,
  invalidText,
  withWordCounter,
  maxLength,
  unit,
}: UnitInputProps) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      slot={<InputUnit unit={unit} />}
      labelText={labelText}
      alignMode={alignMode}
      showAsterisk={showAsterisk}
      placeholder={placeholder}
      isInvalid={isInvalid}
      helpText={helpText}
      invalidText={invalidText}
      withWordCounter={withWordCounter}
      maxLength={maxLength}
    />
  );
};

export default UnitInput;
