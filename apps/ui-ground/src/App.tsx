import { useState } from "react";
import ColorsTab from "./components/tabs/ColorsTab";
import TypographyTab from "./components/tabs/TypographyTab";
import IconsTab from "./components/tabs/IconsTab";
import ComponentsTab from "./components/tabs/ComponentsTab";

type TabKey = "colors" | "typography" | "icons" | "components";

const tabs: { key: TabKey; label: string }[] = [
  { key: "colors", label: "Colors" },
  { key: "typography", label: "Typography" },
  { key: "icons", label: "Icons" },
  { key: "components", label: "Components" },
];

const App = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("colors");

  return (
    <div className="min-h-screen bg-inz-background-admin">
      <header className="sticky top-0 z-50 border-b border-inz-line-container bg-white shadow-sm">
        <div className="mx-auto flex items-center gap-8 px-6 py-3">
          <h1 className="title1 text-inz-text-title whitespace-nowrap">
            inz-ui
          </h1>
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-inz-primary-40 text-white"
                    : "text-inz-text-helper hover:bg-inz-coolgrey-95"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-6">
        {activeTab === "colors" && <ColorsTab />}
        {activeTab === "typography" && <TypographyTab />}
        {activeTab === "icons" && <IconsTab />}
        {activeTab === "components" && <ComponentsTab />}
      </main>
    </div>
  );
};

export default App;
