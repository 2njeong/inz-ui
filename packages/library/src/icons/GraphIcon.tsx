import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const GraphIcon = ({ size, color, ...props }: IconProps) => {
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
        d="M3.75 4C3.75 3.58579 3.41421 3.25 3 3.25C2.58579 3.25 2.25 3.58579 2.25 4V20C2.25 20.4142 2.58579 20.75 3 20.75H21C21.4142 20.75 21.75 20.4142 21.75 20C21.75 19.5858 21.4142 19.25 21 19.25H3.75V4ZM19.7521 8.30842C20.0325 8.0035 20.0125 7.52905 19.7076 7.24869C19.4027 6.96833 18.9283 6.98823 18.6479 7.29315L13.4718 12.9226L10.5248 10.0364C10.3775 9.89216 10.1772 9.8149 9.97119 9.82282C9.76514 9.83074 9.57145 9.92314 9.43564 10.0783L5.93564 14.0771C5.66283 14.3888 5.69435 14.8626 6.00604 15.1354C6.31772 15.4082 6.79155 15.3767 7.06436 15.065L10.0419 11.6631L12.9752 14.5358C13.1203 14.6779 13.3167 14.7551 13.5196 14.7497C13.7226 14.7444 13.9147 14.6571 14.0521 14.5076L19.7521 8.30842Z"
        fill={color}
      />
    </svg>
  );
};

export default GraphIcon;
