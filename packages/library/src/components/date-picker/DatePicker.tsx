import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  size as floatingSize,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useState } from "react";

import CalendarDefaultIcon from "@ui/icons/CalendarDefaultIcon";

import InputFooter from "@ui/components/inputs/InputFooter";
import Label, { AlignMode } from "@ui/components/texts/Label";
import { cn } from "@ui/utils/cn";

interface DatePickerProps {
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
   */
  ShowAsterisk?: boolean;
  /**
   * 선택된 날짜 값 (YYYY-MM-DD 형식)
   */
  value: string;
  /**
   * 유효성 검사 실패 여부
   * @default false
   */
  isInvalid?: boolean;
  /**
   * 도움말 텍스트
   */
  helpText?: string;
  /**
   * 에러 메시지 텍스트
   */
  invalidText?: string;
  /**
   * 날짜 선택 필드 크기
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * 툴팁 너비를 부모 요소에 맞춤 여부
   * @default false
   */
  fitParentWidth?: boolean;
  /**
   * 날짜 선택 캘린더 컴포넌트 (Calendar 컴포넌트를 전달)
   */
  children: React.ReactNode;
  /**
   * 팝오버 열림 상태 (제어 컴포넌트)
   */
  open?: boolean;
  /**
   * 팝오버 열림 상태 변경 시 실행할 콜백 함수
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * 날짜 선택 컴포넌트
 *
 * 날짜를 선택할 수 있는 입력 필드와 캘린더를 제공하는 컴포넌트입니다.
 *
 * @param labelText - 라벨에 표시될 텍스트
 * @param alignMode - 라벨 정렬 모드
 * @param ShowAsterisk - 필수 표시 여부
 * @param value - 선택된 날짜 값 (YYYY-MM-DD 형식) (필수)
 * @param isInvalid - 유효성 검사 실패 여부 (기본값: `false`)
 * @param helpText - 도움말 텍스트
 * @param invalidText - 에러 메시지 텍스트
 * @param size - 날짜 선택 필드 크기: `sm` (40px) | `lg` (48px) (기본값: `sm`)
 * @param fitParentWidth - 툴팁 너비를 부모 요소에 맞춤 여부 (기본값: `false`)
 * @param children - 날짜 선택 캘린더 컴포넌트 (Calendar 컴포넌트를 전달해야 함)
 * @param open - 팝오버 열림 상태 (제어 컴포넌트)
 * @param onOpenChange - 팝오버 열림 상태 변경 시 실행할 콜백 함수
 *
 * @example
 * ```tsx
 * // 기본 날짜 선택
 * <DatePicker
 *   labelText="날짜"
 *   value={date}
 *   isInvalid={!isValidDate(date)}
 *   invalidText="올바른 날짜를 선택하세요"
 * >
 *   <Calendar
 *     mode="single"
 *     value={date}
 *     onValueChange={(value) => setDate(value)}
 *   />
 * </DatePicker>
 *
 * // 필수 날짜 선택
 * <DatePicker
 *   labelText="생년월일"
 *   ShowAsterisk
 *   value={birthDate}
 *   size="lg"
 * >
 *   <Calendar mode="single" value={birthDate} />
 * </DatePicker>
 * ```
 */
const DatePicker = ({
  labelText,
  alignMode,
  ShowAsterisk,
  value,
  isInvalid,
  helpText,
  invalidText,
  size = "sm",
  fitParentWidth = false,
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: DatePickerProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip(),
      shift(),
      fitParentWidth &&
        floatingSize({
          apply({ rects, elements }) {
            elements.floating.style.width = `${String(
              rects.reference.width
            )}px`;
          },
        }),
    ],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="w-full">
      <Label
        labelText={labelText}
        alignMode={alignMode}
        showAsterisk={ShowAsterisk}
      >
        <div className="relative">
          <button
            ref={refs.setReference}
            {...getReferenceProps()}
            type="button"
            className={cn(
              "body2 border-inz-line-border bg-inz-background-container text-inz-text-body placeholder:text-inz-text-caption hover:border-inz-primary-50 focus:border-inz-primary-50 disabled:bg-inz-coolgrey-95 border-1 flex h-10 w-full items-center justify-between gap-x-2 rounded-sm py-3 outline-none",
              isInvalid && "border-inz-status-danger",
              size === "sm" && "body4 h-10 px-4 py-2",
              size === "lg" && "body2 h-12 px-4 py-3"
            )}
          >
            <span
              className={cn({
                "text-inz-text-caption": !value,
              })}
            >
              {value || "날짜를 선택해주세요"}
            </span>
            <CalendarDefaultIcon
              size={size === "lg" ? 24 : 20}
              color="#929ba4"
            />
          </button>
        </div>
        <InputFooter
          helpText={helpText}
          invalidText={invalidText}
          value={value}
        />
      </Label>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="border-inz-line-border border-1 z-20 rounded-sm bg-white shadow-lg"
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};

export default DatePicker;
