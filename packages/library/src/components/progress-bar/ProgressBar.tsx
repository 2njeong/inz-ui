import React from "react";

const BAR_HEIGHT_PX = 8;
const PERCENTAGE_MIN_WIDTH_PX = 32;
const PERCENTAGE_FONT_SIZE_PX = 12;
const PERCENTAGE_LINE_HEIGHT_PX = 16;

const SubText = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    return null;
  }

  return (
    <div className="body2 text-inz-text-subbody text-center">
      {children}
    </div>
  );
};

const Progress = ({
  value,
  max,
  percent,
}: {
  value: number;
  max: number;
  percent: number;
}) => {
  return (
    <div
      className="bg-inz-coolgrey-80 relative w-full overflow-hidden rounded"
      style={{ height: String(BAR_HEIGHT_PX) + "px" }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label="progress bar"
    >
      <div
        className="bg-inz-primary-50 absolute left-0 top-0 rounded transition-all duration-300"
        style={{
          width: percent.toString() + "%",
          height: String(BAR_HEIGHT_PX) + "px",
        }}
      />
    </div>
  );
};

const Percentage = ({ value }: { value: number }) => (
  <span
    className="detail2 text-inz-primary-50 text-left"
    style={{
      minWidth: String(PERCENTAGE_MIN_WIDTH_PX) + "px",
      fontSize: String(PERCENTAGE_FONT_SIZE_PX) + "px",
      lineHeight: String(PERCENTAGE_LINE_HEIGHT_PX) + "px",
    }}
  >
    {value}%
  </span>
);

interface ProgressBarProps {
  /**
   * 현재 진행 값 (필수)
   */
  value: number;
  /**
   * 최대 값
   * @default 100
   */
  max?: number;
  /**
   * 퍼센티지 표시 여부
   * @default false
   */
  showPercentage?: boolean;
  /**
   * 진행 바 위에 표시될 서브 텍스트
   */
  subText?: React.ReactNode;
}

/**
 * 진행 표시줄 컴포넌트
 *
 * 작업의 진행 상태를 시각적으로 표시하는 컴포넌트입니다.
 *
 * @param value - 현재 진행 값 (필수)
 * @param max - 최대 값 (기본값: `100`)
 * @param showPercentage - 퍼센티지 표시 여부 (기본값: `false`)
 * @param subText - 진행 바 위에 표시될 서브 텍스트
 *
 * @example
 * ```tsx
 * // 기본 진행 표시줄
 * <ProgressBar value={50} max={100} />
 *
 * // 퍼센티지 표시
 * <ProgressBar value={75} max={100} showPercentage />
 *
 * // 서브 텍스트 포함
 * <ProgressBar
 *   value={60}
 *   max={100}
 *   showPercentage
 *   subText="파일 업로드 중..."
 * />
 * ```
 */
const ProgressBar = ({
  value,
  max = 100,
  showPercentage = false,
  subText,
}: ProgressBarProps) => {
  const safeMax = max > 0 ? max : 1;
  const percent = Math.max(0, Math.min(100, (value / safeMax) * 100));

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <SubText>{subText}</SubText>
      <div className="flex w-full items-center gap-4">
        <Progress value={value} max={safeMax} percent={percent} />
        {showPercentage && <Percentage value={Math.round(percent)} />}
      </div>
    </div>
  );
};

export default ProgressBar;
