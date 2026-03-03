import { useState } from "react";
import { Input, PasswordInput, SearchInput, UnitInput } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const inputProps = [
  { name: "labelText", type: "string", description: "라벨에 표시될 텍스트", required: false },
  { name: "alignMode", type: '"vertical" | "horizontal"', description: "라벨 정렬 모드", required: false },
  { name: "showAsterisk", type: "boolean", default: "false", description: "필수 표시 여부 (라벨 옆에 * 표시)", required: false },
  { name: "value", type: "string", description: "입력 필드의 값 (필수)", required: true },
  { name: "placeholder", type: "string", description: "placeholder 텍스트", required: false },
  { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "입력 값 변경 시 실행할 콜백 함수 (필수)", required: true },
  { name: "isInvalid", type: "boolean", default: "false", description: "유효성 검사 실패 여부", required: false },
  { name: "helpText", type: "string", description: "도움말 텍스트 (하단에 표시)", required: false },
  { name: "invalidText", type: "string", description: "에러 메시지 텍스트 (유효성 검사 실패 시 하단에 표시)", required: false },
  { name: "successText", type: "string", description: "성공 메시지 텍스트 (하단에 표시)", required: false },
  { name: "withWordCounter", type: "boolean", default: "false", description: "글자 수 카운터 표시 여부", required: false },
  { name: "maxLength", type: "number", description: "최대 입력 길이 (글자 수 카운터와 함께 사용)", required: false },
  { name: "slot", type: "ReactNode", description: "입력 필드 오른쪽에 표시할 슬롯 요소", required: false },
  { name: "type", type: '"number" | "color" | "hidden" | "text" | ...', description: "입력 필드 타입 (기본 HTML input의 type 속성)", required: false },
  { name: "disabled", type: "boolean", description: "비활성화 여부", required: false },
  { name: "className", type: "string", description: "추가 CSS 클래스명", required: false },
];

const InputDemo = () => {
  const [basic, setBasic] = useState("");
  const [error, setError] = useState("잘못된 값");
  const [counter, setCounter] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState<"password" | "text">("password");
  const [searchVal, setSearchVal] = useState("");
  const [unitVal, setUnitVal] = useState("");
  const [successVal, setSuccessVal] = useState("올바른 이메일");
  const [slotVal, setSlotVal] = useState("");
  const [horizontalVal, setHorizontalVal] = useState("");

  return (
    <Section id="input" title="Input" description="Input, PasswordInput, SearchInput, UnitInput">
      <PropsTable props={inputProps} />

      <DemoBox label="Input - 기본">
        <div className="flex flex-col gap-4 max-w-md">
          <Input
            labelText="이름"
            value={basic}
            onChange={(e) => setBasic(e.target.value)}
            placeholder="이름을 입력하세요"
            showAsterisk
          />
          <Input
            labelText="에러 상태"
            value={error}
            onChange={(e) => setError(e.target.value)}
            placeholder="입력하세요"
            isInvalid
            invalidText="올바른 값을 입력해주세요."
          />
          <Input
            labelText="글자 수 제한"
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
            placeholder="최대 50자"
            withWordCounter
            maxLength={50}
          />
          <Input
            labelText="비활성화"
            value=""
            onChange={() => {}}
            placeholder="입력할 수 없습니다"
            disabled
          />
        </div>
      </DemoBox>
      <CodeBlock code={`import { Input } from "inz-ui";

const [value, setValue] = useState("");

<Input
  labelText="이메일"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="이메일을 입력하세요"
  showAsterisk
  isInvalid={!value}
  invalidText="이메일을 입력해주세요."
/>`} />

      <DemoBox label="Input - successText">
        <div className="max-w-md">
          <Input
            labelText="이메일"
            value={successVal}
            onChange={(e) => setSuccessVal(e.target.value)}
            placeholder="이메일을 입력하세요"
            successText="사용 가능한 이메일입니다."
          />
        </div>
      </DemoBox>
      <CodeBlock code={`<Input
  labelText="이메일"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  successText="사용 가능한 이메일입니다."
/>`} />

      <DemoBox label="Input - slot">
        <div className="max-w-md">
          <Input
            labelText="인증번호"
            value={slotVal}
            onChange={(e) => setSlotVal(e.target.value)}
            placeholder="인증번호를 입력하세요"
            slot={
              <button
                type="button"
                className="whitespace-nowrap rounded bg-inz-primary-40 px-3 py-1 text-xs text-white"
                onClick={() => alert("인증 요청")}
              >
                인증
              </button>
            }
          />
        </div>
      </DemoBox>
      <CodeBlock code={`<Input
  labelText="인증번호"
  value={code}
  onChange={(e) => setCode(e.target.value)}
  placeholder="인증번호를 입력하세요"
  slot={<button onClick={handleVerify}>인증</button>}
/>`} />

      <DemoBox label='Input - alignMode="horizontal"'>
        <div className="max-w-lg">
          <Input
            labelText="이름"
            value={horizontalVal}
            onChange={(e) => setHorizontalVal(e.target.value)}
            placeholder="이름을 입력하세요"
            alignMode="horizontal"
          />
        </div>
      </DemoBox>
      <CodeBlock code={`<Input
  labelText="이름"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="이름을 입력하세요"
  alignMode="horizontal"
/>`} />

      <DemoBox label="PasswordInput">
        <div className="max-w-md">
          <PasswordInput
            labelText="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            type={pwType}
            toggleShowPassword={() => setPwType((t) => (t === "password" ? "text" : "password"))}
          />
        </div>
      </DemoBox>
      <CodeBlock code={`import { PasswordInput } from "inz-ui";

const [pw, setPw] = useState("");
const [type, setType] = useState<"password" | "text">("password");

<PasswordInput
  labelText="비밀번호"
  value={pw}
  onChange={(e) => setPw(e.target.value)}
  type={type}
  toggleShowPassword={() => setType(t => t === "password" ? "text" : "password")}
/>`} />

      <DemoBox label="SearchInput">
        <div className="flex flex-col gap-4 max-w-md">
          <SearchInput
            placeholder="검색어를 입력하세요 (SM)"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onSearch={() => alert(`검색: ${searchVal}`)}
            onClear={() => setSearchVal("")}
            inputSize="sm"
          />
          <SearchInput
            placeholder="검색어를 입력하세요 (MD)"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onSearch={() => alert(`검색: ${searchVal}`)}
            onClear={() => setSearchVal("")}
            inputSize="md"
          />
        </div>
      </DemoBox>
      <CodeBlock code={`import { SearchInput } from "inz-ui";

<SearchInput
  placeholder="검색어를 입력하세요"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onSearch={() => handleSearch()}
  onClear={() => setSearch("")}
/>`} />

      <DemoBox label="UnitInput">
        <div className="max-w-md">
          <UnitInput
            labelText="금액"
            value={unitVal}
            onChange={(e) => setUnitVal(e.target.value)}
            placeholder="금액을 입력하세요"
            unit="원"
          />
        </div>
      </DemoBox>
      <CodeBlock code={`import { UnitInput } from "inz-ui";

<UnitInput
  labelText="금액"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  placeholder="금액을 입력하세요"
  unit="원"
/>`} />
    </Section>
  );
};

export default InputDemo;
