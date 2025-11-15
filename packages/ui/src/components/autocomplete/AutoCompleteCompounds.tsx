import { PropsWithChildren } from 'react';

const AutoCompleteCompounds = {
  Container: ({ children }: PropsWithChildren) => {
    return <div className="relative rounded-sm border border-gray-500">{children}</div>;
  },
  Input: ({
    value,
    onChange,
    onBlur,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  }) => {
    return (
      <input
        type="text"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className="w-full rounded-sm border border-gray-500 p-2 focus:outline-none"
      />
    );
  },
  Dropdown: ({ children }: { children: React.ReactNode }) => {
    return (
      <ul className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-gray-300 bg-white p-2 shadow-lg">
        {children}
      </ul>
    );
  },
  Option: ({ option, onClick }: { option: React.ReactNode; onClick: () => void }) => {
    return (
      <li
        className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
        onClick={onClick}>
        {option}
      </li>
    );
  },
};

export default AutoCompleteCompounds;
