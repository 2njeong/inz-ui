interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropItem[];
}

const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-inz-line-container">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-inz-line-container bg-inz-coolgrey-95">
            <th className="px-4 py-2 font-semibold text-inz-text-title">Prop</th>
            <th className="px-4 py-2 font-semibold text-inz-text-title">Type</th>
            <th className="px-4 py-2 font-semibold text-inz-text-title">Default</th>
            <th className="px-4 py-2 font-semibold text-inz-text-title">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-inz-line-container last:border-b-0">
              <td className="px-4 py-2 whitespace-nowrap">
                <code className="rounded bg-inz-coolgrey-95 px-1.5 py-0.5 text-xs font-mono text-inz-primary-40">
                  {prop.name}
                  {prop.required && <span className="ml-0.5 text-inz-red-50">*</span>}
                </code>
              </td>
              <td className="px-4 py-2">
                <code className="text-xs font-mono text-inz-coolgrey-40">{prop.type}</code>
              </td>
              <td className="px-4 py-2 text-inz-text-caption text-xs">
                {prop.default ?? "-"}
              </td>
              <td className="px-4 py-2 text-inz-text-subbody text-xs">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
