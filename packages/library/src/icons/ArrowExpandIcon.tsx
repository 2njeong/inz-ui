import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ArrowExpandIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M8.61539 19.3849L5 19.3849C4.44772 19.3849 4 18.9371 4 18.3849L4 14.7695M4.76918 18.6157L10.1538 13.2311M19.3844 8.61539L19.3844 5C19.3844 4.44772 18.9367 4 18.3844 4L14.769 4M18.6152 4.76927L13.2305 10.1539"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowExpandIcon;
