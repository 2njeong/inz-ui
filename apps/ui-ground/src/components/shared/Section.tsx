import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, title, description, children }: SectionProps) => {
  return (
    <section id={id} className="scroll-mt-20 py-8">
      <h2 className="heading3 text-inz-text-title mb-1">{title}</h2>
      {description && (
        <p className="body4 text-inz-text-helper mb-6">{description}</p>
      )}
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
};

export default Section;
