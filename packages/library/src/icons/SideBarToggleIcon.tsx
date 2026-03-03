import React from 'react';
import { IconButton } from '../components/buttons/IconButton';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  size: number;
  color: string;
  isOpen: boolean;
  onClick: () => void;
}

const SideBarToggleIcon = ({ size, color, isOpen, onClick }: IconProps) => {
  const framePath = `
    M16.875 4.16667
    C16.875 3.59137 16.4086 3.125 15.8333 3.125 
    H8.125 V16.875
    H15.8333
    C16.4086 16.875 16.875 16.4086 16.875 15.8333
    V4.16667 Z

    M3.125 15.8333
    C3.125 16.4086 3.59137 16.875 4.16667 16.875
    H6.875 V3.125
    H4.16667
    C3.59137 3.125 3.125 3.59137 3.125 4.16667
    V15.8333 Z

    M18.125 15.8333
    C18.125 17.099 17.099 18.125 15.8333 18.125
    H4.16667
    C2.90101 18.125 1.875 17.099 1.875 15.8333
    V4.16667
    C1.875 2.90101 2.90101 1.875 4.16667 1.875
    H15.8333
    C17.099 1.875 18.125 2.90101 18.125 4.16667
    V15.8333 Z
  `;

  const arrowPath = `
    M12.8914 7.05811
    C13.1355 6.81403 13.5312 6.81403 13.7752 7.05811
    C14.0193 7.30218 14.0193 7.69782 13.7752 7.94189
    L11.7171 10 L13.7752 12.0581 L13.8184 12.1053
    C14.0186 12.3508 14.0041 12.7131 13.7752 12.9419
    C13.5464 13.1707 13.1841 13.1853 12.9386 12.985
    L12.8914 12.9419
    L10.3914 10.4419
    C10.1474 10.1978 10.1474 9.80218 10.3914 9.55811
    L12.8914 7.05811 Z
  `;

  const ARROW_CX = 12.5;
  const ARROW_CY = 10;

  const arrowTransform = isOpen ? undefined : `rotate(180 ${String(ARROW_CX)} ${String(ARROW_CY)})`;

  return (
    <IconButton
      onClick={onClick}
      className="flex-shrink-0"
      icon={
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d={framePath}
            fill={color}
          />

          <path
            d={arrowPath}
            fill={color}
            transform={arrowTransform}
          />
        </svg>
      }
    />
  );
};

export default SideBarToggleIcon;
