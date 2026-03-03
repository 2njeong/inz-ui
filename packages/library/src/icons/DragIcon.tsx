import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const DragIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="8.75098"
        cy="5.25098"
        r="1.75"
        fill={color}
      />
      <circle
        cx="8.75098"
        cy="18.751"
        r="1.75"
        fill={color}
      />
      <circle
        cx="8.75098"
        cy="12.001"
        r="1.75"
        fill={color}
      />
      <circle
        cx="15.2524"
        cy="5.25098"
        r="1.75"
        fill={color}
      />
      <circle
        cx="15.2524"
        cy="18.751"
        r="1.75"
        fill={color}
      />
      <circle
        cx="15.2524"
        cy="12.001"
        r="1.75"
        fill={color}
      />
    </svg>
  );
};

export default DragIcon;
