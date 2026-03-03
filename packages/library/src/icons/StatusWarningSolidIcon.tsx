import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const StatusWarningSolidIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M10.2518 5.14688L3.6508 17.0286C2.91021 18.3617 3.87415 19.9999 5.39912 19.9999H18.6011C20.126 19.9999 21.09 18.3617 20.3494 17.0286L13.7484 5.14688C12.9864 3.77526 11.0138 3.77526 10.2518 5.14688ZM11.1992 8.8C11.1992 8.35817 11.5574 8 11.9992 8C12.441 8 12.7992 8.35817 12.7992 8.8V13.6C12.7992 14.0418 12.441 14.4 11.9992 14.4C11.5574 14.4 11.1992 14.0418 11.1992 13.6V8.8ZM12 17.8008C12.5523 17.8008 13 17.3531 13 16.8008C13 16.2485 12.5523 15.8008 12 15.8008C11.4477 15.8008 11 16.2485 11 16.8008C11 17.3531 11.4477 17.8008 12 17.8008Z"
        fill={color}
      />
    </svg>
  );
};

export default StatusWarningSolidIcon;
