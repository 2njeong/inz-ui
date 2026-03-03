import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const StatusDangerSolidIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM11.1973 7.99922C11.1973 7.55739 11.5554 7.19922 11.9973 7.19922C12.4391 7.19922 12.7973 7.55739 12.7973 7.99922V12.7992C12.7973 13.241 12.4391 13.5992 11.9973 13.5992C11.5554 13.5992 11.1973 13.241 11.1973 12.7992V7.99922ZM11.998 17C12.5503 17 12.998 16.5523 12.998 16C12.998 15.4477 12.5503 15 11.998 15C11.4458 15 10.998 15.4477 10.998 16C10.998 16.5523 11.4458 17 11.998 17Z"
        fill={color}
      />
    </svg>
  );
};

export default StatusDangerSolidIcon;
