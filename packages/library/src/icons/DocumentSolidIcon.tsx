import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const DocumentSolidIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M4.5 5C4.5 3.89543 5.39543 3 6.5 3H17.5C18.6046 3 19.5 3.89543 19.5 5V19C19.5 20.1046 18.6046 21 17.5 21H6.5C5.39543 21 4.5 20.1046 4.5 19V5ZM7.25 14.25C7.25 13.8358 7.58579 13.5 8 13.5H12C12.4142 13.5 12.75 13.8358 12.75 14.25C12.75 14.6642 12.4142 15 12 15H8C7.58579 15 7.25 14.6642 7.25 14.25ZM8 9C7.58579 9 7.25 9.33579 7.25 9.75C7.25 10.1642 7.58579 10.5 8 10.5H16C16.4142 10.5 16.75 10.1642 16.75 9.75C16.75 9.33579 16.4142 9 16 9H8Z"
        fill={color}
      />
    </svg>
  );
};

export default DocumentSolidIcon;
