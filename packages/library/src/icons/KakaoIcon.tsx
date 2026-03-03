import React from 'react';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
}

const KakaoIcon = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12.0024 4C6.89228 4 2.75 7.27399 2.75 11.3149C2.75 13.9443 4.50405 16.2486 7.13861 17.538C6.94469 18.2595 6.43804 20.1551 6.33671 20.5604C6.21092 21.0635 6.52015 21.0565 6.72456 20.922C6.88354 20.8154 9.25954 19.1994 10.2851 18.5023C10.8424 18.5845 11.4154 18.6281 12.0024 18.6281C17.1126 18.6281 21.2548 15.3541 21.2548 11.3149C21.2548 7.27574 17.1126 4 12.0024 4Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default KakaoIcon;
