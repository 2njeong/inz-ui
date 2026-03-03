import { Table } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const tableProps = [
  { name: "columns", type: "TableColumn<T>[]", description: "테이블 컬럼 정의 배열 (필수)", required: true },
  { name: "data", type: "T[]", description: "테이블에 표시할 데이터 배열 (필수)", required: true },
  { name: "onRowClick", type: "(row: T) => void", description: "행 클릭 시 실행할 콜백 함수", required: false },
  { name: "isEmptyCondition", type: "string", description: "데이터가 없을 때 표시할 메시지 조건", required: false },
];

interface SampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleColumns = [
  { key: "id", label: "ID", render: (row: SampleData) => row.id },
  { key: "name", label: "이름", render: (row: SampleData) => row.name },
  { key: "email", label: "이메일", render: (row: SampleData) => row.email },
  { key: "role", label: "역할", render: (row: SampleData) => row.role },
  { key: "status", label: "상태", render: (row: SampleData) => row.status },
];

const sampleData: SampleData[] = [
  { id: 1, name: "김철수", email: "kim@example.com", role: "관리자", status: "활성" },
  { id: 2, name: "이영희", email: "lee@example.com", role: "사용자", status: "활성" },
  { id: 3, name: "박민수", email: "park@example.com", role: "사용자", status: "비활성" },
  { id: 4, name: "정수진", email: "jung@example.com", role: "편집자", status: "활성" },
  { id: 5, name: "최동현", email: "choi@example.com", role: "사용자", status: "대기" },
];

const TableDemo = () => {
  return (
    <Section id="table" title="Table" description="데이터 테이블 컴포넌트">
      <PropsTable props={tableProps} />

      <DemoBox label="기본 테이블">
        <Table
          columns={sampleColumns}
          data={sampleData}
          onRowClick={(row) => alert(`${row.name} 클릭`)}
        />
      </DemoBox>

      <DemoBox label="빈 테이블">
        <Table
          columns={sampleColumns}
          data={[]}
          isEmptyCondition="데이터가 없습니다."
        />
      </DemoBox>

      <CodeBlock code={`import { Table } from "inz-ui";

const columns = [
  { key: "id", label: "ID", render: (row) => row.id },
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
];

<Table
  columns={columns}
  data={data}
  onRowClick={(row) => console.log(row)}
/>`} />
    </Section>
  );
};

export default TableDemo;
