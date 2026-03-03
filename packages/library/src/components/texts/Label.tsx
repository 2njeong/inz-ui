import { cn } from "@ui/utils/cn";

export type AlignMode = "vertical" | "horizontal";

interface LabelProps {
  /**
   * 라벨에 표시될 텍스트
   */
  labelText?: string;
  /**
   * 라벨 정렬 모드
   * @default "vertical"
   */
  alignMode?: AlignMode;
  /**
   * 필수 표시 여부 (라벨 옆에 * 표시)
   * @default false
   */
  showAsterisk?: boolean;
  /**
   * 라벨과 함께 표시될 자식 요소 (입력 필드 등)
   */
  children: React.ReactNode;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 라벨 컴포넌트
 *
 * 입력 필드와 함께 사용되는 라벨 컴포넌트입니다. 수직/수평 정렬을 지원합니다.
 *
 * @param labelText - 라벨에 표시될 텍스트
 * @param alignMode - 라벨 정렬 모드: `vertical` (수직) | `horizontal` (수평) (기본값: `vertical`)
 * @param showAsterisk - 필수 표시 여부 (기본값: `false`)
 * @param children - 라벨과 함께 표시될 자식 요소
 * @param className - 추가 CSS 클래스명
 *
 * @example
 * ```tsx
 * // 수직 정렬 라벨
 * <Label labelText="이름" showAsterisk>
 *   <input type="text" />
 * </Label>
 *
 * // 수평 정렬 라벨
 * <Label labelText="이메일" alignMode="horizontal">
 *   <input type="email" />
 * </Label>
 * ```
 */
const Label = ({
  children,
  labelText,
  showAsterisk,
  alignMode = "vertical",
  className,
}: LabelProps) => {
  const isVertical = alignMode === "vertical";
  return (
    <label
      className={cn(
        "body3 text-inz-text-helper flex",
        isVertical ? "flex-col gap-y-2" : "items-start gap-x-6",
        className
      )}
    >
      {labelText && (
        <p>
          {labelText}
          {showAsterisk && (
            <span className="text-inz-status-danger ml-1">*</span>
          )}
        </p>
      )}
      <div className={cn("flex", isVertical ? "flex-col" : "min-w-0 flex-1")}>
        {children}
      </div>
    </label>
  );
};

export default Label;
