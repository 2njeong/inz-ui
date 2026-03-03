import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ChevronBackwardIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M12.5303 6.53033C12.8232 6.23744 12.8232 5.76256 12.5303 5.46967C12.2374 5.17678 11.7626 5.17678 11.4697 5.46967L5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303L11.4697 18.5303C11.7626 18.8232 12.2374 18.8232 12.5303 18.5303C12.8232 18.2374 12.8232 17.7626 12.5303 17.4697L7.06066 12L12.5303 6.53033ZM18.5303 6.53033C18.8232 6.23744 18.8232 5.76256 18.5303 5.46967C18.2374 5.17678 17.7626 5.17678 17.4697 5.46967L11.4697 11.4697C11.1768 11.7626 11.1768 12.2374 11.4697 12.5303L17.4697 18.5303C17.7626 18.8232 18.2374 18.8232 18.5303 18.5303C18.8232 18.2374 18.8232 17.7626 18.5303 17.4697L13.0607 12L18.5303 6.53033Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronBackwardIcon;
