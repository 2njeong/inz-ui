import { useState } from "react";
import { CheckIcon } from "inz-ui";
import { hexToOklch } from "../../utils/color";

interface ColorSwatch {
  name: string;
  variable: string;
  hex: string;
}

interface ColorFamily {
  name: string;
  colors: ColorSwatch[];
}

const colorFamilies: ColorFamily[] = [
  {
    name: "Primary",
    colors: [
      { name: "primary-95", variable: "--color-inz-primary-95", hex: "#eef5fc" },
      { name: "primary-90", variable: "--color-inz-primary-90", hex: "#dbedff" },
      { name: "primary-80", variable: "--color-inz-primary-80", hex: "#c0e1ff" },
      { name: "primary-70", variable: "--color-inz-primary-70", hex: "#81c2ff" },
      { name: "primary-50", variable: "--color-inz-primary-50", hex: "#4b9afd" },
      { name: "primary-40", variable: "--color-inz-primary-40", hex: "#0671e0" },
      { name: "primary-30", variable: "--color-inz-primary-30", hex: "#0063c7" },
      { name: "primary-20", variable: "--color-inz-primary-20", hex: "#0053ad" },
      { name: "primary-10", variable: "--color-inz-primary-10", hex: "#003e80" },
    ],
  },
  {
    name: "Greyscale",
    colors: [
      { name: "greyscale-100", variable: "--color-inz-greyscale-100", hex: "#ffffff" },
      { name: "greyscale-95", variable: "--color-inz-greyscale-95", hex: "#f9f9f9" },
      { name: "greyscale-90", variable: "--color-inz-greyscale-90", hex: "#f1f2f3" },
      { name: "greyscale-80", variable: "--color-inz-greyscale-80", hex: "#e4e6e7" },
      { name: "greyscale-70", variable: "--color-inz-greyscale-70", hex: "#d3d6d8" },
      { name: "greyscale-60", variable: "--color-inz-greyscale-60", hex: "#aeb4b7" },
      { name: "greyscale-50", variable: "--color-inz-greyscale-50", hex: "#959a9d" },
      { name: "greyscale-40", variable: "--color-inz-greyscale-40", hex: "#6f7476" },
      { name: "greyscale-30", variable: "--color-inz-greyscale-30", hex: "#57585c" },
      { name: "greyscale-20", variable: "--color-inz-greyscale-20", hex: "#3e4041" },
      { name: "greyscale-10", variable: "--color-inz-greyscale-10", hex: "#202020" },
    ],
  },
  {
    name: "Cool Grey",
    colors: [
      { name: "coolgrey-100", variable: "--color-inz-coolgrey-100", hex: "#ffffff" },
      { name: "coolgrey-95", variable: "--color-inz-coolgrey-95", hex: "#f9fbfe" },
      { name: "coolgrey-90", variable: "--color-inz-coolgrey-90", hex: "#f5f9fd" },
      { name: "coolgrey-85", variable: "--color-inz-coolgrey-85", hex: "#eff3f6" },
      { name: "coolgrey-80", variable: "--color-inz-coolgrey-80", hex: "#e8ecf2" },
      { name: "coolgrey-70", variable: "--color-inz-coolgrey-70", hex: "#cdd2dc" },
      { name: "coolgrey-60", variable: "--color-inz-coolgrey-60", hex: "#b9bfc6" },
      { name: "coolgrey-50", variable: "--color-inz-coolgrey-50", hex: "#929ba4" },
      { name: "coolgrey-40", variable: "--color-inz-coolgrey-40", hex: "#576375" },
      { name: "coolgrey-30", variable: "--color-inz-coolgrey-30", hex: "#3f4c5f" },
      { name: "coolgrey-20", variable: "--color-inz-coolgrey-20", hex: "#303a48" },
      { name: "coolgrey-10", variable: "--color-inz-coolgrey-10", hex: "#21203b" },
    ],
  },
  {
    name: "Red",
    colors: [
      { name: "red-95", variable: "--color-inz-red-95", hex: "#fff3f3" },
      { name: "red-90", variable: "--color-inz-red-90", hex: "#ffe8e8" },
      { name: "red-80", variable: "--color-inz-red-80", hex: "#ffd4d3" },
      { name: "red-70", variable: "--color-inz-red-70", hex: "#ffb8b8" },
      { name: "red-60", variable: "--color-inz-red-60", hex: "#ff918a" },
      { name: "red-50", variable: "--color-inz-red-50", hex: "#ff5a4f" },
      { name: "red-40", variable: "--color-inz-red-40", hex: "#ff3737" },
      { name: "red-30", variable: "--color-inz-red-30", hex: "#e50101" },
      { name: "red-20", variable: "--color-inz-red-20", hex: "#c30303" },
    ],
  },
  {
    name: "Yellow",
    colors: [
      { name: "yellow-95", variable: "--color-inz-yellow-95", hex: "#fff9e2" },
      { name: "yellow-90", variable: "--color-inz-yellow-90", hex: "#fff5c5" },
      { name: "yellow-80", variable: "--color-inz-yellow-80", hex: "#ffeb99" },
      { name: "yellow-70", variable: "--color-inz-yellow-70", hex: "#ffe066" },
      { name: "yellow-60", variable: "--color-inz-yellow-60", hex: "#ffd426" },
      { name: "yellow-50", variable: "--color-inz-yellow-50", hex: "#ffcc00" },
      { name: "yellow-40", variable: "--color-inz-yellow-40", hex: "#ffa940" },
      { name: "yellow-30", variable: "--color-inz-yellow-30", hex: "#fa8c16" },
      { name: "yellow-20", variable: "--color-inz-yellow-20", hex: "#e98714" },
    ],
  },
  {
    name: "Green",
    colors: [
      { name: "green-95", variable: "--color-inz-green-95", hex: "#f1fbf8" },
      { name: "green-90", variable: "--color-inz-green-90", hex: "#e4f7f1" },
      { name: "green-80", variable: "--color-inz-green-80", hex: "#c3efe7" },
      { name: "green-70", variable: "--color-inz-green-70", hex: "#9ee6d8" },
      { name: "green-60", variable: "--color-inz-green-60", hex: "#74dcc9" },
      { name: "green-50", variable: "--color-inz-green-50", hex: "#3ccfb8" },
      { name: "green-40", variable: "--color-inz-green-40", hex: "#00a46e" },
      { name: "green-30", variable: "--color-inz-green-30", hex: "#1b6e53" },
      { name: "green-20", variable: "--color-inz-green-20", hex: "#0b6b83" },
    ],
  },
  {
    name: "Purple",
    colors: [
      { name: "purple-95", variable: "--color-inz-purple-95", hex: "#f6f4ff" },
      { name: "purple-90", variable: "--color-inz-purple-90", hex: "#ebe7fe" },
      { name: "purple-70", variable: "--color-inz-purple-70", hex: "#bbadfb" },
      { name: "purple-50", variable: "--color-inz-purple-50", hex: "#927bff" },
      { name: "purple-30", variable: "--color-inz-purple-30", hex: "#7056ec" },
      { name: "purple-20", variable: "--color-inz-purple-20", hex: "#5942c8" },
      { name: "purple-10", variable: "--color-inz-purple-10", hex: "#433196" },
    ],
  },
];

