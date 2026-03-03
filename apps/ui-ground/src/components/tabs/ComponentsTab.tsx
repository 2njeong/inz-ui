import ButtonsDemo from "../demos/ButtonsDemo";
import BadgeDemo from "../demos/BadgeDemo";
import CheckBoxDemo from "../demos/CheckBoxDemo";
import ToggleDemo from "../demos/ToggleDemo";
import RadioDemo from "../demos/RadioDemo";
import InputDemo from "../demos/InputDemo";
import DropdownDemo from "../demos/DropdownDemo";
import ChipDemo from "../demos/ChipDemo";
import NumberPickerDemo from "../demos/NumberPickerDemo";
import ProgressBarDemo from "../demos/ProgressBarDemo";
import TableDemo from "../demos/TableDemo";
import PaginationDemo from "../demos/PaginationDemo";
import CalendarDemo from "../demos/CalendarDemo";
import TooltipDemo from "../demos/TooltipDemo";
import ModalDemo from "../demos/ModalDemo";
import DrawerDemo from "../demos/DrawerDemo";
import AlertDemo from "../demos/AlertDemo";
import PopUpDemo from "../demos/PopUpDemo";
import FileUploaderDemo from "../demos/FileUploaderDemo";
import IndicatorDemo from "../demos/IndicatorDemo";
import TextComponentsDemo from "../demos/TextComponentsDemo";
import AutoCompleteDemo from "../demos/AutoCompleteDemo";

const navItems = [
  { id: "buttons", label: "Buttons" },
  { id: "badge", label: "Badge" },
  { id: "checkbox", label: "CheckBox" },
  { id: "toggle", label: "Toggle" },
  { id: "radio", label: "Radio" },
  { id: "input", label: "Input" },
  { id: "dropdown", label: "Dropdown" },
  { id: "chip", label: "Chip" },
  { id: "numberpicker", label: "NumberPicker" },
  { id: "progressbar", label: "ProgressBar" },
  { id: "table", label: "Table" },
  { id: "pagination", label: "Pagination" },
  { id: "calendar", label: "Calendar" },
  { id: "tooltip", label: "Tooltip" },
  { id: "modal", label: "Modal" },
  { id: "drawer", label: "Drawer" },
  { id: "alert", label: "Alert" },
  { id: "popup", label: "PopUp" },
  { id: "fileuploader", label: "FileUploader" },
  { id: "indicator", label: "Indicator" },
  { id: "texts", label: "Texts" },
  { id: "autocomplete", label: "AutoComplete" },
];

const ComponentsTab = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex gap-8">
      <nav className="sticky top-16 h-fit w-48 shrink-0 hidden lg:block">
        <div className="flex flex-col gap-0.5 border-l border-inz-line-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-1.5 text-left text-sm text-inz-text-helper hover:text-inz-primary-40 hover:bg-inz-coolgrey-95 rounded-r-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 min-w-0 divide-y divide-inz-line-container">
        <ButtonsDemo />
        <BadgeDemo />
        <CheckBoxDemo />
        <ToggleDemo />
        <RadioDemo />
        <InputDemo />
        <DropdownDemo />
        <ChipDemo />
        <NumberPickerDemo />
        <ProgressBarDemo />
        <TableDemo />
        <PaginationDemo />
        <CalendarDemo />
        <TooltipDemo />
        <ModalDemo />
        <DrawerDemo />
        <AlertDemo />
        <PopUpDemo />
        <FileUploaderDemo />
        <IndicatorDemo />
        <TextComponentsDemo />
        <AutoCompleteDemo />
      </div>
    </div>
  );
};

export default ComponentsTab;
