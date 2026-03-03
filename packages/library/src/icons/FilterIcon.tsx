import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const FilterIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V4.81751C22 5.57739 21.7116 6.30895 21.1932 6.86447L15.5379 12.9237C15.1922 13.294 15 13.7817 15 14.2883V18.382C15 18.7607 14.786 19.107 14.4472 19.2764L10.4472 21.2764C9.78231 21.6088 9 21.1253 9 20.382V14.2883C9 13.7817 8.80776 13.294 8.46211 12.9237L2.80683 6.86446C2.28836 6.30895 2 5.57739 2 4.81751V3Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default FilterIcon;
