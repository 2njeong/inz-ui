import { useState } from "react";
import { Dropdown, DropdownSearch } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const dropdownProps = [
  { name: "isInvalid", type: "boolean", default: "false", description: "유효성 검사 실패 여부", required: false },
  { name: "invalidText", type: "string", description: "에러 메시지 텍스트", required: false },
  { name: "labelText", type: "string", description: "라벨에 표시될 텍스트", required: false },
  { name: "options", type: "DropdownOption[]", description: "드롭다운 옵션 배열 (필수)", required: true },
  { name: "value", type: "string", description: "선택된 값", required: false },
  { name: "onChange", type: "(value: string) => void", description: "값 변경 시 실행할 콜백 함수", required: false },
  { name: "dropdownSize", type: '"sm" | "lg"', default: '"sm"', description: "드롭다운 크기", required: false },
  { name: "placeholder", type: "string", default: '"선택하세요"', description: "placeholder 텍스트", required: false },
  { name: "disabled", type: "boolean", default: "false", description: "비활성화 여부", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
  { name: "alignMode", type: '"vertical" | "horizontal"', default: '"vertical"', description: "라벨 정렬 모드", required: false },
  { name: "ShowAsterisk", type: "boolean", description: "필수 표시 여부", required: false },
  { name: "minDropdownWidth", type: "string", description: "드롭다운 최소 너비 (CSS 단위)", required: false },
];

const dropdownSearchProps = [
  { name: "labelText", type: "string", description: "라벨에 표시될 텍스트", required: false },
  { name: "ShowAsterisk", type: "boolean", description: "필수 표시 여부", required: false },
  { name: "outerInputPlaceholder", type: "string", description: "외부 입력 필드 placeholder", required: false },
  { name: "innerInputPlaceholder", type: "string", description: "내부 검색 입력 필드 placeholder", required: false },
  { name: "options", type: "Option[]", description: "드롭다운 검색 옵션 배열 (필수)", required: true },
  { name: "displayValue", type: "string", description: "표시될 값 (필수)", required: true },
  { name: "onChange", type: "(rawValue: string) => void", description: "값 변경 시 실행할 콜백 함수 (필수)", required: true },
  { name: "error", type: "string", description: "에러 메시지 (react-hook-form과 함께 사용 시)", required: false },
  { name: "clearErrors", type: "UseFormClearErrors<T> | (() => void)", description: "에러 클리어 함수 (react-hook-form과 함께 사용 시)", required: false },
  { name: "isInvalid", type: "boolean", default: "false", description: "유효성 검사 실패 여부", required: false },
  { name: "dropdownClassName", type: "string", description: "드롭다운에 적용할 CSS 클래스명", required: false },
];

const sampleOptions = [
  { id: "1", name: "옵션 1", value: "1" },
  { id: "2", name: "옵션 2", value: "2" },
  { id: "3", name: "옵션 3", value: "3" },
  { id: "4", name: "옵션 4", value: "4" },
];

const DropdownDemo = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [invalidValue, setInvalidValue] = useState("");
  const [searchDisplay, setSearchDisplay] = useState("");
  const [searchInvalidDisplay, setSearchInvalidDisplay] = useState("");

  return (
    <Section id="dropdown" title="Dropdown" description="Dropdown, DropdownSearch 컴포넌트">
      <PropsTable props={dropdownProps} />

      <DemoBox label="Dropdown">
        <div className="flex flex-col gap-4 max-w-md">
          <Dropdown
            labelText="기본 드롭다운"
            options={sampleOptions}
            value={value1}
            onChange={setValue1}
            placeholder="선택하세요"
          />
          <Dropdown
            labelText="Small 드롭다운"
            options={sampleOptions}
            value={value2}
            onChange={setValue2}
            placeholder="선택하세요"
            dropdownSize="sm"
          />
          <Dropdown
            labelText="비활성화"
            options={sampleOptions}
            placeholder="선택할 수 없습니다"
            disabled
          />
        </div>
      </DemoBox>
      <CodeBlock code={`import { Dropdown } from "inz-ui";

const options = [
  { id: "1", name: "옵션 1", value: "1" },
  { id: "2", name: "옵션 2", value: "2" },
];

<Dropdown
  labelText="카테고리"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="선택하세요"
/>`} />

      <DemoBox label="Dropdown - isInvalid">
        <div className="max-w-md">
          <Dropdown
            labelText="에러 상태 드롭다운"
            options={sampleOptions}
            value={invalidValue}
            onChange={setInvalidValue}
            placeholder="선택하세요"
            isInvalid
            invalidText="필수 항목을 선택해주세요."
          />
        </div>
      </DemoBox>
      <CodeBlock code={`<Dropdown
  labelText="카테고리"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="선택하세요"
  isInvalid
  invalidText="필수 항목을 선택해주세요."
/>`} />

      <h3 className="text-lg font-semibold text-inz-text-body mt-8 mb-2">DropdownSearch</h3>
      <PropsTable props={dropdownSearchProps} />

      <DemoBox label="DropdownSearch">
        <div className="max-w-md">
          <DropdownSearch
            labelText="검색 가능한 드롭다운"
            options={sampleOptions}
            displayValue={searchDisplay}
            onChange={(val) => {
              setSearchDisplay(sampleOptions.find((o) => o.value === val)?.name ?? val);
            }}
            outerInputPlaceholder="선택하세요"
            innerInputPlaceholder="검색..."
          />
        </div>
      </DemoBox>
      <CodeBlock code={`import { DropdownSearch } from "inz-ui";

<DropdownSearch
  labelText="병원 선택"
  options={options}
  displayValue={displayValue}
  onChange={handleChange}
  outerInputPlaceholder="선택하세요"
  innerInputPlaceholder="검색..."
/>`} />

      <DemoBox label="DropdownSearch - isInvalid">
        <div className="max-w-md">
          <DropdownSearch
            labelText="에러 상태 검색 드롭다운"
            options={sampleOptions}
            displayValue={searchInvalidDisplay}
            onChange={(val) => {
              setSearchInvalidDisplay(sampleOptions.find((o) => o.value === val)?.name ?? val);
            }}
            outerInputPlaceholder="선택하세요"
            innerInputPlaceholder="검색..."
            isInvalid
            error="항목을 선택해주세요."
          />
        </div>
      </DemoBox>
      <CodeBlock code={`<DropdownSearch
  labelText="병원 선택"
  options={options}
  displayValue={displayValue}
  onChange={handleChange}
  isInvalid
  error="항목을 선택해주세요."
/>`} />

      <h3 className="text-lg font-semibold text-inz-text-body mt-8 mb-2">DropdownSearchCompounds (Compound Pattern)</h3>
      <p className="body3 text-inz-text-subbody mb-4">
        고급 커스터마이징이 필요한 경우 compound 패턴을 사용할 수 있습니다. Root, Input, Dropdown, SearchInput, Details, Option, Empty, Loading, Fallback, Highlight 서브 컴포넌트로 구성됩니다.
      </p>
      <CodeBlock code={`import { DropdownSearchCompounds } from "inz-ui";

const [isOpen, setIsOpen] = useState(false);
const [search, setSearch] = useState("");

<DropdownSearchCompounds.Root onFocus={() => setIsOpen(true)}>
  <DropdownSearchCompounds.Input
    value={displayValue}
    placeholder="선택하세요"
    isDropdownOpen={isOpen}
    onIconClick={() => setIsOpen((prev) => !prev)}
  />
  <DropdownSearchCompounds.Dropdown isOpen={isOpen}>
    <DropdownSearchCompounds.SearchInput
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="검색..."
    />
    <DropdownSearchCompounds.Details>
      {filteredOptions.map((option) => (
        <DropdownSearchCompounds.Option
          key={option.id}
          onClick={() => handleSelect(option)}
        >
          <DropdownSearchCompounds.Highlight>
            {option.name}
          </DropdownSearchCompounds.Highlight>
        </DropdownSearchCompounds.Option>
      ))}
      <DropdownSearchCompounds.Empty>
        검색 결과가 없습니다.
      </DropdownSearchCompounds.Empty>
    </DropdownSearchCompounds.Details>
  </DropdownSearchCompounds.Dropdown>
</DropdownSearchCompounds.Root>`} />
    </Section>
  );
};

export default DropdownDemo;
