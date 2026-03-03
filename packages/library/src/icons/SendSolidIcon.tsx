import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const SendSolidIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4.08692 4.92435C3.62426 3.63085 4.99989 2.44776 6.20997 3.09817L19.4951 10.2388C20.8993 10.9935 20.8993 13.0075 19.4951 13.7622L6.20997 20.9029C4.99989 21.5533 3.62426 20.3702 4.08692 19.0767L6.36719 12.7056H12.0537C12.4556 12.7053 12.7813 12.379 12.7813 11.9771C12.781 11.5754 12.4554 11.2498 12.0537 11.2495H6.35059L4.08692 4.92435Z"
        fill={color}
      />
    </svg>
  );
};

export default SendSolidIcon;
