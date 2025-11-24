import { PropsWithChildren, useEffect, useRef } from 'react';

const AutoCompleteCompounds = {
  Container: ({ children }: PropsWithChildren) => {
    return <div className="relative rounded-sm border border-gray-500">{children}</div>;
  },
  Input: ({
    value,
    onChange,
    onBlur,
    onKeyDown,
    placeholder = '',
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
  }) => {
    return (
      <input
        type="text"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full rounded-sm border border-gray-100 p-2 placeholder:text-gray-500 focus:outline-none"
        role="combobox"
        aria-autocomplete="list"
      />
    );
  },
  Dropdown: ({ children }: { children: React.ReactNode }) => {
    return (
      <ul
        className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-gray-300 bg-white p-2 shadow-lg"
        role="listbox">
        {children}
      </ul>
    );
  },
  Option: ({
    option,
    onClick,
    isHighlighted = false,
    onMouseEnter,
  }: {
    option: React.ReactNode;
    onClick: () => void;
    isHighlighted?: boolean;
    onMouseEnter?: () => void;
  }) => {
    const ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
      if (isHighlighted && ref.current) {
        ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, [isHighlighted]);

    return (
      <li
        ref={ref}
        className={`cursor-pointer rounded px-2 py-1 ${
          isHighlighted ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        role="option"
        aria-selected={isHighlighted}
        tabIndex={-1}>
        {option}
      </li>
    );
  },
};

export default AutoCompleteCompounds;
