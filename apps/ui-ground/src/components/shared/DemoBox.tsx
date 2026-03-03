import { ReactNode } from "react";

interface DemoBoxProps {
  children: ReactNode;
  label?: string;
}

const DemoBox = ({ children, label }: DemoBoxProps) => {
  return (
    <div>
      {label && (
        <p className="body3 text-inz-text-subbody mb-2">{label}</p>
      )}
      <div className="rounded-lg border border-inz-line-container bg-white p-6">
        {children}
      </div>
    </div>
  );
};

export default DemoBox;
