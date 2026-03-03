import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const MoreIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M7 12C7 12.9665 6.2165 13.75 5.25 13.75C4.2835 13.75 3.5 12.9665 3.5 12C3.5 11.0335 4.2835 10.25 5.25 10.25C6.2165 10.25 7 11.0335 7 12ZM13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12ZM18.75 13.75C19.7165 13.75 20.5 12.9665 20.5 12C20.5 11.0335 19.7165 10.25 18.75 10.25C17.7835 10.25 17 11.0335 17 12C17 12.9665 17.7835 13.75 18.75 13.75Z"
        fill={color}
      />
    </svg>
  );
};

export default MoreIcon;
