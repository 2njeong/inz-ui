import { cva, type VariantProps } from "class-variance-authority";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
  toDate,
} from "date-fns";
import { useState } from "react";

import ChevronLeftIcon from "@ui/icons/ChevronLeftIcon";
import ChevronRightIcon from "@ui/icons/ChevronRightIcon";
import { cn } from "@ui/utils/cn";

/**
 * @param date
 * @returns `YYYY-MM-DD`
 */
const dateToYYYYMMDD = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return "-";
  }

  return format(date, "yyyy-MM-dd");
};

const calendarDayVariants = cva(
  "flex h-full w-full items-center justify-center rounded-sm",
  {
    variants: {
      selection: {
        none: "hover:bg-inz-coolgrey-80",
        primary: "bg-inz-primary-50 text-white",
        inRange: "bg-inz-primary-90 text-inz-text-body rounded-none",
        endpoint: "bg-inz-primary-90 text-inz-text-body",
      },
      rounding: {
        default: "rounded-sm",
        start: "rounded-l-md rounded-r-none",
        end: "rounded-r-md rounded-l-none",
        none: "rounded-none",
      },
      isToday: { true: "text-inz-primary-50" },
      isDisabled: { true: "cursor-not-allowed" },
      isOutsideMonth: { true: "text-inz-text-disabled" },
      isDayOff: { true: "text-[#FF918A]" },
      isGenerallyDisabled: { true: "text-inz-greyscale-50" },
    },
    compoundVariants: [
      {
        isDisabled: true,
        isDayOff: true,
        className: "text-[#FF918A]",
      },
      {
        isDisabled: true,
        isDayOff: false,
        className: "text-inz-greyscale-50",
      },
      {
        selection: ["primary", "inRange", "endpoint"],
        isToday: true,
        className: "text-white",
      },
    ],
  }
);

type DateRange<T> = {
  from?: T;
  to?: T;
};

type CalendarValue = string | DateRange<string>;
type InternalDateRange = DateRange<Date>;
type InternalCalendarValue = Date | InternalDateRange;

interface CalendarProps {
  /**
   * 캘린더 모드
   * @default "single"
   */
  mode?: "single" | "range";
  /**
   * 선택된 날짜 또는 날짜 범위
   * - `mode="single"`: `YYYY-MM-DD` 형식의 문자열
   * - `mode="range"`: `{ from?: string, to?: string }` 형식의 객체
   */
  value?: CalendarValue;
  /**
   * 날짜 선택 시 실행할 콜백 함수
   */
  onValueChange?: (value?: CalendarValue) => void;
  /**
   * 휴일로 표시할 날짜 배열 (YYYY-MM-DD 형식)
   */
  dayOff?: string[];
  /**
   * 비활성화할 날짜 배열 (YYYY-MM-DD 형식)
   */
  disabled?: string[];
  /**
   * 이전/다음 달 날짜 표시 여부
   * @default false
   */
  showOutsideDays?: boolean;
  /**
   * 다음 달로 이동 비활성화 여부
   * @default false
   */
  diableNextMonth?: boolean;
}

export type { CalendarValue, DateRange };

const EMPTY_STRING_ARRAY: string[] = [];

type CalendarDayProps = {
  day: Date;
  currentMonth: Date;
  selectedValue?: InternalCalendarValue;
  selecting?: InternalDateRange;
  mode: "single" | "range";
  showOutsideDays: boolean;
  isDayOff: (date: Date) => boolean;
  isDisabled: (date: Date) => boolean;
  handleDayClick: (day: Date) => void;
};

