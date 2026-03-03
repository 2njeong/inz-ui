import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const ArrowRotationIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M5.07191 7.99902C5.8096 6.72131 6.88625 5.67248 8.18284 4.96849C9.47943 4.2645 10.9454 3.93277 12.4188 4.00999C13.8922 4.0872 15.3155 4.57035 16.5314 5.40602C17.7473 6.24168 18.7084 7.39731 19.3085 8.74513M3.23193 5.51439L3.96135 8.67393C4.08558 9.21206 4.62253 9.54759 5.16066 9.42335L8.3202 8.69394M18.9284 15.9989C18.1907 17.2766 17.114 18.3255 15.8174 19.0295C14.5208 19.7334 13.0548 20.0652 11.5815 19.988C10.1081 19.9107 8.6848 19.4276 7.4689 18.5919C6.253 17.7563 5.29188 16.6006 4.69179 15.2528M20.7683 18.4836L20.0389 15.324C19.9147 14.7859 19.3777 14.4504 18.8396 14.5746L15.6801 15.304"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowRotationIcon;
