import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const CaretDownIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12.792 15.6426L17.832 10.0651C18.048 9.81281 18.048 9.42042 17.832 9.16817C17.736 9.05606 17.592 9 17.424 9H6.576C6.264 9 6 9.28028 6 9.61662C6 9.78478 6.072 9.95295 6.168 10.0651L11.208 15.6426C11.64 16.1191 12.36 16.1191 12.792 15.6426Z"
        fill={color}
      />
    </svg>
  );
};

export default CaretDownIcon;
