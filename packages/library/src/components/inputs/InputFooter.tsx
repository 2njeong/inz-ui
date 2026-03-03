import HelpText from "@ui/components/texts/HelpText";
import InvalidText from "@ui/components/texts/InvalidText";
import WordCounter from "@ui/components/texts/WordCounter";

interface InputFooterProps extends React.ComponentProps<"input"> {
  helpText?: string;
  invalidText?: string;
  successText?: string;
  withWordCounter?: boolean;
}

const InputFooter = ({
  helpText,
  invalidText,
  successText,
  withWordCounter,
  value,
  maxLength,
}: InputFooterProps) => {
  const showInvalidText = !!invalidText;
  const showSuccessText = !showInvalidText && !!successText;
  const showHelpText = !showInvalidText && !showSuccessText && !!helpText;

  if (
    !showInvalidText &&
    !showSuccessText &&
    !showHelpText &&
    !withWordCounter
  ) {
    return null;
  }

  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {showInvalidText && <InvalidText text={invalidText} />}
        {showSuccessText && (
          <span className="body4 text-inz-green-40">{successText}</span>
        )}
        {showHelpText && <HelpText text={helpText} />}
      </div>
      {withWordCounter && (
        <WordCounter
          value={value?.toString() ?? ""}
          maxLength={maxLength ?? 0}
        />
      )}
    </div>
  );
};

export default InputFooter;
