import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const CaretUpIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M11.2021 8.35736L6.16214 13.9349C5.94614 14.1872 5.94614 14.5796 6.16214 14.8318C6.25814 14.9439 6.40214 15 6.57014 15H17.4181C17.7301 15 17.9941 14.7197 17.9941 14.3834C17.9941 14.2152 17.9221 14.047 17.8261 13.9349L12.7861 8.35736C12.3541 7.88088 11.6341 7.88088 11.2021 8.35736Z"
        fill={color}
      />
    </svg>
  );
};

export default CaretUpIcon;
