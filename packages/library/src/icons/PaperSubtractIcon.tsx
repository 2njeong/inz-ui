import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const PaperSubtractIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M5 2.75C4.30964 2.75 3.75 3.30964 3.75 4V20C3.75 20.6904 4.30964 21.25 5 21.25H12C12.4142 21.25 12.75 21.5858 12.75 22C12.75 22.4142 12.4142 22.75 12 22.75H5C3.48122 22.75 2.25 21.5188 2.25 20V4C2.25 2.48122 3.48122 1.25 5 1.25H11H13.0633C13.8794 1.25 14.6534 1.61251 15.1759 2.23949L19.1126 6.96359C19.5245 7.45781 19.75 8.08077 19.75 8.7241V12C19.75 12.4142 19.4142 12.75 19 12.75C18.5858 12.75 18.25 12.4142 18.25 12V8.75H15C14.0335 8.75 13.25 7.9665 13.25 7V2.76402C13.1886 2.75475 13.1262 2.75 13.0633 2.75H11H5ZM14.75 4.07154V7C14.75 7.13807 14.8619 7.25 15 7.25H17.3987L14.75 4.07154ZM15.25 19C15.25 18.5858 15.5858 18.25 16 18.25H22C22.4142 18.25 22.75 18.5858 22.75 19C22.75 19.4142 22.4142 19.75 22 19.75H16C15.5858 19.75 15.25 19.4142 15.25 19Z"
        fill={color}
      />
    </svg>
  );
};

export default PaperSubtractIcon;
