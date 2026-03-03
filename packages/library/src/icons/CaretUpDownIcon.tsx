import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const CaretUpDownIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M17.8379 8.93493L12.7954 3.35736C12.3632 2.88088 11.6428 2.88088 11.2106 3.35736L6.16808 8.93493C6.07204 9.04705 6 9.21522 6 9.38338C6 9.71972 6.26413 10 6.57629 10H17.4297C17.5978 10 17.7419 9.94394 17.8379 9.83183C18.054 9.57958 18.054 9.18719 17.8379 8.93493ZM17.8379 15.0651L12.7954 20.6426C12.3632 21.1191 11.6428 21.1191 11.2106 20.6426L6.16808 15.0651C6.07204 14.953 6 14.7848 6 14.6166C6 14.2803 6.26413 14 6.57629 14H17.4297C17.5978 14 17.7419 14.0561 17.8379 14.1682C18.054 14.4204 18.054 14.8128 17.8379 15.0651Z"
        fill={color}
      />
    </svg>
  );
};

export default CaretUpDownIcon;
