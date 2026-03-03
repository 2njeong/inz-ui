import { useState } from "react";
import { NumberPicker } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const numberPickerProps = [
  { name: "value", type: "number", description: "현재 숫자 값 (필수)", required: true },
  { name: "onIncrement", type: "() => void", description: "증가 버튼 클릭 시 실행할 콜백 함수 (필수)", required: true },
  { name: "onDecrement", type: "() => void", description: "감소 버튼 클릭 시 실행할 콜백 함수 (필수)", required: true },
  { name: "minValue", type: "number", description: "최소값", required: false },
  { name: "maxValue", type: "number", description: "최대값", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
  { name: "readOnly", type: "boolean", default: "true", description: "입력 필드 읽기 전용 여부", required: false },
  { name: "required", type: "boolean", default: "false", description: "필수 표시 여부 (오른쪽에 * 표시)", required: false },
];

const NumberPickerDemo = () => {
  const [count, setCount] = useState(1);

  return (
    <Section id="numberpicker" title="NumberPicker" description="숫자 증감 입력 컴포넌트">
      <PropsTable props={numberPickerProps} />

      <DemoBox>
        <div className="flex items-center gap-4">
          <NumberPicker
            value={count}
            onIncrement={() => setCount((v) => Math.min(v + 1, 10))}
            onDecrement={() => setCount((v) => Math.max(v - 1, 0))}
            minValue={0}
            maxValue={10}
          />
          <span className="body3 text-inz-text-helper">현재 값: {count}</span>
        </div>
      </DemoBox>
      <CodeBlock code={`import { NumberPicker } from "inz-ui";

const [count, setCount] = useState(1);

<NumberPicker
  value={count}
  onIncrement={() => setCount(v => Math.min(v + 1, 10))}
  onDecrement={() => setCount(v => Math.max(v - 1, 0))}
  minValue={0}
  maxValue={10}
/>`} />
    </Section>
  );
};

export default NumberPickerDemo;
