import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const CopyIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M4.5 2.5C3.5335 2.5 2.75 3.2835 2.75 4.25V16.25C2.75 17.2165 3.5335 18 4.5 18H16.5C17.4665 18 18.25 17.2165 18.25 16.25V4.25C18.25 3.2835 17.4665 2.5 16.5 2.5H4.5ZM4.25 4.25C4.25 4.11193 4.36193 4 4.5 4H16.5C16.6381 4 16.75 4.11193 16.75 4.25V16.25C16.75 16.3881 16.6381 16.5 16.5 16.5H4.5C4.36193 16.5 4.25 16.3881 4.25 16.25V4.25ZM21.75 6.75C21.75 6.33579 21.4142 6 21 6C20.5858 6 20.25 6.33579 20.25 6.75V18.75C20.25 19.4404 19.6904 20 19 20H7C6.58579 20 6.25 20.3358 6.25 20.75C6.25 21.1642 6.58579 21.5 7 21.5H19C20.5188 21.5 21.75 20.2688 21.75 18.75V6.75Z"
        fill={color}
      />
    </svg>
  );
};

export default CopyIcon;
