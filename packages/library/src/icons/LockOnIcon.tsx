import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const LockOnIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M12 2.25C9.37665 2.25 7.25 4.37665 7.25 7V8.25H6C4.48122 8.25 3.25 9.48122 3.25 11V19C3.25 20.5188 4.48122 21.75 6 21.75H18C19.5188 21.75 20.75 20.5188 20.75 19V11C20.75 9.48122 19.5188 8.25 18 8.25H16.75V7C16.75 4.37665 14.6234 2.25 12 2.25ZM15.25 8.25V7C15.25 5.20507 13.7949 3.75 12 3.75C10.2051 3.75 8.75 5.20507 8.75 7V8.25H15.25ZM6 9.75C5.30964 9.75 4.75 10.3096 4.75 11V19C4.75 19.6904 5.30964 20.25 6 20.25H18C18.6904 20.25 19.25 19.6904 19.25 19V11C19.25 10.3096 18.6904 9.75 18 9.75H6ZM12 13.25C12.4142 13.25 12.75 13.5858 12.75 14V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V14C11.25 13.5858 11.5858 13.25 12 13.25Z"
        fill={color}
      />
    </svg>
  );
};

export default LockOnIcon;
