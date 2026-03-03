import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const FolderDefaultSolidIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M2.50102 8.3902L2.50093 17.9999C2.50091 19.1045 3.39634 20 4.50092 20L19.4997 20C20.6042 20 21.4996 19.1046 21.4997 18.0001L21.5 7.97556C21.5 7.42326 21.0523 6.97553 20.5 6.97553H12.0828L9.3466 4H3.50037C2.94794 4 2.50016 4.44729 2.50034 4.99972C2.50063 5.95757 2.50103 7.39988 2.50102 8.3902Z"
        fill={color}
      />
    </svg>
  );
};

export default FolderDefaultSolidIcon;
