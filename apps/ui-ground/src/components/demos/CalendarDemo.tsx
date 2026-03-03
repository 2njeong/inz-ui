import { useState } from "react";
import { Calendar, DatePicker } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const calendarProps = [
  { name: "mode", type: '"single" | "range"', default: '"single"', description: "캘린더 모드", required: false },
  { name: "value", type: "CalendarValue", description: "선택된 날짜 또는 날짜 범위", required: false },
  { name: "onValueChange", type: "(value?: CalendarValue) => void", description: "날짜 선택 시 실행할 콜백 함수", required: false },
  { name: "dayOff", type: "string[]", description: "휴일로 표시할 날짜 배열 (YYYY-MM-DD 형식)", required: false },
  { name: "disabled", type: "string[]", description: "비활성화할 날짜 배열 (YYYY-MM-DD 형식)", required: false },
  { name: "showOutsideDays", type: "boolean", default: "false", description: "이전/다음 달 날짜 표시 여부", required: false },
  { name: "diableNextMonth", type: "boolean", default: "false", description: "다음 달로 이동 비활성화 여부", required: false },
];

const datePickerProps = [
  { name: "labelText", type: "string", description: "라벨에 표시될 텍스트", required: false },
  { name: "alignMode", type: '"vertical" | "horizontal"', description: "라벨 정렬 모드", required: false },
  { name: "ShowAsterisk", type: "boolean", description: "필수 표시 여부 (라벨 옆에 * 표시)", required: false },
  { name: "value", type: "string", description: "선택된 날짜 값 (YYYY-MM-DD 형식)", required: true },
  { name: "isInvalid", type: "boolean", default: "false", description: "유효성 검사 실패 여부", required: false },
  { name: "helpText", type: "string", description: "도움말 텍스트", required: false },
  { name: "invalidText", type: "string", description: "에러 메시지 텍스트", required: false },
  { name: "size", type: '"sm" | "lg"', default: '"sm"', description: "날짜 선택 필드 크기", required: false },
  { name: "fitParentWidth", type: "boolean", default: "false", description: "툴팁 너비를 부모 요소에 맞춤 여부", required: false },
  { name: "children", type: "ReactNode", description: "날짜 선택 캘린더 컴포넌트 (Calendar 컴포넌트를 전달)", required: true },
  { name: "open", type: "boolean", description: "팝오버 열림 상태 (제어 컴포넌트)", required: false },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "팝오버 열림 상태 변경 시 실행할 콜백 함수", required: false },
];

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const dayOffDates = [`${year}-${month}-01`, `${year}-${month}-15`];
const disabledDates = [`${year}-${month}-10`, `${year}-${month}-20`, `${year}-${month}-25`];

