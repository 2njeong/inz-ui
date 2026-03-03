import { useState } from "react";
import { Drawer, StandardButton } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const drawerProps = [
  { name: "title", type: "string | ReactNode", description: "Drawer 헤더에 표시될 제목 또는 요소", required: true },
  { name: "btnText", type: "string", default: '"완료"', description: "확인 버튼에 표시될 텍스트", required: true },
  { name: "children", type: "ReactNode", description: "Drawer 본문에 표시될 컨텐츠", required: true },
  { name: "size", type: '"sm" | "lg"', default: '"sm"', description: "Drawer 크기", required: false },
  { name: "isOpen", type: "boolean", description: "Drawer 표시 여부", required: true },
  { name: "withCancelBtn", type: "boolean", default: "true", description: "취소 버튼 표시 여부", required: false },
  { name: "onClose", type: "() => void", description: "Drawer 닫기 시 실행할 콜백 함수", required: true },
  { name: "onConfirm", type: "() => void", description: "확인 버튼 클릭 시 실행할 콜백 함수", required: true },
  { name: "isLoading", type: "boolean", default: "false", description: "로딩 상태 표시 여부", required: false },
];

const DrawerDemo = () => {
  const [smOpen, setSmOpen] = useState(false);
  const [lgOpen, setLgOpen] = useState(false);

  return (
    <Section id="drawer" title="Drawer" description="우측에서 슬라이드되는 드로어 컴포넌트">
      <PropsTable props={drawerProps} />

      <DemoBox>
        <div className="flex gap-3">
          <StandardButton variant="primary" size="md" onClick={() => setSmOpen(true)}>
            Small Drawer
          </StandardButton>
          <StandardButton variant="secondary" size="md" onClick={() => setLgOpen(true)}>
            Large Drawer
          </StandardButton>
        </div>
      </DemoBox>

      <Drawer
        isOpen={smOpen}
        size="sm"
        title="Small Drawer"
        btnText="확인"
        onConfirm={() => setSmOpen(false)}
        onClose={() => setSmOpen(false)}
      >
        <div className="px-8 py-4">
          <p className="body3 text-inz-text-body">Small 사이즈 드로어 콘텐츠입니다.</p>
        </div>
      </Drawer>

      <Drawer
        isOpen={lgOpen}
        size="lg"
        title="Large Drawer"
        btnText="확인"
        withCancelBtn
        onConfirm={() => setLgOpen(false)}
        onClose={() => setLgOpen(false)}
      >
        <div className="px-8 py-4">
          <p className="body3 text-inz-text-body">Large 사이즈 드로어 콘텐츠입니다.</p>
          <p className="body4 text-inz-text-helper mt-2">더 넓은 공간을 활용할 수 있습니다.</p>
        </div>
      </Drawer>

      <CodeBlock code={`import { Drawer } from "inz-ui";

const [isOpen, setIsOpen] = useState(false);

<Drawer
  isOpen={isOpen}
  size="sm"
  title="드로어 제목"
  btnText="확인"
  onConfirm={() => setIsOpen(false)}
  onClose={() => setIsOpen(false)}
>
  <div className="px-8">드로어 콘텐츠</div>
</Drawer>`} />
    </Section>
  );
};

export default DrawerDemo;
