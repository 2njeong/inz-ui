import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const MailCloseIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M4.5 3.25C2.98122 3.25 1.75 4.48122 1.75 6V17.2C1.75 18.7188 2.98122 19.95 4.5 19.95H19.5C21.0188 19.95 22.25 18.7188 22.25 17.2V6C22.25 4.48122 21.0188 3.25 19.5 3.25H4.5ZM3.25 6C3.25 5.30964 3.80964 4.75 4.5 4.75H19.5C20.1904 4.75 20.75 5.30964 20.75 6V17.2C20.75 17.8904 20.1904 18.45 19.5 18.45H4.5C3.80964 18.45 3.25 17.8904 3.25 17.2V6ZM5.38674 6.30327C5.08393 6.02065 4.60933 6.03701 4.32671 6.33982C4.04408 6.64264 4.06045 7.11723 4.36326 7.39985L10.1236 12.7762C11.1802 13.7623 12.8198 13.7623 13.8764 12.7762L19.6367 7.39985C19.9396 7.11723 19.9559 6.64264 19.6733 6.33982C19.3907 6.03701 18.9161 6.02065 18.6133 6.30327L12.8529 11.6796C12.3726 12.1279 11.6274 12.1279 11.1471 11.6796L5.38674 6.30327Z"
        fill={color}
      />
    </svg>
  );
};

export default MailCloseIcon;
