import { useState } from "react";
import { Radio } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const radioProps = [
  { name: "label", type: "string", description: "라디오 버튼 옆에 표시될 라벨 텍스트", required: false },
  { name: "required", type: "boolean", default: "false", description: "필수 표시 여부 (라벨 옆에 * 표시)", required: false },
  { name: "id", type: "string", description: "라디오 버튼의 고유 식별자", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
  { name: "size", type: '"sm" | "md"', description: "라디오 버튼 크기: `sm` (20px) | `md` (24px) (기본값: `md`)", required: false },
  { name: "name", type: "string", description: "라디오 버튼 그룹 이름 (같은 name을 가진 라디오들은 그룹화됨)", required: false },
  { name: "value", type: "string | number | readonly string[]", description: "라디오 버튼의 값", required: false },
  { name: "checked", type: "boolean", description: "선택 상태 (제어 컴포넌트)", required: false },
  { name: "defaultChecked", type: "boolean", description: "기본 선택 상태 (비제어 컴포넌트)", required: false },
  { name: "onChange", type: "ChangeEventHandler<HTMLInputElement>", description: "선택 상태 변경 시 실행할 콜백 함수", required: false },
  { name: "disabled", type: "boolean", description: "비활성화 여부", required: false },
];

const RadioDemo = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <Section id="radio" title="Radio" description="라디오 버튼 컴포넌트">
      <PropsTable props={radioProps} />

      <DemoBox label="Radio Group">
        <div className="flex flex-wrap items-center gap-6">
          {["option1", "option2", "option3"].map((val) => (
            <Radio
              key={val}
              label={`옵션 ${val.slice(-1)}`}
              value={val}
              checked={selected === val}
              onChange={() => setSelected(val)}
            />
          ))}
          <Radio label="비활성화" value="disabled" checked={false} onChange={() => {}} disabled />
        </div>
      </DemoBox>

      <DemoBox label="Sizes">
        <div className="flex flex-wrap items-center gap-6">
          <Radio label="Size MD (기본)" value="md" size="md" checked={true} onChange={() => {}} />
          <Radio label="Size SM" value="sm" size="sm" checked={true} onChange={() => {}} />
        </div>
      </DemoBox>
      <CodeBlock code={`import { Radio } from "inz-ui";

const [selected, setSelected] = useState("option1");

<Radio
  label="옵션 1"
  value="option1"
  checked={selected === "option1"}
  onChange={() => setSelected("option1")}
/>`} />
    </Section>
  );
};

export default RadioDemo;
