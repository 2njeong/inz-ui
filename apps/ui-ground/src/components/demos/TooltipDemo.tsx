import { Tooltip, StatusHelpSolidIcon, StandardButton } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const tooltipProps = [
  { name: "children", type: "ReactNode", description: "툴팁을 표시할 대상 요소 (필수)", required: true },
  { name: "content", type: "string | ReactNode", description: "툴팁에 표시될 컨텐츠 (필수)", required: true },
  { name: "placement", type: '"left" | "right" | "top" | "bottom"', default: '"top"', description: "툴팁 위치", required: false },
  { name: "icon", type: "ReactNode", description: "툴팁 앞에 표시할 아이콘", required: false },
  { name: "maxLines", type: "number", default: "2", description: "최대 표시 줄 수", required: false },
  { name: "preserveNewlines", type: "boolean", default: "false", description: "줄바꿈 문자 보존 여부", required: false },
  { name: "align", type: '"left" | "right" | "center"', default: '"center"', description: "텍스트 정렬", required: false },
  { name: "variant", type: '"default" | "white"', description: "툴팁 스타일: `default` (어두운 배경) | `white` (흰색 배경, 테두리) (기본값: `default`)", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
];

const TooltipDemo = () => {
  return (
    <Section id="tooltip" title="Tooltip" description="호버 시 추가 정보를 표시하는 툴팁 컴포넌트">
      <PropsTable props={tooltipProps} />

      <DemoBox label="Placements">
        <div className="flex flex-wrap items-center gap-6 py-8 justify-center">
          <Tooltip content="상단 툴팁" placement="top">
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>Top</StandardButton>
          </Tooltip>
          <Tooltip content="하단 툴팁" placement="bottom">
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>Bottom</StandardButton>
          </Tooltip>
          <Tooltip content="좌측 툴팁" placement="left">
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>Left</StandardButton>
          </Tooltip>
          <Tooltip content="우측 툴팁" placement="right">
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>Right</StandardButton>
          </Tooltip>
        </div>
      </DemoBox>

      <DemoBox label="Variant - White">
        <div className="flex flex-wrap items-center gap-6 py-8 justify-center">
          <Tooltip content="White 변형 툴팁" variant="white" placement="top">
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>White Top</StandardButton>
          </Tooltip>
          <Tooltip content="White 변형 하단" variant="white" placement="bottom">
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>White Bottom</StandardButton>
          </Tooltip>
        </div>
      </DemoBox>

      <DemoBox label="With Icon">
        <div className="flex items-center gap-2">
          <span className="body3 text-inz-text-body">도움말 아이콘에 호버하세요</span>
          <Tooltip content="발송 시점에 문진표 파일을 선택해 보낼 수 있습니다." placement="bottom">
            <StatusHelpSolidIcon size={20} color="var(--color-inz-greyscale-60)" />
          </Tooltip>
        </div>
      </DemoBox>

      <CodeBlock code={`import { Tooltip, StatusHelpSolidIcon } from "inz-ui";

<Tooltip content="도움말 텍스트" placement="bottom">
  <StatusHelpSolidIcon size={20} color="var(--color-inz-greyscale-60)" />
</Tooltip>`} />
    </Section>
  );
};

export default TooltipDemo;
