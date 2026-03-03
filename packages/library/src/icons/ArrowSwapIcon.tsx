import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ArrowSwapIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M7.58579 19L5.2929 16.7071C4.90237 16.3166 4.90237 15.6834 5.2929 15.2929L7.58579 13M5.58579 16L17.5858 16M16.5858 10L18.8787 7.7071C19.2692 7.31658 19.2692 6.68341 18.8787 6.29289L16.5858 4M18.5858 7L6.58579 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowSwapIcon;
