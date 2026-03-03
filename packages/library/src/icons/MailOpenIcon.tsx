import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const MailOpenIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M11.3482 4.27715C11.7483 4.03262 12.2517 4.03262 12.6518 4.27715L19.6067 8.52735L12 13.5985L4.39332 8.52735L11.3482 4.27715ZM2.61103 7.8586L10.566 2.99722C11.4463 2.45926 12.5537 2.45926 13.434 2.99722L21.3889 7.85855C21.6122 7.99393 21.75 8.23674 21.75 8.49986V17.4999C21.75 19.0186 20.5188 20.2499 19 20.2499H5C3.48122 20.2499 2.25 19.0186 2.25 17.4999V8.49986C2.25 8.23677 2.38773 7.994 2.61103 7.8586ZM3.75 17.4999V9.90125L11.584 15.1239C11.8359 15.2918 12.1641 15.2918 12.416 15.1239L20.25 9.90125V17.4999C20.25 18.1902 19.6904 18.7499 19 18.7499H5C4.30964 18.7499 3.75 18.1902 3.75 17.4999Z"
        fill={color}
      />
    </svg>
  );
};

export default MailOpenIcon;
