import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const TimeIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12ZM12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 6.24902C12.75 5.83481 12.4142 5.49902 12 5.49902C11.5858 5.49902 11.25 5.83481 11.25 6.24902V11.9998C11.25 12.2839 11.4105 12.5436 11.6646 12.6706L15.6646 14.6706C16.0351 14.8559 16.4856 14.7057 16.6708 14.3352C16.8561 13.9647 16.7059 13.5142 16.3354 13.329L12.75 11.5363V6.24902Z"
        fill={color}
      />
    </svg>
  );
};

export default TimeIcon;
