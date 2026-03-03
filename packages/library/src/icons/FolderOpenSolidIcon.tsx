import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const FolderOpenSolidIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M2.00093 8.3902L2.00083 17.9999C2.00082 19.1045 2.89625 20 4.00083 20L18.9996 20C20.0935 20 20.9823 19.1217 20.9993 18.0318L21.0015 18.0324L22.0517 10.8008H20.9998V10.8H5.13663V10C5.13663 9.44772 5.58434 9 6.13663 9H20.9998L20.9999 7.97556C20.9999 7.42326 20.5522 6.97553 19.9999 6.97553H11.5827L8.8465 4H3.00028C2.44785 4 2.00007 4.44729 2.00024 4.99972C2.00054 5.95757 2.00093 7.39988 2.00093 8.3902Z"
        fill={color}
      />
    </svg>
  );
};

export default FolderOpenSolidIcon;
