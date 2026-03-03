import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ArrowUpDownIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4.5 7.58579L6.79289 5.29289C7.18342 4.90237 7.81658 4.90237 8.20711 5.29289L10.5 7.58579M7.5 5.58579L7.5 17.5858M13.5 16.5858L15.7929 18.8787C16.1834 19.2692 16.8166 19.2692 17.2071 18.8787L19.5 16.5858M16.5 18.5858L16.5 6.58578"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowUpDownIcon;
