import React from 'react';

interface GroupIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const GroupIcon = ({ size, color, ...props }: GroupIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="1.75"
        cy="2.25"
        r="1.75"
        fill={color}
      />
      <circle
        cx="1.75"
        cy="15.75"
        r="1.75"
        fill={color}
      />
      <circle
        cx="1.75"
        cy="9"
        r="1.75"
        fill={color}
      />
      <circle
        cx="8.25"
        cy="2.25"
        r="1.75"
        fill={color}
      />
      <circle
        cx="8.25"
        cy="15.75"
        r="1.75"
        fill={color}
      />
      <circle
        cx="8.25"
        cy="9"
        r="1.75"
        fill={color}
      />
    </svg>
  );
};

export default GroupIcon;
