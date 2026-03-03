import { useState } from "react";
import { Pagination } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const paginationProps = [
  { name: "totalCount", type: "number", description: "전체 아이템 개수 (필수)", required: true },
  { name: "pageSize", type: "number", description: "한 페이지당 아이템 개수 (필수)", required: true },
  { name: "pageButtonCount", type: "number", default: "5", description: "한 번에 표시할 페이지 버튼 개수", required: false },
  { name: "onPageChange", type: "(page: number) => void", description: "페이지 변경 시 호출되는 함수", required: true },
];

const PaginationDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Section id="pagination" title="Pagination" description="페이지네이션 컴포넌트">
      <PropsTable props={paginationProps} />

      <DemoBox>
        <div className="flex flex-col items-center gap-4">
          <Pagination
            totalCount={100}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <p className="body4 text-inz-text-helper">현재 페이지: {currentPage}</p>
        </div>
      </DemoBox>
      <CodeBlock code={`import { Pagination } from "inz-ui";

<Pagination
  totalCount={100}
  pageSize={10}
  onPageChange={(page) => setCurrentPage(page)}
/>`} />
    </Section>
  );
};

export default PaginationDemo;
