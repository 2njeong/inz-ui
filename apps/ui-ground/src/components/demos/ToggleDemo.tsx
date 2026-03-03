import { useState } from "react";
import { Toggle } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const toggleProps = [
  { name: "id", type: "string", description: "Toggle의 고유 식별자", required: false },
  { name: "label", type: "string", description: "Toggle 옆에 표시될 라벨 텍스트", required: false },
  { name: "labelPosition", type: '"left" | "right"', default: '"left"', description: "라벨 위치", required: false },
  { name: "required", type: "boolean", default: "false", description: "필수 표시 여부 (라벨 옆에 * 표시)", required: false },
  { name: "className", type: "string", description: "Toggle 스위치에 적용할 CSS 클래스명", required: false },
  { name: "containerClassName", type: "string", description: "컨테이너에 적용할 CSS 클래스명", required: false },
  { name: "checked", type: "boolean", description: "토글 상태 (제어 컴포넌트)", required: false },
  { name: "defaultChecked", type: "boolean", description: "기본 토글 상태 (비제어 컴포넌트)", required: false },
  { name: "onChange", type: "ChangeEventHandler<HTMLInputElement>", description: "토글 상태 변경 시 실행할 콜백 함수", required: false },
  { name: "disabled", type: "boolean", description: "비활성화 여부", required: false },
];

const ToggleDemo = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);

  return (
    <Section id="toggle" title="Toggle" description="토글 스위치 컴포넌트">
      <PropsTable props={toggleProps} />

      <DemoBox label="States">
        <div className="flex flex-wrap items-center gap-6">
          <Toggle id="t1" label="OFF" checked={toggle1} onChange={(e) => setToggle1(e.target.checked)} />
          <Toggle id="t2" label="ON" checked={toggle2} onChange={(e) => setToggle2(e.target.checked)} />
          <Toggle id="t3" label="비활성화" checked={false} onChange={() => {}} disabled />
          <Toggle id="t4" label="왼쪽 라벨" checked={toggle1} onChange={(e) => setToggle1(e.target.checked)} labelPosition="left" />
        </div>
      </DemoBox>
      <CodeBlock code={`import { Toggle } from "inz-ui";

const [isOn, setIsOn] = useState(false);

<Toggle
  id="myToggle"
  label="알림 수신"
  checked={isOn}
  onChange={(e) => setIsOn(e.target.checked)}
/>`} />
    </Section>
  );
};

export default ToggleDemo;
