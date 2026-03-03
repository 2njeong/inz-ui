import { useState } from "react";
import { ProgressBar } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const progressBarProps = [
  { name: "value", type: "number", description: "현재 진행 값 (필수)", required: true },
  { name: "max", type: "number", default: "100", description: "최대 값", required: false },
  { name: "showPercentage", type: "boolean", default: "false", description: "퍼센티지 표시 여부", required: false },
  { name: "subText", type: "ReactNode", description: "진행 바 위에 표시될 서브 텍스트", required: false },
];

const ProgressBarDemo = () => {
  const [value, setValue] = useState(65);

  return (
    <Section id="progressbar" title="ProgressBar" description="진행률 표시 컴포넌트">
      <PropsTable props={progressBarProps} />

      <DemoBox>
        <div className="flex flex-col gap-6 max-w-lg">
          <ProgressBar value={value} max={100} showPercentage subText={`${value}% 완료`} />
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full"
          />
          <ProgressBar value={30} max={100} />
          <ProgressBar value={100} max={100} showPercentage subText="완료!" />
        </div>
      </DemoBox>
      <CodeBlock code={`import { ProgressBar } from "inz-ui";

<ProgressBar
  value={65}
  max={100}
  showPercentage
  subText="65% 완료"
/>`} />
    </Section>
  );
};

export default ProgressBarDemo;
