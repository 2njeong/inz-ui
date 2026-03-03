import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const CaretLeftIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M8.35736 12.7998L13.9349 17.8398C14.1872 18.0558 14.5796 18.0558 14.8318 17.8398C14.9439 17.7438 15 17.5998 15 17.4318V6.58381C15 6.27181 14.7197 6.00781 14.3834 6.00781C14.2152 6.00781 14.047 6.07981 13.9349 6.17581L8.35736 11.2158C7.88088 11.6478 7.88088 12.3678 8.35736 12.7998Z"
        fill={color}
      />
    </svg>
  );
};

export default CaretLeftIcon;
