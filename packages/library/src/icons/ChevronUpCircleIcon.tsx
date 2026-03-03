import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ChevronUpCircleIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12 11.0607L9.53033 13.5303C9.23744 13.8232 8.76256 13.8232 8.46967 13.5303C8.17678 13.2374 8.17678 12.7626 8.46967 12.4697L11.4697 9.46967C11.7626 9.17678 12.2374 9.17678 12.5303 9.46967L15.5303 12.4697C15.8232 12.7626 15.8232 13.2374 15.5303 13.5303C15.2374 13.8232 14.7626 13.8232 14.4697 13.5303L12 11.0607Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronUpCircleIcon;
