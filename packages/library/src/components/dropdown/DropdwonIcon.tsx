import CaretDownIcon from "@ui/icons/CaretDownIcon";
import { cn } from "@ui/utils/cn";

interface DropdownIconProps {
  open: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const DropdownIcon = ({ open, onClick }: DropdownIconProps) => {
  return (
    <span
      className={cn(
        "text-inz-greyscale-40 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform",
        open && "rotate-180"
      )}
      onClick={(e) => {
        onClick?.(e);
      }}
      aria-hidden="true"
    >
      <CaretDownIcon size={24} color="#959a9d" />
    </span>
  );
};

export default DropdownIcon;
