import { Indicator } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const indicatorProps = [
  { name: "size", type: "number", default: "24", description: "인디케이터 크기 (픽셀)", required: false },
];

const IndicatorDemo = () => {
  return (
    <Section id="indicator" title="Indicator" description="로딩 인디케이터 (스피너) 컴포넌트">
      <PropsTable props={indicatorProps} />

      <DemoBox>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Indicator size={16} />
            <span className="details2 text-inz-text-caption">16px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Indicator size={24} />
            <span className="details2 text-inz-text-caption">24px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Indicator size={32} />
            <span className="details2 text-inz-text-caption">32px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Indicator size={48} />
            <span className="details2 text-inz-text-caption">48px</span>
          </div>
        </div>
      </DemoBox>
      <CodeBlock code={`import { Indicator } from "inz-ui";

<Indicator size={24} />`} />
    </Section>
  );
};

export default IndicatorDemo;
