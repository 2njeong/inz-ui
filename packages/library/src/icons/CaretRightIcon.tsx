import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const CaretRightIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M15.6426 11.2021L10.0651 6.16214C9.81281 5.94614 9.42042 5.94614 9.16817 6.16214C9.05606 6.25814 9 6.40214 9 6.57014V17.4181C9 17.7301 9.28028 17.9941 9.61662 17.9941C9.78478 17.9941 9.95295 17.9221 10.0651 17.8261L15.6426 12.7861C16.1191 12.3541 16.1191 11.6341 15.6426 11.2021Z"
        fill={color}
      />
    </svg>
  );
};

export default CaretRightIcon;
