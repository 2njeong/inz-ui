import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  bgColor: string;
  strokeColor?: string;
  className?: string;
}

const DeleteSolidIcon = ({ size, strokeColor, bgColor, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill={bgColor}
      />
      <path
        d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5"
        stroke={strokeColor || 'white'}
        className={className || ''}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DeleteSolidIcon;
