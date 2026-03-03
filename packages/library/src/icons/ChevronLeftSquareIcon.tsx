import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ChevronLeftSquareIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M13.5303 9.53033C13.8232 9.23744 13.8232 8.76256 13.5303 8.46967C13.2374 8.17678 12.7626 8.17678 12.4697 8.46967L9.46967 11.4697C9.17678 11.7626 9.17678 12.2374 9.46967 12.5303L12.4697 15.5303C12.7626 15.8232 13.2374 15.8232 13.5303 15.5303C13.8232 15.2374 13.8232 14.7626 13.5303 14.4697L11.0607 12L13.5303 9.53033Z"
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

export default ChevronLeftSquareIcon;
