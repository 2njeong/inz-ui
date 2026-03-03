import Input, { InputProps } from "@ui/components/inputs/Input";
import InputEyeButton from "@ui/components/inputs/InputEyeButton";

export type PasswordInputType = "password" | "text";

interface PasswordInputProps extends InputProps {
  /**
   * 비밀번호 표시/숨김 토글 함수 (필수)
   */
  toggleShowPassword: () => void;
  /**
   * 입력 필드 타입: `password` (숨김) | `text` (표시)
   */
  type: PasswordInputType;
}

/**
 * 비밀번호 입력 필드 컴포넌트
 *
 * 비밀번호 표시/숨김 기능이 있는 입력 필드 컴포넌트입니다.
 *
 * @param toggleShowPassword - 비밀번호 표시/숨김 토글 함수 (필수)
 * @param type - 입력 필드 타입: `password` | `text` (필수)
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
 * // 기본 비밀번호 입력
 * const [showPassword, setShowPassword] = useState(false);
 * <PasswordInput
 *   type={showPassword ? "text" : "password"}
 *   toggleShowPassword={() => setShowPassword(!showPassword)}
 *   labelText="비밀번호"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 *
 * // 필수 비밀번호 입력 (에러 메시지 포함)
 * <PasswordInput
 *   type={showPassword ? "text" : "password"}
 *   toggleShowPassword={togglePassword}
 *   labelText="비밀번호"
 *   showAsterisk
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   isInvalid={password.length < 8}
 *   invalidText="8자 이상 입력해주세요"
 * />
 * ```
 */
const PasswordInput = ({
  toggleShowPassword,
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
  withWordCounter,
  maxLength,
  ...props
}: PasswordInputProps) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      labelText={labelText}
      alignMode={alignMode}
      showAsterisk={showAsterisk}
      placeholder={placeholder}
      isInvalid={isInvalid}
      helpText={helpText}
      invalidText={invalidText}
      withWordCounter={withWordCounter}
      maxLength={maxLength}
      slot={
        value && (
          <InputEyeButton onClick={toggleShowPassword} inputType={type} />
        )
      }
      {...props}
    />
  );
};

export default PasswordInput;
