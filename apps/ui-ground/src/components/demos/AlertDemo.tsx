import { useState } from "react";
import { Alert, StandardButton } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const alertProps = [
  { name: "isOpen", type: "boolean", description: "알림 표시 여부", required: true },
  { name: "type", type: '"error" | "confirm" | "complete"', description: "알림 타입", required: true },
  { name: "children", type: "ReactElement", description: "알림 본문에 표시할 추가 컨텐츠", required: false },
  { name: "confirmText", type: "string", default: '"확인"', description: "확인 버튼 텍스트", required: false },
  { name: "cancelText", type: "string", description: "취소 버튼 텍스트", required: false },
  { name: "mainText", type: "string", description: "알림의 주요 메시지 (제목)", required: false },
  { name: "subText", type: "string", description: "알림의 부가 설명 (본문)", required: false },
  { name: "onConfirm", type: "() => void", description: "확인 버튼 클릭 시 실행할 콜백 함수", required: false },
  { name: "onClose", type: "() => void", description: "알림 닫기 시 실행할 콜백 함수", required: true },
];

const AlertDemo = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);

  return (
    <Section id="alert" title="Alert" description="확인/에러/완료 알림 다이얼로그">
      <PropsTable props={alertProps} />

      <DemoBox>
        <div className="flex gap-3">
          <StandardButton variant="primary" size="md" onClick={() => setConfirmOpen(true)}>
            Confirm Alert
          </StandardButton>
          <StandardButton variant="secondary" size="md" onClick={() => setErrorOpen(true)}>
            Error Alert
          </StandardButton>
          <StandardButton variant="tertiary" size="md" onClick={() => setCompleteOpen(true)}>
            Complete Alert
          </StandardButton>
        </div>
      </DemoBox>

      <Alert
        isOpen={confirmOpen}
        type="confirm"
        mainText="변경사항을 저장하시겠습니까?"
        subText="저장하지 않은 변경사항은 사라집니다."
        confirmText="확인"
        cancelText="취소"
        onConfirm={() => setConfirmOpen(false)}
        onClose={() => setConfirmOpen(false)}
      />

      <Alert
        isOpen={errorOpen}
        type="error"
        mainText="오류가 발생했습니다"
        subText="잠시 후 다시 시도해주세요."
        confirmText="확인"
        onClose={() => setErrorOpen(false)}
      />

      <Alert
        isOpen={completeOpen}
        type="complete"
        mainText="저장이 완료되었습니다"
        subText="성공적으로 처리되었습니다."
        confirmText="확인"
        onClose={() => setCompleteOpen(false)}
      />

      <CodeBlock code={`import { Alert } from "inz-ui";

const [isOpen, setIsOpen] = useState(false);

<Alert
  isOpen={isOpen}
  type="confirm"
  mainText="변경사항을 저장하시겠습니까?"
  subText="저장하지 않은 변경사항은 사라집니다."
  confirmText="확인"
  cancelText="취소"
  onConfirm={() => setIsOpen(false)}
  onClose={() => setIsOpen(false)}
/>`} />
    </Section>
  );
};

export default AlertDemo;