const CalendarDay = ({
  day,
  currentMonth,
  selectedValue,
  selecting,
  mode,
  showOutsideDays,
  isDayOff,
  isDisabled,
  handleDayClick,
}: CalendarDayProps) => {
  const isCurrentMonth = isSameMonth(day, currentMonth);

  if (!showOutsideDays && !isCurrentMonth) {
    return <div className="aspect-square w-full" />;
  }

  const dayState = (() => {
    const isSameAsToday = isToday(day);
    const isMarkedAsDayOff = isDayOff(day);
    const isMarkedAsDisabled = isDisabled(day);
    const isEffectivelyDisabled = isMarkedAsDisabled || isMarkedAsDayOff;

    const modeState = (() => {
      if (mode === "single") {
        const isSelected =
          selectedValue instanceof Date && isSameDay(day, selectedValue);
        return {
          selection: isSelected ? ("primary" as const) : ("none" as const),
          rounding: "default" as const,
        };
      }

      // Range mode
      const rangeValue =
        selectedValue && "from" in selectedValue ? selectedValue : undefined;
      const from = rangeValue?.from;
      const to = rangeValue?.to;

      const isRangeStart = !!from && isSameDay(day, from);
      const isRangeEnd = !!to && isSameDay(day, to);
      const isRangeSelectingStart = !!(
        selecting?.from && isSameDay(day, selecting.from)
      );
      const isInRange = !!(
        from &&
        to &&
        isAfter(day, from) &&
        isBefore(day, to)
      );

      const isSelected = isRangeStart || isRangeEnd;
      const isPrimarySelected = isSelected || isRangeSelectingStart;

      const isCompleteRange = !!(from && to);
      const isEndpointOfCompleteRange =
        isCompleteRange && (isRangeStart || isRangeEnd);

      const selection: VariantProps<typeof calendarDayVariants>["selection"] =
        (() => {
          if (isInRange) return "inRange";
          if (isEndpointOfCompleteRange) return "endpoint";
          if (isPrimarySelected) return "primary";
          return "none";
        })();

      const rounding: VariantProps<typeof calendarDayVariants>["rounding"] =
        (() => {
          if (isRangeStart && !to) return "default";
          if (isRangeStart && isRangeEnd) return "default";
          if (isRangeStart) return "start";
          if (isRangeEnd) return "end";
          if (isInRange) return "none";
          return "default";
        })();

      return { selection, rounding };
    })();

    return {
      isToday: isSameAsToday || undefined,
      isDisabled: isEffectivelyDisabled || undefined,
      isOutsideMonth: !isCurrentMonth || undefined,
      isDayOff: isMarkedAsDayOff || undefined,
      isGenerallyDisabled: isMarkedAsDisabled || undefined,
      ...modeState,
    };
  })();

  return (
    <div
      key={day.toString()}
      className={cn("flex aspect-square items-center justify-center")}
    >
      <button
        type="button"
        onClick={() => {
          handleDayClick(day);
        }}
        disabled={dayState.isDisabled}
        className={cn(calendarDayVariants(dayState))}
      >
        {format(day, "d")}
      </button>
    </div>
  );
};

type CalendarHeaderProps = {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const CalendarHeader = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <button type="button" onClick={onPrevMonth} className="p-1">
        <ChevronLeftIcon size={20} color="var(--color-inz-coolgrey-40)" />
      </button>
      <div className="text-inz-text-body text-base font-medium">
        {format(currentMonth, "yyyy년 MM월")}
      </div>
      <button type="button" onClick={onNextMonth} className="p-1">
        <ChevronRightIcon size={20} color="var(--color-inz-coolgrey-40)" />
      </button>
    </div>
  );
};

