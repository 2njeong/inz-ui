import { useState } from "react";
import { PopUp, StandardButton } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const popUpProps = [
  { name: "isOpen", type: "boolean", description: "팝업 표시 여부", required: true },
  { name: "title", type: "string", default: '"title"', description: "팝업 헤더에 표시될 제목", required: true },
  { name: "text", type: "string", default: '"text"', description: "팝업 본문에 표시될 설명 텍스트", required: true },
  { name: "content", type: "ReactNode", default: '"context"', description: "팝업 본문에 표시될 컨텐츠", required: true },
  { name: "confirmText", type: "string", default: '"확인"', description: "확인 버튼에 표시될 텍스트", required: true },
  { name: "onClose", type: "() => void", description: "팝업 닫기 시 실행할 콜백 함수", required: true },
  { name: "onConfirm", type: "() => void", description: "확인 버튼 클릭 시 실행할 콜백 함수", required: true },
];

const PopUpDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id="popup" title="PopUp" description="정보 안내용 팝업 컴포넌트">
      <PropsTable props={popUpProps} />

      <DemoBox>
        <StandardButton variant="primary" size="md" onClick={() => setIsOpen(true)}>
          팝업 열기
        </StandardButton>
      </DemoBox>

      <PopUp
        isOpen={isOpen}
        title="발송시점이란?"
        text="발송 시점 설정 시, 연결된 템플릿들이 순차적으로 자동 발송됩니다."
        content={
          <div className="flex flex-col gap-2">
            <p className="body4 text-inz-text-subbody">
              예를 들어 첫 템플릿이 발송된 후, 3일 후와 7일 후로 설정된 템플릿이 자동으로 발송됩니다.
            </p>
          </div>
        }
        confirmText="확인"
        onConfirm={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      />

      <CodeBlock code={`import { PopUp } from "inz-ui";

<PopUp
  isOpen={isOpen}
  title="안내"
  text="안내 텍스트입니다."
  content={<p>추가 콘텐츠</p>}
  confirmText="확인"
  onConfirm={() => setIsOpen(false)}
  onClose={() => setIsOpen(false)}
/>`} />
    </Section>
  );
};

export default PopUpDemo;