const aliasTokens: ColorSwatch[] = [
  { name: "text-title", variable: "--color-inz-text-title", hex: "coolgrey-20" },
  { name: "text-body", variable: "--color-inz-text-body", hex: "greyscale-10" },
  { name: "text-subbody", variable: "--color-inz-text-subbody", hex: "coolgrey-20" },
  { name: "text-helper", variable: "--color-inz-text-helper", hex: "coolgrey-40" },
  { name: "text-caption", variable: "--color-inz-text-caption", hex: "coolgrey-50" },
  { name: "status-danger", variable: "--color-inz-status-danger", hex: "red-50" },
  { name: "status-warning", variable: "--color-inz-status-warning", hex: "yellow-50" },
  { name: "status-process", variable: "--color-inz-status-process", hex: "green-50" },
  { name: "status-success", variable: "--color-inz-status-success", hex: "primary-50" },
  { name: "background-admin", variable: "--color-inz-background-admin", hex: "greyscale-95" },
  { name: "background-user", variable: "--color-inz-background-user", hex: "coolgrey-95" },
  { name: "background-container", variable: "--color-inz-background-container", hex: "greyscale-100" },
  { name: "background-layer", variable: "--color-inz-background-layer", hex: "coolgrey-80" },
  { name: "line-border", variable: "--color-inz-line-border", hex: "coolgrey-70" },
  { name: "line-container", variable: "--color-inz-line-container", hex: "greyscale-80" },
  { name: "line-table", variable: "--color-inz-line-table", hex: "coolgrey-80" },
  { name: "disable-fill", variable: "--color-inz-disable-fill", hex: "greyscale-80" },
  { name: "disable-text", variable: "--color-inz-disable-text", hex: "greyscale-50" },
  { name: "overlay", variable: "--color-inz-overlay", hex: "#00000033" },
  { name: "nav", variable: "--color-inz-nav", hex: "#212d3b" },
];