const CalendarDemo = () => {
  const [singleDate, setSingleDate] = useState<string | undefined>(undefined);
  const [rangeValue, setRangeValue] = useState<{ from: string; to: string } | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState("");
  const [smPickerOpen, setSmPickerOpen] = useState(false);
  const [smPickerValue, setSmPickerValue] = useState("");
  const [lgPickerOpen, setLgPickerOpen] = useState(false);
  const [lgPickerValue, setLgPickerValue] = useState("");
  const [invalidPickerOpen, setInvalidPickerOpen] = useState(false);
  const [invalidPickerValue, setInvalidPickerValue] = useState("");
  const [fitPickerOpen, setFitPickerOpen] = useState(false);
  const [fitPickerValue, setFitPickerValue] = useState("");

  return (
    <Section id="calendar" title="Calendar / DatePicker" description="캘린더 및 날짜 선택 컴포넌트">
      <PropsTable props={calendarProps} />

      <DemoBox label="Calendar - Single">
        <div className="flex items-start gap-6">
          <Calendar
            mode="single"
            value={singleDate}
            onValueChange={(val) => setSingleDate(val as string)}
          />
          <p className="body3 text-inz-text-helper mt-4">
            선택된 날짜: {singleDate || "없음"}
          </p>
        </div>
      </DemoBox>
      <CodeBlock code={`import { Calendar } from "inz-ui";

const [date, setDate] = useState<string>();

<Calendar
  mode="single"
  value={date}
  onValueChange={(val) => setDate(val as string)}
/>`} />

      <DemoBox label="Calendar - Range">
        <div className="flex items-start gap-6">
          <Calendar
            mode="range"
            value={rangeValue}
            onValueChange={(val) => setRangeValue(val as { from: string; to: string })}
          />
          <p className="body3 text-inz-text-helper mt-4">
            시작: {rangeValue?.from || "없음"}<br />
            종료: {rangeValue?.to || "없음"}
          </p>
        </div>
      </DemoBox>
      <CodeBlock code={`<Calendar
  mode="range"
  value={rangeValue}
  onValueChange={(val) => setRangeValue(val)}
/>`} />

      <DemoBox label="Calendar - dayOff / disabled / showOutsideDays">
        <div className="flex items-start gap-6">
          <Calendar
            mode="single"
            value={singleDate}
            onValueChange={(val) => setSingleDate(val as string)}
            dayOff={dayOffDates}
            disabled={disabledDates}
            showOutsideDays
          />
          <div className="body3 text-inz-text-helper mt-4">
            <p>dayOff: {dayOffDates.join(", ")}</p>
            <p>disabled: {disabledDates.join(", ")}</p>
            <p>showOutsideDays: true</p>
          </div>
        </div>
      </DemoBox>
      <CodeBlock code={`<Calendar
  mode="single"
  value={date}
  onValueChange={setDate}
  dayOff={["2025-01-01", "2025-01-15"]}
  disabled={["2025-01-10", "2025-01-20"]}
  showOutsideDays
/>`} />

      <h3 className="text-lg font-semibold text-inz-text-body mt-8 mb-2">DatePicker</h3>
      <PropsTable props={datePickerProps} />

      <DemoBox label="DatePicker - 기본">
        <div className="max-w-xs">
          <DatePicker
            labelText="날짜 선택"
            value={pickerValue}
            open={datePickerOpen}
            onOpenChange={setDatePickerOpen}
          >
            <Calendar
              mode="single"
              value={pickerValue}
              onValueChange={(val) => {
                setPickerValue(val as string);
                setDatePickerOpen(false);
              }}
            />
          </DatePicker>
        </div>
      </DemoBox>
      <CodeBlock code={`import { DatePicker, Calendar } from "inz-ui";

<DatePicker
  labelText="날짜 선택"
  value={selectedDate}
  open={open}
  onOpenChange={setOpen}
>
  <Calendar
    mode="single"
    value={selectedDate}
    onValueChange={(val) => {
      setSelectedDate(val);
      setOpen(false);
    }}
  />
</DatePicker>`} />

      <DemoBox label="DatePicker - Size 비교 (sm / lg)">
        <div className="flex items-start gap-6">
          <div className="max-w-xs">
            <DatePicker
              labelText="SM (기본)"
              value={smPickerValue}
              open={smPickerOpen}
              onOpenChange={setSmPickerOpen}
              size="sm"
            >
              <Calendar
                mode="single"
                value={smPickerValue}
                onValueChange={(val) => {
                  setSmPickerValue(val as string);
                  setSmPickerOpen(false);
                }}
              />
            </DatePicker>
          </div>
          <div className="max-w-xs">
            <DatePicker
              labelText="LG"
              value={lgPickerValue}
              open={lgPickerOpen}
              onOpenChange={setLgPickerOpen}
              size="lg"
            >
              <Calendar
                mode="single"
                value={lgPickerValue}
                onValueChange={(val) => {
                  setLgPickerValue(val as string);
                  setLgPickerOpen(false);
                }}
              />
            </DatePicker>
          </div>
        </div>
      </DemoBox>
      <CodeBlock code={`<DatePicker labelText="Small" size="sm" ...>
  <Calendar ... />
</DatePicker>

<DatePicker labelText="Large" size="lg" ...>
  <Calendar ... />
</DatePicker>`} />

      <DemoBox label="DatePicker - isInvalid">
        <div className="max-w-xs">
          <DatePicker
            labelText="날짜 선택"
            value={invalidPickerValue}
            open={invalidPickerOpen}
            onOpenChange={setInvalidPickerOpen}
            isInvalid
            invalidText="날짜를 선택해주세요."
          >
            <Calendar
              mode="single"
              value={invalidPickerValue}
              onValueChange={(val) => {
                setInvalidPickerValue(val as string);
                setInvalidPickerOpen(false);
              }}
            />
          </DatePicker>
        </div>
      </DemoBox>
      <CodeBlock code={`<DatePicker
  labelText="날짜 선택"
  isInvalid
  invalidText="날짜를 선택해주세요."
  ...
>
  <Calendar ... />
</DatePicker>`} />

      <DemoBox label="DatePicker - fitParentWidth">
        <div className="w-full max-w-lg">
          <DatePicker
            labelText="부모 너비 맞춤"
            value={fitPickerValue}
            open={fitPickerOpen}
            onOpenChange={setFitPickerOpen}
            fitParentWidth
          >
            <Calendar
              mode="single"
              value={fitPickerValue}
              onValueChange={(val) => {
                setFitPickerValue(val as string);
                setFitPickerOpen(false);
              }}
            />
          </DatePicker>
        </div>
      </DemoBox>
      <CodeBlock code={`<div style={{ width: "100%" }}>
  <DatePicker labelText="부모 너비 맞춤" fitParentWidth ...>
    <Calendar ... />
  </DatePicker>
</div>`} />
    </Section>
  );
};

export default CalendarDemo;
