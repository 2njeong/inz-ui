import { MinusIcon, PlusIcon } from "@ui/icons";
import { cn } from "@ui/utils/cn";
import { cva } from "class-variance-authority";

const numberPickerVariants = cva([
  "flex",
  "items-center",
  "w-[120px]",
  "h-10",
  "border",
  "border-inz-coolgrey-70",
  "rounded-xs",
  "text-inz-greyscale-10",
  "font-bold",
  "font-size-[18px]",
]);

interface NumberPickerProps {
  /**
   * 현재 숫자 값 (필수)
   */
  value: number;
  /**
   * 증가 버튼 클릭 시 실행할 콜백 함수 (필수)
   */
  onIncrement: () => void;
  /**
   * 감소 버튼 클릭 시 실행할 콜백 함수 (필수)
   */
  onDecrement: () => void;
  /**
   * 최소값
   */
  minValue?: number;
  /**
   * 최대값
   */
  maxValue?: number;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
  /**
   * 입력 필드 읽기 전용 여부
   * @default true
   */
  readOnly?: boolean;
  /**
   * 필수 표시 여부 (오른쪽에 * 표시)
   * @default false
   */
  required?: boolean;
}

/**
 * 숫자 선택 컴포넌트
 *
 * 증가/감소 버튼으로 숫자를 선택할 수 있는 컴포넌트입니다.
 *
 * @param value - 현재 숫자 값 (필수)
 * @param onIncrement - 증가 버튼 클릭 시 실행할 콜백 함수 (필수)
 * @param onDecrement - 감소 버튼 클릭 시 실행할 콜백 함수 (필수)
 * @param minValue - 최소값 (지정 시 해당 값 이하에서는 감소 버튼 비활성화)
 * @param maxValue - 최대값 (지정 시 해당 값 이상에서는 증가 버튼 비활성화)
 * @param className - 추가 CSS 클래스명
 * @param readOnly - 입력 필드 읽기 전용 여부 (기본값: `true`)
 * @param required - 필수 표시 여부 (기본값: `false`)
 *
 * @example
 * ```tsx
 * // 기본 숫자 선택
 * <NumberPicker
 *   value={count}
 *   onIncrement={() => setCount(count + 1)}
 *   onDecrement={() => setCount(count - 1)}
 * />
 *
 * // 최소/최대값 제한
 * <NumberPicker
 *   value={quantity}
 *   minValue={0}
 *   maxValue={10}
 *   onIncrement={() => setQuantity(quantity + 1)}
 *   onDecrement={() => setQuantity(quantity - 1)}
 * />
 *
 * // 필수 숫자 선택
 * <NumberPicker
 *   value={amount}
 *   required
 *   onIncrement={() => setAmount(amount + 1)}
 *   onDecrement={() => setAmount(amount - 1)}
 * />
 * ```
 */
const NumberPicker = ({
  value,
  onIncrement,
  onDecrement,
  minValue,
  maxValue,
  className,
  required,
  readOnly = true,
}: NumberPickerProps) => {
  const isIncrementDisabled = value >= (maxValue ?? Infinity);
  const isDecrementDisabled = value <= (minValue ?? 0);

  const handleIncrement = () => {
    if (!isIncrementDisabled) {
      onIncrement();
    }
  };

  const handleDecrement = () => {
    if (!isDecrementDisabled) {
      onDecrement();
    }
  };

  return (
    <div className="flex gap-2">
      <div className={cn(numberPickerVariants(), "overflow-hidden", className)}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          className={cn(
            "flex h-full w-1/3 items-center justify-center bg-white text-center transition-colors hover:bg-gray-50",
            isDecrementDisabled && "cursor-not-allowed hover:bg-white"
          )}
          aria-label="감소"
        >
          <MinusIcon
            size={16}
            color={
              isDecrementDisabled
                ? "var(--color-inz-coolgrey-70)"
                : "var(--color-inz-coolgrey-50)"
            }
          />
        </button>
        <input
          type="number"
          value={value}
          min={minValue}
          max={maxValue}
          readOnly={readOnly}
          className={cn(
            "title2 bg-inz-coolgrey-80 text-inz-greyscale-10 h-full w-1/3 border-0 text-center focus:outline-none",
            "[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
            "[&[type=number]]:[-moz-appearance:textfield]"
          )}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          className={cn(
            "flex h-full w-1/3 items-center justify-center bg-white text-center transition-colors hover:bg-gray-50",
            isIncrementDisabled && "cursor-not-allowed hover:bg-white"
          )}
          aria-label="증가"
        >
          <PlusIcon
            size={16}
            color={
              isIncrementDisabled
                ? "var(--color-inz-coolgrey-70)"
                : "var(--color-inz-coolgrey-50)"
            }
          />
        </button>
      </div>
      {required && (
        <span className="text-body1 text-inz-red-50 ml-1">*</span>
      )}
    </div>
  );
};

export default NumberPicker;
