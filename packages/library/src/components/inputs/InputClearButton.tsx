import { IconButton } from "@ui/components/buttons/IconButton";
import DeleteSolidIcon from "@ui/icons/DeleteSolidIcon";

interface InputClearButtonProps extends React.ComponentProps<"button"> {
  onClick: () => void;
}

const InputClearButton = ({ onClick }: InputClearButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      className="hover:bg-transparent"
      icon={<DeleteSolidIcon size={24} bgColor="#aeb4b7" />}
    />
  );
};

export default InputClearButton;
