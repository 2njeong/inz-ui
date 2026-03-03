import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ArrowTriangleIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={(size * 9) / 12} // 원래 비율 유지 (width 12, height 9 기준)
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M7.78885 7.95568L12 9.90952e-07L0 0L4.21114 7.95568C4.94819 9.34811 7.0518 9.34811 7.78885 7.95568Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowTriangleIcon;
