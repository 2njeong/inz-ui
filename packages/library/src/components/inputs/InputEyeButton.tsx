import { HTMLInputTypeAttribute } from "react";

import { IconButton } from "@ui/components/buttons/IconButton";
import EyeOffIcon from "@ui/icons/EyeOffIcon";
import EyeOnIcon from "@ui/icons/EyeOnIcon";

interface InputEyeButtonProps {
  onClick: () => void;
  inputType?: HTMLInputTypeAttribute;
}

const InputEyeButton = ({ onClick, inputType }: InputEyeButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      icon={
        inputType === "password" ? (
          <EyeOnIcon size={24} color="#aeb4b7" />
        ) : (
          <EyeOffIcon size={24} color="#aeb4b7" />
        )
      }
    />
  );
};

export default InputEyeButton;
