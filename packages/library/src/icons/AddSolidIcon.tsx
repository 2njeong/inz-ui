import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const AddSolidIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM12 7.00684C12.4142 7.00684 12.75 7.34262 12.75 7.75684V11.2495H16.2426C16.6568 11.2495 16.9926 11.5853 16.9926 11.9995C16.9926 12.4137 16.6568 12.7495 16.2426 12.7495H12.75V16.2421C12.75 16.6563 12.4142 16.9921 12 16.9921C11.5858 16.9921 11.25 16.6563 11.25 16.2421V12.7495H7.75732C7.34311 12.7495 7.00732 12.4137 7.00732 11.9995C7.00732 11.5853 7.34311 11.2495 7.75732 11.2495H11.25V7.75684C11.25 7.34262 11.5858 7.00684 12 7.00684Z"
        fill={color}
      />
    </svg>
  );
};

export default AddSolidIcon;
