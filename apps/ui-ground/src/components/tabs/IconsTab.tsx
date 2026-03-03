import { useState, useMemo, type ComponentType } from "react";
import { SearchInput, NumberPicker } from "inz-ui";
import * as AllIcons from "inz-ui";

const COLOR_PRESETS = [
  { label: "Default", value: null },
  { label: "Black", value: "#202020" },
  { label: "Grey", value: "#6B7280" },
  { label: "Red", value: "#EF4444" },
  { label: "Orange", value: "#F97316" },
  { label: "Yellow", value: "#EAB308" },
  { label: "Green", value: "#22C55E" },
  { label: "Blue", value: "#3B82F6" },
  { label: "Purple", value: "#A855F7" },
  { label: "Pink", value: "#EC4899" },
] as const;

interface IconEntry {
  name: string;
  Component: ComponentType<{ size?: number; color?: string }>;
  category: string;
}

const categorize = (name: string): string => {
  if (name.startsWith("Arrow")) return "Arrow";
  if (name.startsWith("Bell")) return "Bell";
  if (name.startsWith("Caret")) return "Caret";
  if (name.startsWith("Chevron")) return "Chevron";
  if (name.startsWith("Status")) return "Status";
  if (name.startsWith("Lock")) return "Lock";
  if (name.startsWith("Mail") || name.startsWith("Message")) return "Communication";
  if (name.startsWith("Folder") || name.startsWith("Document") || name.startsWith("File") || name.startsWith("Paper")) return "File";
  if (name.startsWith("Chart") || name.startsWith("Graph")) return "Chart";
  if (name.startsWith("Calendar")) return "Calendar";
  if (name.startsWith("Write") || name.startsWith("Edit")) return "Edit";
  if (name.startsWith("Eye")) return "Eye";
  if (name.startsWith("Delete")) return "Delete";
  if (name.startsWith("Send")) return "Send";
  return "General";
};

const iconEntries: IconEntry[] = Object.entries(AllIcons)
  .filter(([name, value]) => name.endsWith("Icon") && typeof value === "function")
  .map(([name, Component]) => ({
    name,
    Component: Component as ComponentType<{ size?: number; color?: string }>,
    category: categorize(name),
  }))
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

const IconsTab = () => {
  const [search, setSearch] = useState("");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState(24);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return iconEntries;
    const q = search.toLowerCase();
    return iconEntries.filter((icon) => icon.name.toLowerCase().includes(q));
  }, [search]);

  const grouped = useMemo(() => {
    const map = new Map<string, IconEntry[]>();
    filtered.forEach((icon) => {
      const list = map.get(icon.category) || [];
      list.push(icon);
      map.set(icon.category, list);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`import { ${name} } from "inz-ui";`);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 1500);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="heading2 text-inz-text-title mb-2">Icons</h2>
        <p className="body4 text-inz-text-helper mb-4">
          클릭하면 import 구문이 클립보드에 복사됩니다. 총 {iconEntries.length}개
        </p>
        <div className="max-w-sm">
          <SearchInput
            placeholder="아이콘 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={() => {}}
            onClear={() => setSearch("")}
          />
        </div>
        <div className="mt-3 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="body4 text-inz-text-body whitespace-nowrap">Size</span>
            <NumberPicker
              value={iconSize}
              onIncrement={() => setIconSize((v) => Math.min(v + 1, 64))}
              onDecrement={() => setIconSize((v) => Math.max(v - 1, 12))}
              minValue={12}
              maxValue={64}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="body4 text-inz-text-body whitespace-nowrap">Color</span>
            <div className="flex items-center gap-1.5">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setSelectedColor(preset.value)}
                  title={preset.label}
                  className={`h-6 w-6 rounded-full border transition-all ${
                    selectedColor === preset.value
                      ? "ring-2 ring-inz-primary-40 ring-offset-1"
                      : "hover:scale-110"
                  } ${preset.value === null ? "border-inz-line-container" : "border-transparent"}`}
                  style={
                    preset.value === null
                      ? { background: "conic-gradient(#EF4444, #F97316, #EAB308, #22C55E, #3B82F6, #A855F7, #EC4899, #EF4444)" }
                      : { backgroundColor: preset.value }
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {grouped.map(([category, icons]) => (
        <div key={category}>
          <h3 className="title3 text-inz-text-title mb-3">
            {category}
            <span className="ml-2 text-sm font-normal text-inz-text-caption">
              ({icons.length})
            </span>
          </h3>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {icons.map(({ name, Component }) => (
              <button
                key={name}
                onClick={() => handleCopy(name)}
                className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-3 transition-colors hover:border-inz-line-container hover:bg-white"
                title={name}
              >
                <div
                  className={`flex items-center justify-center transition-colors ${selectedColor ? "" : "text-inz-coolgrey-30 group-hover:text-inz-primary-40"}`}
                  style={{
                    width: Math.max(40, iconSize + 16),
                    height: Math.max(40, iconSize + 16),
                    ...(selectedColor ? { color: selectedColor } : {}),
                  }}
                >
                  <Component size={iconSize} color="currentColor" />
                </div>
                <span className="w-full truncate text-center text-[10px] text-inz-text-caption group-hover:text-inz-text-body">
                  {copiedIcon === name ? "복사됨!" : name.replace("Icon", "")}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-inz-text-caption">
          <p className="body3">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default IconsTab;
