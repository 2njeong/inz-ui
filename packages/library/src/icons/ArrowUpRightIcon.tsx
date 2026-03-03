import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ArrowUpRightIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M11.5401 6.69629L16.1969 6.69629C16.7492 6.69629 17.1969 7.144 17.1969 7.69629V12.3531M16.4898 7.4034L6.59033 17.3029"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowUpRightIcon;
