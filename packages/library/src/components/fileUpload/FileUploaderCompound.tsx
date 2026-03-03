import React, { useRef } from "react";

import { cn } from "@ui/utils/cn";

/**
 * @description 업로드 컴포넌트 래퍼
 * @param As - 필요에 따라 label 또는 div로 사용
 * @example
 * <FileUploaderCompound.Area As="label" className="cursor-pointer">
 *   <FileUploaderCompound.Input onFileChange={handleFileChange} />
 * </FileUploaderCompound.Area>
 */
interface AreaProps {
  children: React.ReactNode;
  className?: string;
  As?: "label" | "div";
}

/**
 * @description 업로드 컴포넌트 입력
 * @param onFileChange - 파일 변경 시 호출되는 함수
 * @param 그 외 input 속성들은 input 컴포넌트의 속성들을 그대로 전달할 수 있습니다.
 * @param children - 원하는 UI 컴포넌트를 자식 컴포넌트로 전달
 * @example
 * <FileUploaderCompound.Input onFileChange={handleFileChange}>
 *   <span>파일 선택</span>
 * </FileUploaderCompound.Input>
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (files: FileList | null) => void;
  children: React.ReactNode;
}

/**
 * @description accept 속성에 따라 파일을 필터링하는 함수
 */
const applyAcceptPolicy = (files: FileList, accept?: string): File[] => {
  if (!accept || files.length === 0) {
    return Array.from(files);
  }

  const validationRules = accept
    .split(",")
    .map((type) => type.trim())
    .filter(Boolean)
    .map((acceptedType) => (file: File) => {
      if (acceptedType.endsWith("/*")) {
        const baseType = acceptedType.slice(0, -2);
        return baseType && file.type.startsWith(`${baseType}/`);
      }

      if (acceptedType.startsWith(".")) {
        const expectedExt = acceptedType.slice(1).toLowerCase();
        const fileExt = file.name.toLowerCase().split(".").pop();
        return fileExt === expectedExt;
      }

      return file.type === acceptedType;
    });

  if (validationRules.length === 0) {
    return Array.from(files);
  }

  return Array.from(files).filter((file) =>
    validationRules.some((validateRule) => validateRule(file))
  );
};

const FileUploaderCompound = {
  Area: ({ children, className, As = "label" }: AreaProps) => {
    return (
      <As className={cn(As === "label" && "cursor-pointer", className)}>
        {children}
      </As>
    );
  },
  Input: ({ onFileChange, children, accept, ...props }: InputProps) => {
    const uploaderRef = useRef<HTMLInputElement>(null);

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const filteredFiles = applyAcceptPolicy(e.dataTransfer.files, accept);
      const dataTransfer = new DataTransfer();
      filteredFiles.forEach((file) => dataTransfer.items.add(file));

      onFileChange(dataTransfer.files);
    };

    return (
      <>
        <input
          {...props}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            onFileChange(e.target.files);
            e.target.value = "";
          }}
          ref={uploaderRef}
        />
        <div
          onClick={(e) => {
            e.preventDefault();
            uploaderRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleOnDrop}
        >
          {children}
        </div>
      </>
    );
  },
};

export default FileUploaderCompound;
