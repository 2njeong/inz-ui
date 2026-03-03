import { useState } from "react";
import { Chip } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const chipProps = [
  { name: "type", type: '"select" | "multi-select" | "suggestion" | "input"', description: "Chip 타입: `select` (단일 선택) | `multi-select` (다중 선택) | `suggestion` (제안) | `input` (입력/삭제)", required: true },
  { name: "id", type: "string", description: "Chip의 고유 식별자 (필수)", required: true },
  { name: "label", type: "string", description: "Chip에 표시될 텍스트 (필수)", required: true },
  { name: "selected", type: "boolean", description: "선택 상태 (select/multi-select)", required: false },
  { name: "onClick", type: "() => void", description: "클릭 핸들러", required: false },
  { name: "onDelete", type: "() => void", description: "삭제 핸들러 (input type)", required: false },
  { name: "onEdit", type: "() => void", description: "편집 핸들러 (input type)", required: false },
  { name: "isEditing", type: "boolean", description: "편집 상태 (input type)", required: false },
  { name: "onInputChange", type: "(e: ChangeEvent) => void", description: "편집 입력 변경 핸들러 (input type)", required: false },
  { name: "size", type: '"sm" | "md"', default: '"md"', description: "Chip 크기: `sm` | `md` (기본값: `md`)", required: false },
  { name: "disabled", type: "boolean", default: "false", description: "비활성화 여부", required: false },
  { name: "icon", type: "ReactNode", description: "아이콘 요소 (suggestion type)", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
];

const ChipDemo = () => {
  const [selected, setSelected] = useState("chip1");
  const [multiSelected, setMultiSelected] = useState<string[]>(["m1"]);
  const [inputChips, setInputChips] = useState([
    { id: "i1", label: "태그 A" },
    { id: "i2", label: "태그 B" },
    { id: "i3", label: "태그 C" },
  ]);
  const [editingChipId, setEditingChipId] = useState<string | null>(null);

  const toggleMulti = (id: string) => {
    setMultiSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleDeleteChip = (id: string) => {
    setInputChips((prev) => prev.filter((chip) => chip.id !== id));
  };

  const handleEditChip = (id: string) => {
    setEditingChipId(id);
  };

  const handleInputChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChips((prev) =>
      prev.map((chip) => (chip.id === id ? { ...chip, label: e.target.value } : chip))
    );
  };

  return (
    <Section id="chip" title="Chip" description="선택, 필터, 입력 태그용 칩 컴포넌트">
      <PropsTable props={chipProps} />

      <DemoBox label="Select Chip">
        <div className="flex flex-wrap gap-2">
          {["chip1", "chip2", "chip3"].map((id) => (
            <Chip
              key={id}
              id={id}
              type="select"
              label={`선택 ${id.slice(-1)}`}
              selected={selected === id}
              onClick={() => setSelected(id)}
            />
          ))}
        </div>
      </DemoBox>

      <DemoBox label="Multi Select Chip">
        <div className="flex flex-wrap gap-2">
          {["m1", "m2", "m3", "m4"].map((id) => (
            <Chip
              key={id}
              id={id}
              type="multi-select"
              label={`태그 ${id.slice(-1)}`}
              selected={multiSelected.includes(id)}
              onClick={() => toggleMulti(id)}
            />
          ))}
        </div>
      </DemoBox>

      <DemoBox label="Suggestion Chip">
        <div className="flex flex-wrap gap-2">
          <Chip id="s1" type="suggestion" label="추천 태그 1" onClick={() => {}} />
          <Chip id="s2" type="suggestion" label="추천 태그 2" onClick={() => {}} />
          <Chip id="s3" type="suggestion" label="아이콘 추천" onClick={() => {}} icon={<span>+</span>} />
        </div>
      </DemoBox>

      <DemoBox label="Input Chip">
        <div className="flex flex-wrap gap-2">
          {inputChips.map((chip) => (
            <Chip
              key={chip.id}
              id={chip.id}
              type="input"
              label={chip.label}
              onDelete={() => handleDeleteChip(chip.id)}
              onEdit={() => handleEditChip(chip.id)}
              isEditing={editingChipId === chip.id}
              onInputChange={(e) => handleInputChange(chip.id, e)}
            />
          ))}
        </div>
        <p className="body3 text-inz-text-helper mt-2">
          칩을 클릭하면 편집, X 버튼으로 삭제할 수 있습니다.
        </p>
      </DemoBox>

      <DemoBox label="Sizes">
        <div className="flex flex-wrap items-center gap-2">
          <Chip id="sz1" type="select" label="Size MD" size="md" selected={true} onClick={() => {}} />
          <Chip id="sz2" type="select" label="Size SM" size="sm" selected={true} onClick={() => {}} />
        </div>
      </DemoBox>

      <DemoBox label="Disabled">
        <div className="flex flex-wrap gap-2">
          <Chip id="d1" type="select" label="Disabled Select" selected={false} onClick={() => {}} disabled />
          <Chip id="d2" type="multi-select" label="Disabled Multi" selected={true} onClick={() => {}} disabled />
          <Chip id="d3" type="suggestion" label="Disabled Suggestion" onClick={() => {}} disabled />
        </div>
      </DemoBox>

      <CodeBlock code={`import { Chip } from "inz-ui";

// Select / Multi-select / Suggestion
<Chip id="c1" type="select" label="옵션" selected={isSelected} onClick={toggle} />
<Chip id="c2" type="multi-select" label="태그" selected={isSelected} onClick={toggle} />
<Chip id="c3" type="suggestion" label="추천" onClick={handleClick} />

// Input Chip — 삭제·편집 가능
<Chip
  id="i1"
  type="input"
  label={label}
  onDelete={() => removeChip(id)}
  onEdit={() => setEditingId(id)}
  isEditing={editingId === id}
  onInputChange={(e) => updateLabel(id, e.target.value)}
/>`} />
    </Section>
  );
};

export default ChipDemo;
