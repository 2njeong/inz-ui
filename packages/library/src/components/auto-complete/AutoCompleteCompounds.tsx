import { LoadingIcon } from "@ui/icons";
import { cn } from "@ui/utils/cn";
import React, { PropsWithChildren } from "react";
// Compound Component Prop Types
export interface RootProps {
  className?: string;
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
export interface DropdownProps {
  isOpen: boolean;
}
export interface ItemProps {
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}
export interface TabProps {
  isActive: boolean;
  onClick?: () => void;
}

export const AutoCompleteCompounds = {
  Root: function Root({
    children,
    className,
    ref,
  }: PropsWithChildren<RootProps & { ref?: React.Ref<HTMLDivElement> }>) {
    return (
      <div className={cn("w-full min-w-[300px]", className)} ref={ref}>
        {children}
      </div>
    );
  },
  Input: function Input({
    onFocus,
    ref,
    ...props
  }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
    return (
      <input
        ref={ref}
        className={cn(
          "body2 border-inz-line-border bg-inz-background-container text-inz-text-body placeholder:text-inz-text-caption focus:border-inz-primary-50 disabled:bg-inz-coolgrey-95 border-1 pr-15 flex h-12 w-full items-center gap-x-2 rounded-sm py-3 pl-4 outline-none"
        )}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={onFocus ? true : false}
        aria-controls="autocomplete-results"
        onFocus={onFocus}
        {...props}
      />
    );
  },
  Dropdown: ({ isOpen, children }: PropsWithChildren<DropdownProps>) =>
    isOpen ? (
      <div className="border-inz-line-border absolute z-[99] box-border max-h-[484px] w-full rounded-[4px] border bg-white shadow-[0px_4px_8px_0px_rgba(171,190,209,0.4)]">
        {children}
      </div>
    ) : null,
  TabList: ({ children }: PropsWithChildren) => (
    <div
      role="tablist"
      className="border-inz-line-border flex border-b px-4"
    >
      {children}
    </div>
  ),
  Tab: ({ children, isActive, onClick }: PropsWithChildren<TabProps>) => (
    <button
      type="button"
      className={cn(
        "whitespace-nowrap rounded-none bg-transparent p-3 text-base font-medium leading-6",
        isActive
          ? "border-inz-coolgrey-20 text-inz-text-body border-b-2"
          : "text-inz-text-caption"
      )}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  ),
  List: function List({
    children,
    ref,
  }: PropsWithChildren<{ ref?: React.Ref<HTMLUListElement> }>) {
    return (
      <ul
        role="listbox"
        id="autocomplete-results"
        ref={ref}
        className="m-0 h-full max-h-[400px] flex-1 list-none overflow-y-auto scroll-smooth p-0"
      >
        {children}
      </ul>
    );
  },
  Item: function Item({
    children,
    isActive,
    ref,
    ...props
  }: PropsWithChildren<ItemProps & { ref?: React.Ref<HTMLLIElement> }>) {
    return (
      <li
        ref={ref}
        className={cn(
          "hover:bg-inz-primary-95 cursor-pointer outline-none",
          isActive ? "bg-inz-primary-90" : "bg-transparent"
        )}
        role="option"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        {...props}
      >
        {children}
      </li>
    );
  },
  Empty: ({ children }: PropsWithChildren) => (
    <div className="text-inz-greyscale-30 flex flex-col items-center gap-4 px-5 py-8 text-center text-base font-normal leading-6">
      {children}
    </div>
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
