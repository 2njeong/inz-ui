import { Badge } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const badgeProps = [
  { name: "badgeLabel", type: "string | ReactNode", description: "뱃지에 표시될 텍스트 또는 요소 (필수)", required: true },
  { name: "icon", type: "ReactNode", description: "뱃지 앞에 표시될 아이콘", required: false },
  { name: "variant", type: '"whiteSolid" | "colorSolid" | "colorSolidGrey" | "text"', description: "뱃지 스타일: `text` (배경 없음) | `whiteSolid` (흰색 배경) | `colorSolid` (색상 배경) | `colorSolidGrey` (회색 톤 색상 배경) (기본값: `text`)", required: false },
  { name: "color", type: '"grey" | "blue" | "purple" | "green" | "red" | "yellow"', description: "뱃지 색상: `grey` | `blue` | `purple` | `green` | `red` | `yellow` (기본값: `grey`)", required: false },
  { name: "size", type: '"sm" | "md"', description: "뱃지 크기: `sm` | `md` (기본값: `md`)", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
];

const BadgeDemo = () => {
  return (
    <Section id="badge" title="Badge" description="상태 표시용 뱃지 컴포넌트">
      <PropsTable props={badgeProps} />

      <DemoBox label="Variants">
        <div className="flex flex-wrap items-center gap-3">
          <Badge badgeLabel="Text Grey" variant="text" color="grey" />
          <Badge badgeLabel="Text Blue" variant="text" color="blue" />
          <Badge badgeLabel="Text Purple" variant="text" color="purple" />
          <Badge badgeLabel="White Solid Grey" variant="whiteSolid" color="grey" />
          <Badge badgeLabel="White Solid Blue" variant="whiteSolid" color="blue" />
          <Badge badgeLabel="Color Solid Green" variant="colorSolid" color="green" />
          <Badge badgeLabel="Color Solid Yellow" variant="colorSolid" color="yellow" />
          <Badge badgeLabel="Color Solid Red" variant="colorSolid" color="red" />
          <Badge badgeLabel="Color Solid Purple" variant="colorSolid" color="purple" />
          <Badge badgeLabel="Color Solid Grey" variant="colorSolidGrey" color="grey" />
        </div>
      </DemoBox>

      <DemoBox label="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Badge badgeLabel="Size MD" variant="colorSolid" color="blue" size="md" />
          <Badge badgeLabel="Size SM" variant="colorSolid" color="blue" size="sm" />
          <Badge badgeLabel="Size MD" variant="whiteSolid" color="green" size="md" />
          <Badge badgeLabel="Size SM" variant="whiteSolid" color="green" size="sm" />
        </div>
      </DemoBox>
      <CodeBlock code={`import { Badge } from "inz-ui";

<Badge badgeLabel="Success" variant="colorSolid" color="green" />
<Badge badgeLabel="Warning" variant="colorSolid" color="yellow" />
<Badge badgeLabel="Error" variant="colorSolidGrey" color="red" />`} />
    </Section>
  );
};

export default BadgeDemo;
