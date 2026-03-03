import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ChevronLeftCircleIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M13.5303 8.46967C13.8232 8.76256 13.8232 9.23744 13.5303 9.53033L11.0607 12L13.5303 14.4697C13.8232 14.7626 13.8232 15.2374 13.5303 15.5303C13.2374 15.8232 12.7626 15.8232 12.4697 15.5303L9.46967 12.5303C9.17678 12.2374 9.17678 11.7626 9.46967 11.4697L12.4697 8.46967C12.7626 8.17678 13.2374 8.17678 13.5303 8.46967Z"
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

export default ChevronLeftCircleIcon;
