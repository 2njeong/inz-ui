import LoadingIcon from "@ui/icons/LoadingIcon";
import { cn } from "@ui/utils/cn";
import { PropsWithChildren } from "react";

import { ItemProps } from "@ui/components/auto-complete/AutoCompleteCompounds";
import DropdownIcon from "@ui/components/dropdown/DropdwonIcon";
import InputFooter from "@ui/components/inputs/InputFooter";
import SearchInput, {
  SearchInputProps,
} from "@ui/components/inputs/SearchInput";

interface RootProps {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onFocus?: () => void;
  onBlurCapture?: (e: React.FocusEvent) => void;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
  isDropdownOpen: boolean;
  onIconClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  isInvalid?: boolean;
}
interface DropdownProps {
  isOpen: boolean;
  className?: string;
}

const DropdownSearchCompounds = {
  Root: ({
    children,
    className,
    ref,
    onFocus,
    onBlurCapture,
  }: PropsWithChildren<RootProps>) => {
    return (
      <div
        tabIndex={-1}
        onFocus={onFocus}
        onBlurCapture={onBlurCapture}
        className={cn("relative", className)}
        ref={ref}
      >
        {children}
      </div>
    );
  },
  Input: ({
    ref,
    onFocus,
    value,
    error,
    onClick,
    className,
    placeholder,
    isDropdownOpen,
    onIconClick,
    isInvalid,
    ...props
  }: InputProps) => {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="relative">
          <input
            ref={ref}
            readOnly
            className={cn(
              "body2 border-inz-line-border bg-inz-background-container text-inz-text-body placeholder:text-inz-text-caption focus:border-inz-primary-50 disabled:bg-inz-coolgrey-95 border-1 h-12 w-full cursor-pointer rounded-sm py-3 pl-4 pr-12 outline-none",
              isInvalid && "border-inz-red-50"
            )}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={!!onFocus}
            aria-controls="autocomplete-results"
            onFocus={onFocus}
            onClick={onClick}
            value={value}
            placeholder={placeholder ?? "선택해주세요"}
            {...props}
          />
          <DropdownIcon
            open={isDropdownOpen}
            onClick={(e) => {
              onIconClick?.(e);
            }}
          />
        </div>

        <InputFooter value={value} invalidText={error ?? ""} />
      </div>
    );
  },
  Dropdown: ({
    children,
    isOpen,
    className,
  }: PropsWithChildren<DropdownProps>) => {
    return isOpen ? (
      <div
        className={cn(
          "border-inz-line-border absolute z-[99] box-border flex w-full flex-col gap-3 rounded-[4px] border bg-white p-3 shadow-[0px_4px_8px_0px_rgba(171,190,209,0.4)]",
          className
        )}
      >
        {children}
      </div>
    ) : null;
  },
  SearchInput: ({
    onClear,
    onSearch,
    onFocus,
    onKeyDown,
    value,
    onChange,
    placeholder,
    className,
  }: SearchInputProps) => {
    return (
      <SearchInput
        onClear={onClear}
        onSearch={onSearch}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
        autoFocus
        placeholder={placeholder}
        className={cn("body3 w-full", className)}
      />
    );
  },
  Details: ({
    children,
    ref,
  }: PropsWithChildren<{ ref?: React.Ref<HTMLDetailsElement> }>) => {
    return (
      <details
        open
        role="listbox"
        id="autocomplete-results"
        ref={ref}
        className="m-0 h-full max-h-96 flex-1 list-none overflow-y-auto scroll-smooth p-0"
      >
        <summary className="sr-only"></summary>
        {children}
      </details>
    );
  },
  Option: ({
    children,
    isActive,
    ref,
    onMouseDown,
    ...props
  }: PropsWithChildren<
    ItemProps & {
      ref?: React.Ref<HTMLOptionElement>;
      onMouseDown?: (e: React.MouseEvent<HTMLOptionElement>) => void;
    }
  >) => {
    return (
      <option
        ref={ref}
        className={cn(
          "hover:bg-inz-primary-95 rounded-xs flex h-10 cursor-pointer items-center px-2 outline-none",
          isActive ? "bg-inz-primary-90" : "bg-transparent"
        )}
        role="option"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onMouseDown={onMouseDown}
        {...props}
      >
        {children}
      </option>
    );
  },
  Empty: ({ children }: PropsWithChildren) => (
    <div className="body2 text-inz-text-caption p-3">{children}</div>
  ),
  Loading: () => (
    <div className="flex items-center justify-center px-5 py-8">
      <LoadingIcon size={30} color="#4b9afd" className="animate-spin" />
    </div>
  ),
  Fallback: ({ children }: PropsWithChildren) => (
    <p className="text-inz-greyscale-40 flex items-center justify-center px-5 py-8 text-base font-medium leading-6">
      {children}
    </p>
  ),
  Highlight: ({ children }: PropsWithChildren) => (
    <span className="bg-[#fff0cb] font-medium text-black">{children}</span>
  ),
};

export default DropdownSearchCompounds;
