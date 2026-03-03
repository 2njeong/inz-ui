import InputField from "@ui/components/inputs/InputField";
import InputFooter from "@ui/components/inputs/InputFooter";
import Label, { AlignMode } from "@ui/components/texts/Label";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "slot"> {
  /**
   * 라벨에 표시될 텍스트
   */
  labelText?: string;
  /**
   * 라벨 정렬 모드
   */
  alignMode?: AlignMode;
  /**
   * 필수 표시 여부 (라벨 옆에 * 표시)
   * @default false
   */
  showAsterisk?: boolean;
  /**
   * 입력 필드의 값 (필수)
   */
  value: string;
  /**
   * placeholder 텍스트
   */
  placeholder?: string;
  /**
   * 입력 값 변경 시 실행할 콜백 함수 (필수)
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 유효성 검사 실패 여부
   * @default false
   */
  isInvalid?: boolean;
  /**
   * 도움말 텍스트 (하단에 표시)
   */
  helpText?: string;
  /**
   * 에러 메시지 텍스트 (유효성 검사 실패 시 하단에 표시)
   */
  invalidText?: string;
  /**
   * 성공 메시지 텍스트 (하단에 표시)
   */
  successText?: string;
  /**
   * 글자 수 카운터 표시 여부
   * @default false
   */
  withWordCounter?: boolean;
  /**
   * 최대 입력 길이 (글자 수 카운터와 함께 사용)
   */
  maxLength?: number;
  /**
   * 입력 필드 오른쪽에 표시할 슬롯 요소
   */
  slot?: React.ReactNode;
}

/**
 * 입력 필드 컴포넌트
 *
 * 라벨, 입력 필드, 도움말/에러 메시지, 글자 수 카운터를 포함한 완전한 입력 컴포넌트입니다.
 *
 * @param labelText - 라벨에 표시될 텍스트
 * @param alignMode - 라벨 정렬 모드
 * @param showAsterisk - 필수 표시 여부 (기본값: `false`)
 * @param value - 입력 필드의 값 (필수)
 * @param placeholder - placeholder 텍스트
 * @param onChange - 입력 값 변경 시 실행할 콜백 함수 (필수)
 * @param isInvalid - 유효성 검사 실패 여부 (기본값: `false`)
 * @param helpText - 도움말 텍스트
 * @param invalidText - 에러 메시지 텍스트
 * @param successText - 성공 메시지 텍스트
 * @param withWordCounter - 글자 수 카운터 표시 여부 (기본값: `false`)
 * @param maxLength - 최대 입력 길이
 * @param slot - 입력 필드 오른쪽에 표시할 슬롯 요소
 * @param type - 입력 필드 타입 (기본 HTML input의 type 속성)
 * @param disabled - 비활성화 여부
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 기본 입력 필드
 * <Input
 *   labelText="이름"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   placeholder="이름을 입력하세요"
 * />
 *
 * // 필수 입력 필드 (에러 메시지 포함)
 * <Input
 *   labelText="이메일"
 *   showAsterisk
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   isInvalid={!isValidEmail(email)}
 *   invalidText="올바른 이메일 주소를 입력하세요"
 *   placeholder="example@email.com"
 * />
 *
 * // 글자 수 카운터 포함
 * <Input
 *   labelText="메시지"
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   maxLength={100}
 *   withWordCounter
 *   placeholder="메시지를 입력하세요"
 * />
 *
 * // 슬롯 요소 포함 (아이콘 버튼 등)
 * <Input
 *   labelText="비밀번호"
 *   type="password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   slot={<EyeIcon onClick={toggleVisibility} />}
 * />
 * ```
 */
const Input = ({
  labelText,
  alignMode,
  showAsterisk,
  value,
  placeholder,
  onChange,
  isInvalid,
  type,
  helpText,
  invalidText,
  successText,
  withWordCounter,
  maxLength,
  slot,
  ...props
}: InputProps) => {
  return (
    <Label
      labelText={labelText}
      alignMode={alignMode}
      showAsterisk={showAsterisk}
    >
      <InputField
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        isInvalid={isInvalid}
        type={type}
        maxLength={maxLength}
        slot={slot}
        {...props}
      />
      <InputFooter
        helpText={helpText}
        invalidText={invalidText}
        successText={successText}
        withWordCounter={withWordCounter}
        value={value || ""}
        maxLength={maxLength}
      />
    </Label>
  );
};

export default Input;
