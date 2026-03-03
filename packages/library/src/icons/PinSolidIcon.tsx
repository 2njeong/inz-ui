import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const PinSolidIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 2C6.94772 2 6.5 2.44772 6.5 3C6.5 3.55228 6.94771 4 7.5 4H8V10H7.5C6.39543 10 5.5 10.8954 5.5 12V13C5.5 13.5523 5.94772 14 6.5 14H8H10.75V20.75C10.75 21.4404 11.3096 22 12 22C12.6904 22 13.25 21.4404 13.25 20.75V14H16H17.5C18.0523 14 18.5 13.5523 18.5 13V12C18.5 10.8954 17.6046 10 16.5 10H16V4H16.5C17.0523 4 17.5 3.55228 17.5 3C17.5 2.44772 17.0523 2 16.5 2H16H8H7.5Z"
        fill={color}
      />
    </svg>
  );
};

export default PinSolidIcon;
