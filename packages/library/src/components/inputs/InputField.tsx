import { cn } from "@ui/utils/cn";

interface InputFieldProps extends Omit<React.ComponentProps<"input">, "slot"> {
  slot?: React.ReactNode;
  isInvalid?: boolean;
}

const InputField = ({ isInvalid, ref, slot, ...props }: InputFieldProps) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        className={cn(
          "body2 border-inz-line-border bg-inz-background-container text-inz-text-body placeholder:text-inz-text-caption focus:border-inz-primary-50 disabled:bg-inz-coolgrey-95 border-1 pr-15 flex h-12 w-full items-center gap-x-2 rounded-sm py-3 pl-4 outline-none",
          isInvalid && "border-inz-status-danger"
        )}
        {...props}
      />

      {/* 추가 컴포넌트 위치 */}
      {slot && (
        <div className="absolute right-0 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-r-sm">
          {slot}
        </div>
      )}
    </div>
  );
};

export default InputField;
