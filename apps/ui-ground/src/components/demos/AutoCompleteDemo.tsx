import { useState, useRef, useEffect } from "react";
import { AutoCompleteCompounds } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const compoundProps = [
  { name: "Root", type: "Component", description: "컨테이너 래퍼 (className, ref)", required: true },
  { name: "Input", type: "Component", description: "검색 입력 필드 (InputHTMLAttributes, error)", required: true },
  { name: "Dropdown", type: "Component", description: "드롭다운 컨테이너 (isOpen: boolean)", required: true },
  { name: "TabList", type: "Component", description: "탭 목록 컨테이너", required: false },
  { name: "Tab", type: "Component", description: "개별 탭 (isActive, onClick)", required: false },
  { name: "List", type: "Component", description: "항목 리스트 (ref)", required: true },
  { name: "Item", type: "Component", description: "개별 항목 (isActive, onClick, onMouseEnter)", required: true },
  { name: "Empty", type: "Component", description: "빈 상태 메시지", required: false },
  { name: "Loading", type: "Component", description: "로딩 스피너", required: false },
  { name: "Fallback", type: "Component", description: "폴백 메시지", required: false },
  { name: "Highlight", type: "Component", description: "검색어 하이라이트", required: false },
];

const sampleItems = [
  { id: "1", label: "서울특별시" },
  { id: "2", label: "부산광역시" },
  { id: "3", label: "대구광역시" },
  { id: "4", label: "인천광역시" },
  { id: "5", label: "광주광역시" },
  { id: "6", label: "대전광역시" },
  { id: "7", label: "울산광역시" },
  { id: "8", label: "세종특별자치시" },
  { id: "9", label: "경기도" },
  { id: "10", label: "강원도" },
];

const categories = ["전체", "특별/광역시", "도"];

const AutoCompleteDemo = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState("전체");
  const rootRef = useRef<HTMLDivElement>(null);

  const filteredByTab = sampleItems.filter((item) => {
    if (activeTab === "전체") return true;
    if (activeTab === "특별/광역시") return item.label.includes("시");
    return !item.label.includes("시");
  });

  const filtered = filteredByTab.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const highlightMatch = (text: string, q: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <AutoCompleteCompounds.Highlight>
          {text.slice(idx, idx + q.length)}
        </AutoCompleteCompounds.Highlight>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <Section
      id="autocomplete"
      title="AutoComplete"
      description="컴파운드 패턴 기반 자동완성 컴포넌트 (Root, Input, Dropdown, Tab, Item 등)"
    >
      <PropsTable props={compoundProps} />

      <DemoBox label="AutoComplete - 탭 포함">
        <div className="max-w-md relative">
          <AutoCompleteCompounds.Root ref={rootRef}>
            <AutoCompleteCompounds.Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="지역을 검색하세요"
            />
            <AutoCompleteCompounds.Dropdown isOpen={isOpen}>
              <AutoCompleteCompounds.TabList>
                {categories.map((cat) => (
                  <AutoCompleteCompounds.Tab
                    key={cat}
                    isActive={activeTab === cat}
                    onClick={() => {
                      setActiveTab(cat);
                      setActiveIndex(-1);
                    }}
                  >
                    {cat}
                  </AutoCompleteCompounds.Tab>
                ))}
              </AutoCompleteCompounds.TabList>
              {filtered.length > 0 ? (
                <AutoCompleteCompounds.List>
                  {filtered.map((item, idx) => (
                    <AutoCompleteCompounds.Item
                      key={item.id}
                      isActive={activeIndex === idx}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        setQuery(item.label);
                        setIsOpen(false);
                      }}
                    >
                      <div className="px-4 py-3">
                        {highlightMatch(item.label, query)}
                      </div>
                    </AutoCompleteCompounds.Item>
                  ))}
                </AutoCompleteCompounds.List>
              ) : (
                <AutoCompleteCompounds.Empty>
                  검색 결과가 없습니다.
                </AutoCompleteCompounds.Empty>
              )}
            </AutoCompleteCompounds.Dropdown>
          </AutoCompleteCompounds.Root>
        </div>
      </DemoBox>

      <DemoBox label="Loading / Fallback 상태">
        <div className="flex gap-6 max-w-2xl">
          <div className="flex-1 relative">
            <AutoCompleteCompounds.Root>
              <AutoCompleteCompounds.Input
                value=""
                placeholder="로딩 상태"
                readOnly
                onFocus={() => {}}
              />
              <AutoCompleteCompounds.Dropdown isOpen={true}>
                <AutoCompleteCompounds.Loading />
              </AutoCompleteCompounds.Dropdown>
            </AutoCompleteCompounds.Root>
          </div>
          <div className="flex-1 relative">
            <AutoCompleteCompounds.Root>
              <AutoCompleteCompounds.Input
                value=""
                placeholder="폴백 상태"
                readOnly
                onFocus={() => {}}
              />
              <AutoCompleteCompounds.Dropdown isOpen={true}>
                <AutoCompleteCompounds.Fallback>
                  데이터를 불러올 수 없습니다.
                </AutoCompleteCompounds.Fallback>
              </AutoCompleteCompounds.Dropdown>
            </AutoCompleteCompounds.Root>
          </div>
        </div>
      </DemoBox>

      <CodeBlock code={`import { AutoCompleteCompounds } from "inz-ui";

<AutoCompleteCompounds.Root ref={rootRef}>
  <AutoCompleteCompounds.Input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onFocus={() => setIsOpen(true)}
    placeholder="검색하세요"
  />
  <AutoCompleteCompounds.Dropdown isOpen={isOpen}>
    <AutoCompleteCompounds.TabList>
      <AutoCompleteCompounds.Tab isActive={true} onClick={handleTab}>
        전체
      </AutoCompleteCompounds.Tab>
    </AutoCompleteCompounds.TabList>
    <AutoCompleteCompounds.List>
      <AutoCompleteCompounds.Item
        isActive={isActive}
        onClick={handleSelect}
      >
        <AutoCompleteCompounds.Highlight>검색어</AutoCompleteCompounds.Highlight>
      </AutoCompleteCompounds.Item>
    </AutoCompleteCompounds.List>
    <AutoCompleteCompounds.Empty>결과 없음</AutoCompleteCompounds.Empty>
    <AutoCompleteCompounds.Loading />
    <AutoCompleteCompounds.Fallback>에러 발생</AutoCompleteCompounds.Fallback>
  </AutoCompleteCompounds.Dropdown>
</AutoCompleteCompounds.Root>`} />
    </Section>
  );
};

export default AutoCompleteDemo;
