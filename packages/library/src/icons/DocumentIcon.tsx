import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
  icon?: React.ReactNode;
}

const DocumentIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M6 1.25C4.48122 1.25 3.25 2.48122 3.25 4V20C3.25 21.5188 4.48122 22.75 6 22.75H18C19.5188 22.75 20.75 21.5188 20.75 20V4C20.75 2.48122 19.5188 1.25 18 1.25H6ZM4.75 4C4.75 3.30964 5.30964 2.75 6 2.75H18C18.6904 2.75 19.25 3.30964 19.25 4V20C19.25 20.6904 18.6904 21.25 18 21.25H6C5.30964 21.25 4.75 20.6904 4.75 20V4ZM8 6.25C7.58579 6.25 7.25 6.58579 7.25 7C7.25 7.41421 7.58579 7.75 8 7.75H16C16.4142 7.75 16.75 7.41421 16.75 7C16.75 6.58579 16.4142 6.25 16 6.25H8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H12C12.4142 17.75 12.75 17.4142 12.75 17C12.75 16.5858 12.4142 16.25 12 16.25H8Z"
        fill={color}
      />
    </svg>
  );
};

export default DocumentIcon;
