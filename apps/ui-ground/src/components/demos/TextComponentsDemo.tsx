import { Label, HelpText, InvalidText, WordCounter, Input } from "inz-ui";
import { useState } from "react";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const labelProps = [
  { name: "labelText", type: "string", description: "라벨에 표시될 텍스트", required: false },
  { name: "alignMode", type: '"vertical" | "horizontal"', default: '"vertical"', description: "라벨 정렬 모드", required: false },
  { name: "showAsterisk", type: "boolean", default: "false", description: "필수 표시 여부 (라벨 옆에 * 표시)", required: false },
  { name: "children", type: "ReactNode", description: "라벨과 함께 표시될 자식 요소 (입력 필드 등)", required: true },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
];

const TextComponentsDemo = () => {
  const [text, setText] = useState("샘플 텍스트");

  return (
    <Section id="texts" title="Text Components" description="Label, HelpText, InvalidText, WordCounter">
      <PropsTable props={labelProps} />

      <DemoBox label="Label">
        <div className="flex flex-col gap-4 max-w-md">
          <Label labelText="기본 라벨" showAsterisk>
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="입력하세요" />
          </Label>
        </div>
      </DemoBox>

      <DemoBox label="HelpText / InvalidText / WordCounter">
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <p className="body3 text-inz-text-body mb-1">HelpText</p>
            <HelpText text="도움말 텍스트입니다. 입력 가이드를 제공합니다." />
          </div>
          <div>
            <p className="body3 text-inz-text-body mb-1">InvalidText</p>
            <InvalidText text="올바른 이메일 형식을 입력해주세요." />
          </div>
          <div>
            <p className="body3 text-inz-text-body mb-1">WordCounter</p>
            <WordCounter value={text} maxLength={100} />
          </div>
        </div>
      </DemoBox>

      <CodeBlock code={`import { Label, HelpText, InvalidText, WordCounter } from "inz-ui";

<Label labelText="이메일" showAsterisk>
  <Input value={value} onChange={handleChange} />
</Label>

<HelpText text="도움말 텍스트입니다." />
<InvalidText text="에러 메시지입니다." />
<WordCounter value={text} maxLength={100} />`} />
    </Section>
  );
};

export default TextComponentsDemo;
