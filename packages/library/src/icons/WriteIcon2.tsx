import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const WriteIcon2 = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3.8301 15.1755L15.2975 3.70808C15.6881 3.31756 16.3212 3.31756 16.7117 3.70808L19.6939 6.69023C20.0844 7.08075 20.0844 7.71392 19.6939 8.10444L8.22646 19.5719L4.15144 20.4363C3.44361 20.5864 2.81556 19.9584 2.96571 19.2505L3.8301 15.1755Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9539 6.04395L17.3502 10.4403"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.0024 20.501H20.5024"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WriteIcon2;
