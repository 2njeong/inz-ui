interface InputUnitProps extends React.ComponentProps<'div'> {
  unit?: string;
}

const InputUnit = ({ unit }: InputUnitProps) => {
  return (
    <div className="body1 border-inz-line-border bg-inz-coolgrey-95 text-inz-text-helper size-11.5 border-l-1 mr-[1px] flex items-center justify-center rounded-r-sm">
      {unit}
    </div>
  );
};

export default InputUnit;