/** colorFamilies 전체를 name→hex로 flat하게 매핑 */
const colorMap = new Map<string, string>();
for (const family of colorFamilies) {
  for (const color of family.colors) {
    colorMap.set(color.name, color.hex);
  }
}

/** alias token의 참조명(예: "coolgrey-20")을 실제 hex로 변환 */
function resolveAliasHex(ref: string): string {
  if (ref.startsWith("#")) return ref;
  return colorMap.get(ref) ?? ref;
}

const ColorsTab = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const makeCopyKey = (variable: string, format: string) =>
    `${variable}:${format}`;

  const CopyCell = ({ copyKey, value }: { copyKey: string; value: string }) => {
    const isCopied = copiedKey === copyKey;
    return (
      <td
        className="px-6 py-4 cursor-pointer group"
        onClick={() => handleCopy(copyKey, value)}
      >
        {isCopied ? (
          <CheckIcon size={14} color="var(--color-inz-status-process)" />
        ) : (
          <code className="rounded bg-inz-coolgrey-95 px-1.5 py-0.5 text-xs font-mono text-inz-primary-40 group-hover:bg-inz-coolgrey-85">
            {value}
          </code>
        )}
      </td>
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="heading2 text-inz-text-title mb-2">Color Tokens</h2>
        <p className="body4 text-inz-text-helper">
          각 값 셀을 클릭하면 해당 형식의 값이 클립보드에 복사됩니다.
        </p>
      </div>

      {colorFamilies.map((family) => (
        <div key={family.name}>
          <h3 className="title1 text-inz-text-title mb-4">{family.name}</h3>
          <div className="overflow-x-auto rounded-lg border border-inz-line-container bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-inz-line-container bg-inz-coolgrey-95">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-20">Preview</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">Variable</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">HEX</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">OKLCH</th>
                </tr>
              </thead>
              <tbody>
                {family.colors.map((color) => {
                  const varValue = `var(${color.variable})`;
                  const oklchValue = hexToOklch(color.hex);

                  return (
                    <tr
                      key={color.variable}
                      className="border-b border-inz-line-container last:border-b-0 hover:bg-inz-coolgrey-95/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div
                          className="h-8 w-8 rounded-md border border-inz-line-container"
                          style={{ backgroundColor: `var(${color.variable})` }}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-inz-text-title font-medium">
                        {color.name}
                      </td>
                      <CopyCell
                        copyKey={makeCopyKey(color.variable, "var")}
                        value={varValue}
                      />
                      <CopyCell
                        copyKey={makeCopyKey(color.variable, "hex")}
                        value={color.hex}
                      />
                      <CopyCell
                        copyKey={makeCopyKey(color.variable, "oklch")}
                        value={oklchValue}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div>
        <h3 className="title1 text-inz-text-title mb-4">
          Semantic Alias Tokens
        </h3>
        <div className="overflow-x-auto rounded-lg border border-inz-line-container bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-inz-line-container bg-inz-coolgrey-95">
                <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title w-20">Preview</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">Reference</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">Variable</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">HEX</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-inz-text-title">OKLCH</th>
              </tr>
            </thead>
            <tbody>
              {aliasTokens.map((token) => {
                const resolvedHex = resolveAliasHex(token.hex);
                const varValue = `var(${token.variable})`;
                const oklchValue = resolvedHex.startsWith("#")
                  ? hexToOklch(resolvedHex)
                  : resolvedHex;

                return (
                  <tr
                    key={token.variable}
                    className="border-b border-inz-line-container last:border-b-0 hover:bg-inz-coolgrey-95/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div
                        className="h-8 w-8 rounded-md border border-inz-line-container"
                        style={{ backgroundColor: `var(${token.variable})` }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-inz-text-title font-medium">
                      {token.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-inz-text-caption">
                      {token.hex}
                    </td>
                    <CopyCell
                      copyKey={makeCopyKey(token.variable, "var")}
                      value={varValue}
                    />
                    <CopyCell
                      copyKey={makeCopyKey(token.variable, "hex")}
                      value={resolvedHex}
                    />
                    <CopyCell
                      copyKey={makeCopyKey(token.variable, "oklch")}
                      value={oklchValue}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ColorsTab;