const CalendarWeekdays = () => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="text-inz-text-helper grid grid-cols-7 text-center text-sm">
      {weekdays.map((day) => (
        <div
          key={day}
          className="flex aspect-square items-center justify-center"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

/**
 * 캘린더 컴포넌트
 *
 * 날짜 선택을 위한 캘린더 컴포넌트입니다. 단일 날짜 선택과 날짜 범위 선택을 지원합니다.
 *
 * @param mode - 캘린더 모드: `single` (단일 선택) | `range` (범위 선택) (기본값: `single`)
 * @param value - 선택된 날짜 또는 날짜 범위
 *   - `mode="single"`: `YYYY-MM-DD` 형식의 문자열
 *   - `mode="range"`: `{ from?: string, to?: string }` 형식의 객체
 * @param onValueChange - 날짜 선택 시 실행할 콜백 함수
 * @param dayOff - 휴일로 표시할 날짜 배열 (YYYY-MM-DD 형식)
 * @param disabled - 비활성화할 날짜 배열 (YYYY-MM-DD 형식)
 * @param showOutsideDays - 이전/다음 달 날짜 표시 여부 (기본값: `false`)
 * @param diableNextMonth - 다음 달로 이동 비활성화 여부 (기본값: `false`)
 *
 * @example
 * ```tsx
 * // 단일 날짜 선택
 * <Calendar
 *   mode="single"
 *   value={selectedDate}
 *   onValueChange={(date) => setSelectedDate(date)}
 * />
 *
 * // 날짜 범위 선택
 * <Calendar
 *   mode="range"
 *   value={dateRange}
 *   onValueChange={(range) => setDateRange(range)}
 *   dayOff={["2024-01-01", "2024-12-25"]}
 *   disabled={disabledDates}
 * />
 *
 * // 이전/다음 달 날짜 표시
 * <Calendar
 *   mode="single"
 *   showOutsideDays={true}
 *   value={date}
 *   onValueChange={(date) => setDate(date)}
 * />
 * ```
 */
const Calendar = ({
  mode = "single",
  value,
  onValueChange,
  dayOff = EMPTY_STRING_ARRAY,
  disabled = EMPTY_STRING_ARRAY,
  showOutsideDays = false,
  diableNextMonth = false,
}: CalendarProps) => {
  const valueAsDate = (() => {
    if (!value) return undefined;
    if (mode === "single" && typeof value === "string") {
      return toDate(value);
    }
    if (mode === "range" && typeof value === "object") {
      const rangeValue = value;
      return {
        from: rangeValue.from ? toDate(rangeValue.from) : undefined,
        to: rangeValue.to ? toDate(rangeValue.to) : undefined,
      };
    }
    return undefined;
  })();

  const disabledDates = disabled.map((d) => toDate(d));
  const dayOffDates = dayOff.map((d) => toDate(d));

  const getInitialMonth = () => {
    if (!valueAsDate) return new Date();
    if (mode === "single" && valueAsDate instanceof Date) return valueAsDate;
    if (mode === "range" && "from" in valueAsDate && valueAsDate.from) {
      return valueAsDate.from;
    }
    return new Date();
  };
  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(getInitialMonth())
  );
  const [selecting, setSelecting] = useState<InternalDateRange>({});

  const handlePrevMonth = () => {
    if (diableNextMonth && isBefore(currentMonth, new Date())) return;
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const startDayOfGrid = startOfWeek(startOfMonth(currentMonth));
  const endDayOfGrid = endOfWeek(endOfMonth(currentMonth));
  const daysInGrid = eachDayOfInterval({
    start: startDayOfGrid,
    end: endDayOfGrid,
  });

  const isDayOff = (date: Date) => dayOffDates.some((d) => isSameDay(d, date));
  const isDisabled = (date: Date) =>
    disabledDates.some((d) => isSameDay(d, date));

  const handleDayClick = (day: Date) => {
    if (mode === "single") {
      onValueChange?.(dateToYYYYMMDD(day));
      return;
    }

    if (!selecting.from) {
      setSelecting({ from: day });
      onValueChange?.({ from: dateToYYYYMMDD(day), to: undefined });
    } else if (!selecting.to) {
      if (isAfter(day, selecting.from)) {
        onValueChange?.({
          from: dateToYYYYMMDD(selecting.from),
          to: dateToYYYYMMDD(day),
        });
        setSelecting({});
      } else {
        setSelecting({ from: day });
        onValueChange?.({ from: dateToYYYYMMDD(day), to: undefined });
      }
    }
  };

  return (
    <div className="w-full min-w-[248px] p-3">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarWeekdays />
      <div className="grid grid-cols-7 text-center text-sm">
        {daysInGrid.map((day) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            currentMonth={currentMonth}
            selectedValue={valueAsDate}
            selecting={selecting}
            mode={mode}
            showOutsideDays={showOutsideDays}
            isDayOff={isDayOff}
            isDisabled={isDisabled}
            handleDayClick={handleDayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
