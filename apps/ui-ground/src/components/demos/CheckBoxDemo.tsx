import { useState } from "react";
import { CheckBox } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const checkBoxProps = [
  { name: "label", type: "string", description: "체크박스 옆에 표시될 라벨 텍스트", required: false },
  { name: "required", type: "boolean", default: "false", description: "필수 표시 여부 (라벨 옆에 * 표시)", required: false },
  { name: "id", type: "string", description: "체크박스의 고유 식별자", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
  { name: "size", type: '"sm" | "md"', description: "체크박스 크기: `sm` (20px) | `md` (24px) (기본값: `md`)", required: false },
  { name: "checked", type: "boolean", description: "체크 상태 (제어 컴포넌트)", required: false },
  { name: "defaultChecked", type: "boolean", description: "기본 체크 상태 (비제어 컴포넌트)", required: false },
  { name: "onChange", type: "ChangeEventHandler<HTMLInputElement>", description: "체크 상태 변경 시 실행할 콜백 함수", required: false },
  { name: "disabled", type: "boolean", description: "비활성화 여부", required: false },
];

const CheckBoxDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <Section id="checkbox" title="CheckBox" description="체크박스 컴포넌트">
      <PropsTable props={checkBoxProps} />

      <DemoBox label="States">
        <div className="flex flex-wrap items-center gap-6">
          <CheckBox label="기본" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
          <CheckBox label="체크됨" checked={checked2} onChange={(e) => setChecked2(e.target.checked)} />
          <CheckBox label="필수" checked={checked3} onChange={(e) => setChecked3(e.target.checked)} required />
          <CheckBox label="비활성화" checked={false} onChange={() => {}} disabled />
        </div>
      </DemoBox>

      <DemoBox label="Sizes">
        <div className="flex flex-wrap items-center gap-6">
          <CheckBox label="Size MD (기본)" size="md" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
          <CheckBox label="Size SM" size="sm" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
        </div>
      </DemoBox>
      <CodeBlock code={`import { CheckBox } from "inz-ui";

const [checked, setChecked] = useState(false);

<CheckBox
  label="동의합니다"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`} />
    </Section>
  );
};

export default CheckBoxDemo;
