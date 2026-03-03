import { useState } from "react";
import { FileUploaderCompound, OptionButton, canUploadContent } from "inz-ui";
import Section from "../shared/Section";
import DemoBox from "../shared/DemoBox";
import CodeBlock from "../shared/CodeBlock";
import PropsTable from "../shared/PropsTable";

const fileUploaderProps = [
  { name: "Area", type: "Component", description: "드래그 앤 드롭 영역 컴포넌트", required: true },
  { name: "Area.className", type: "string", description: "영역 스타일 클래스", required: false },
  { name: "Input", type: "Component", description: "파일 입력 컴포넌트", required: true },
  { name: "Input.multiple", type: "boolean", description: "다중 파일 선택", required: false },
  { name: "Input.accept", type: "string", description: "허용 파일 타입", required: false },
  { name: "Input.onFileChange", type: "(files: FileList | null) => void", description: "파일 변경 핸들러", required: true },
];

const FileUploaderDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Section id="fileuploader" title="FileUploader" description="파일 업로드 컴포넌트 (Compound Pattern)">
      <PropsTable props={fileUploaderProps} />

      <DemoBox>
        <div className="max-w-lg">
          <FileUploaderCompound.Area className="flex items-center justify-center rounded-sm border-1 border-dashed border-inz-line-border bg-inz-coolgrey-95">
            <FileUploaderCompound.Input
              multiple
              accept="image/png, image/jpeg, application/pdf"
              onFileChange={(fileList) => {
                const { canUpload } = canUploadContent({
                  newFiles: fileList,
                  currentResources: [],
                  uploadedContentsSize: 0,
                });
                if (canUpload && fileList) {
                  setFiles(Array.from(fileList));
                }
              }}
            >
              <div className="flex flex-col items-center justify-center py-5">
                <p className="body3 mb-1 text-inz-coolgrey-20">드래그 앤 드롭 또는</p>
                <OptionButton variant="copy">파일 선택</OptionButton>
                <p className="body3 mt-2 text-inz-text-caption">PDF, PNG, JPG (최대 15MB)</p>
              </div>
            </FileUploaderCompound.Input>
          </FileUploaderCompound.Area>
          {files.length > 0 && (
            <div className="mt-3 flex flex-col gap-1">
              {files.map((f) => (
                <p key={f.name} className="details1 text-inz-text-helper">{f.name} ({(f.size / 1024).toFixed(1)}KB)</p>
              ))}
            </div>
          )}
        </div>
      </DemoBox>

      <CodeBlock code={`import { FileUploaderCompound, OptionButton, canUploadContent } from "inz-ui";

<FileUploaderCompound.Area className="border-dashed border-1 rounded-sm">
  <FileUploaderCompound.Input
    multiple
    accept="image/png, image/jpeg, application/pdf"
    onFileChange={(files) => {
      const { canUpload } = canUploadContent({
        newFiles: files,
        currentResources: [],
        uploadedContentsSize: 0,
      });
      if (canUpload) handleFiles(files);
    }}
  >
    <div className="flex flex-col items-center py-5">
      <p>드래그 앤 드롭 또는</p>
      <OptionButton variant="copy">파일 선택</OptionButton>
    </div>
  </FileUploaderCompound.Input>
</FileUploaderCompound.Area>`} />
    </Section>
  );
};

export default FileUploaderDemo;
