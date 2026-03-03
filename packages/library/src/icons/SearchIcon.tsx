import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const SearchIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M3.75 10.75C3.75 6.88401 6.88401 3.75 10.75 3.75C14.616 3.75 17.75 6.88401 17.75 10.75C17.75 14.616 14.616 17.75 10.75 17.75C6.88401 17.75 3.75 14.616 3.75 10.75ZM10.75 2.25C6.05558 2.25 2.25 6.05558 2.25 10.75C2.25 15.4444 6.05558 19.25 10.75 19.25C12.8272 19.25 14.7303 18.5049 16.2068 17.2674L20.773 21.8336C21.0659 22.1265 21.5407 22.1265 21.8336 21.8336C22.1265 21.5407 22.1265 21.0659 21.8336 20.773L17.2674 16.2068C18.5049 14.7303 19.25 12.8272 19.25 10.75C19.25 6.05558 15.4444 2.25 10.75 2.25Z"
        fill={color}
      />
    </svg>
  );
};

export default SearchIcon;
