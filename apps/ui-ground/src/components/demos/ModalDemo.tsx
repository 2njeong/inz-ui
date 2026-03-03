import { useState } from "react";
import { Modal, StandardButton } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const modalProps = [
  { name: "isOpen", type: "boolean", description: "모달 표시 여부", required: true },
  { name: "onClose", type: "() => void", description: "모달 닫기 시 실행할 콜백 함수", required: true },
  { name: "onCancel", type: "() => void", description: "취소 버튼 클릭 시 실행할 콜백 함수", required: false },
  { name: "title", type: "string", description: "모달 헤더에 표시될 제목", required: true },
  { name: "headerContent", type: "ReactNode", description: "모달 헤더에 표시될 컨텐츠", required: false },
  { name: "children", type: "ReactNode", description: "모달 본문에 표시될 컨텐츠", required: true },
  { name: "buttonText", type: "string", description: "확인 버튼에 표시될 텍스트", required: true },
  { name: "footerContent", type: "ReactNode", description: "취소 버튼에 표시될 텍스트", required: false },
  { name: "cancelText", type: "string", description: "푸터에 표시될 컨텐츠", required: true },
  { name: "onConfirm", type: "() => void", description: "확인 버튼 클릭 시 실행할 콜백 함수", required: true },
  { name: "isLoading", type: "boolean", default: "false", description: "로딩 상태 표시 여부", required: false },
  { name: "isConfirmDisabled", type: "boolean", default: "false", description: "확인 버튼 비활성화 여부", required: false },
];

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id="modal" title="Modal" description="모달 다이얼로그 컴포넌트">
      <PropsTable props={modalProps} />

      <DemoBox>
        <StandardButton variant="primary" size="md" onClick={() => setIsOpen(true)}>
          모달 열기
        </StandardButton>
      </DemoBox>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="모달 제목"
        buttonText="확인"
        cancelText="취소"
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-3 py-4">
          <p className="body3 text-inz-text-body">모달 본문 콘텐츠입니다.</p>
          <p className="body4 text-inz-text-helper">
            여기에 폼, 안내 텍스트 등 다양한 콘텐츠를 배치할 수 있습니다.
          </p>
        </div>
      </Modal>

      <CodeBlock code={`import { Modal } from "inz-ui";

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="모달 제목"
  buttonText="확인"
  cancelText="취소"
  onConfirm={() => setIsOpen(false)}
  onCancel={() => setIsOpen(false)}
>
  <p>모달 본문 콘텐츠</p>
</Modal>`} />
    </Section>
  );
};

export default ModalDemo;
