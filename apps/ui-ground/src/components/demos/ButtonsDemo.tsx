import { useState } from "react";
import {
  StandardButton,
  DetailButton,
  IconButton,
  OptionButton,
  EditIcon,
  DeleteIcon,
  PlusIcon,
} from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const standardButtonProps = [
  { name: "icon", type: "ReactNode", description: "버튼에 표시할 아이콘 요소", required: false },
  { name: "iconPosition", type: '"left" | "right"', default: '"left"', description: "아이콘이 표시될 위치", required: false },
  { name: "children", type: "ReactNode", description: "버튼 내부에 표시될 텍스트 또는 요소", required: false },
  { name: "isLoading", type: "boolean", default: "false", description: "로딩 상태 표시 여부", required: false },
  { name: "variant", type: '"text" | "primary" | "secondary" | "tertiary"', description: "버튼 스타일: `primary` | `secondary` | `tertiary` | `text` (기본값: `primary`)", required: false },
  { name: "size", type: '"sm" | "md" | "lg"', description: "버튼 크기: `sm` (40px) | `md` (48px) | `lg` (52px) (기본값: `md`)", required: false },
  { name: "disabled", type: "boolean", description: "버튼 비활성화 여부", required: false },
  { name: "onClick", type: "MouseEventHandler<HTMLButtonElement>", description: "클릭 이벤트 핸들러", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
];

const ButtonsDemo = () => {
  const [loadingBtn, setLoadingBtn] = useState<string | null>(null);

  const handleLoading = (id: string) => {
    setLoadingBtn(id);
    setTimeout(() => setLoadingBtn(null), 2000);
  };

  return (
    <Section id="buttons" title="Buttons" description="StandardButton, DetailButton, IconButton, OptionButton">
      <PropsTable props={standardButtonProps} />

      <DemoBox label="StandardButton - Variants & Sizes">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <StandardButton variant="primary" size="lg" onClick={() => handleLoading("p-lg")} isLoading={loadingBtn === "p-lg"}>
              Primary LG
            </StandardButton>
            <StandardButton variant="primary" size="md" onClick={() => handleLoading("p-md")} isLoading={loadingBtn === "p-md"}>
              Primary MD
            </StandardButton>
            <StandardButton variant="primary" size="sm" onClick={() => {}}>
              Primary SM
            </StandardButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StandardButton variant="secondary" size="lg" onClick={() => {}}>Secondary LG</StandardButton>
            <StandardButton variant="secondary" size="md" onClick={() => {}}>Secondary MD</StandardButton>
            <StandardButton variant="secondary" size="sm" onClick={() => {}}>Secondary SM</StandardButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StandardButton variant="tertiary" size="lg" onClick={() => {}}>Tertiary LG</StandardButton>
            <StandardButton variant="tertiary" size="md" onClick={() => {}}>Tertiary MD</StandardButton>
            <StandardButton variant="tertiary" size="sm" onClick={() => {}}>Tertiary SM</StandardButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StandardButton variant="text" size="lg" onClick={() => {}}>Text LG</StandardButton>
            <StandardButton variant="text" size="md" onClick={() => {}}>Text MD</StandardButton>
            <StandardButton variant="text" size="sm" onClick={() => {}}>Text SM</StandardButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StandardButton variant="primary" size="md" disabled onClick={() => {}}>Disabled</StandardButton>
            <StandardButton variant="primary" size="md" icon={<PlusIcon size={16} color="white" />} iconPosition="left" onClick={() => {}}>
              With Icon
            </StandardButton>
          </div>
        </div>
      </DemoBox>
      <CodeBlock code={`import { StandardButton, PlusIcon } from "inz-ui";

<StandardButton variant="primary" size="md" onClick={handleClick}>
  Primary
</StandardButton>

<StandardButton
  variant="primary"
  size="md"
  icon={<PlusIcon size={16} color="white" />}
  iconPosition="left"
  isLoading={isLoading}
  onClick={handleClick}
>
  With Icon
</StandardButton>`} />

      <DemoBox label="DetailButton">
        <div className="flex flex-wrap items-center gap-3">
          <DetailButton variant="primary" size="md" onClick={() => {}}>Detail Primary</DetailButton>
          <DetailButton variant="secondary" size="md" onClick={() => {}}>Detail Secondary</DetailButton>
          <DetailButton variant="secondary" size="sm" onClick={() => {}}>Detail Secondary SM</DetailButton>
        </div>
      </DemoBox>
      <CodeBlock code={`import { DetailButton } from "inz-ui";

<DetailButton variant="primary" size="md" onClick={handleClick}>
  Detail Primary
</DetailButton>`} />

      <DemoBox label="IconButton">
        <div className="flex flex-wrap items-center gap-3">
          <IconButton variant="normal" icon={<EditIcon size={16} color="var(--color-inz-primary-40)" />} onClick={() => {}} />
          <IconButton variant="outline" icon={<DeleteIcon size={16} color="var(--color-inz-red-50)" />} onClick={() => {}} />
          <IconButton variant="normal" icon={<PlusIcon size={16} color="var(--color-inz-coolgrey-30)" />} onClick={() => {}} />
        </div>
      </DemoBox>
      <CodeBlock code={`import { IconButton, EditIcon } from "inz-ui";

<IconButton
  variant="normal"
  icon={<EditIcon size={16} color="var(--color-inz-primary-40)" />}
  onClick={handleClick}
/>

<IconButton
  variant="outline"
  icon={<EditIcon size={16} color="var(--color-inz-primary-40)" />}
  onClick={handleClick}
/>`} />

      <DemoBox label="OptionButton">
        <div className="flex flex-wrap items-center gap-3">
          <OptionButton variant="default" onClick={() => {}}>기본</OptionButton>
          <OptionButton variant="copy" onClick={() => {}}>복사</OptionButton>
          <OptionButton variant="cancel" onClick={() => {}}>삭제</OptionButton>
          <OptionButton variant="edit" onClick={() => {}}>편집</OptionButton>
          <OptionButton variant="dark" onClick={() => {}}>다크</OptionButton>
        </div>
      </DemoBox>
      <CodeBlock code={`import { OptionButton } from "inz-ui";

<OptionButton variant="copy" onClick={handleClick}>
  복사
</OptionButton>`} />
    </Section>
  );
};

export default ButtonsDemo;
