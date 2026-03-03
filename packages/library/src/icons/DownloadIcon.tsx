import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const DownloadIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M12.75 3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V13.2336L7.77088 9.87524C7.47286 9.58756 6.99806 9.59595 6.71039 9.89396C6.42271 10.192 6.4311 10.6668 6.72912 10.9545L11.4791 15.5396C11.7697 15.8201 12.2303 15.8201 12.5209 15.5396L17.2709 10.9545C17.5689 10.6668 17.5773 10.192 17.2896 9.89396C17.0019 9.59595 16.5271 9.58756 16.2291 9.87524L12.75 13.2336V3ZM4.75 15.5C4.75 15.0858 4.41421 14.75 4 14.75C3.58579 14.75 3.25 15.0858 3.25 15.5V18.5C3.25 20.0188 4.48122 21.25 6 21.25H18C19.5188 21.25 20.75 20.0188 20.75 18.5V15.5C20.75 15.0858 20.4142 14.75 20 14.75C19.5858 14.75 19.25 15.0858 19.25 15.5V18.5C19.25 19.1904 18.6904 19.75 18 19.75H6C5.30964 19.75 4.75 19.1904 4.75 18.5V15.5Z"
        fill={color}
      />
    </svg>
  );
};

export default DownloadIcon;
