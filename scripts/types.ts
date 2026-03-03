export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
  required: boolean;
}

export interface ComponentInfo {
  name: string;
  path: string;
  description: string;
  props: PropItem[];
}

export interface ExtractedData {
  version: string;
  extractedAt: string;
  components: ComponentInfo[];
}
