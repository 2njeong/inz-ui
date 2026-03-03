import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ChevronDownSquareIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M9.53033 10.4697C9.23744 10.1768 8.76256 10.1768 8.46967 10.4697C8.17678 10.7626 8.17678 11.2374 8.46967 11.5303L11.4697 14.5303C11.7626 14.8232 12.2374 14.8232 12.5303 14.5303L15.5303 11.5303C15.8232 11.2374 15.8232 10.7626 15.5303 10.4697C15.2374 10.1768 14.7626 10.1768 14.4697 10.4697L12 12.9393L9.53033 10.4697Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2.25C3.48122 2.25 2.25 3.48122 2.25 5V19C2.25 20.5188 3.48122 21.75 5 21.75H19C20.5188 21.75 21.75 20.5188 21.75 19V5C21.75 3.48122 20.5188 2.25 19 2.25H5ZM3.75 5C3.75 4.30964 4.30964 3.75 5 3.75H19C19.6904 3.75 20.25 4.30964 20.25 5V19C20.25 19.6904 19.6904 20.25 19 20.25H5C4.30964 20.25 3.75 19.6904 3.75 19V5Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronDownSquareIcon;
