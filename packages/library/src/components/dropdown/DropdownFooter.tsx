import InvalidText from "@ui/components/texts/InvalidText";

interface DropdownFooterProps {
  invalidText?: string;
}

const DropdownFooter = ({ invalidText }: DropdownFooterProps) => {
  if (!invalidText) {
    return null;
  }

  return (
    <span className="text-inz-error-50 mt-2">
      {invalidText && <InvalidText text={invalidText} />}
    </span>
  );
};

export default DropdownFooter;
