import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ChevronForwardIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L10.9393 12L5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L12.5303 12.5303C12.8232 12.2374 12.8232 11.7626 12.5303 11.4697L6.53033 5.46967ZM12.5303 5.46967C12.2374 5.17678 11.7626 5.17678 11.4697 5.46967C11.1768 5.76256 11.1768 6.23744 11.4697 6.53033L16.9393 12L11.4697 17.4697C11.1768 17.7626 11.1768 18.2374 11.4697 18.5303C11.7626 18.8232 12.2374 18.8232 12.5303 18.5303L18.5303 12.5303C18.8232 12.2374 18.8232 11.7626 18.5303 11.4697L12.5303 5.46967Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronForwardIcon;
