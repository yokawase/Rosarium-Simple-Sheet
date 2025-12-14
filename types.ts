
export type CareTypeId = 'pruning' | 'repot' | 'soil' | 'liquid' | 'solid' | 'vital' | 'pest' | 'blooming';

export interface CareType {
  id: CareTypeId;
  label: string;
  color: string;
  bgColor: string;
  iconName: string; // Mapping to Lucide icon
}

export interface BrandData {
  label: string;
  varieties: string[];
}

export interface Rose {
  id: string;
  name: string;
  brand: string;
  year?: number; // Release year
  acquisitionDate?: string;
  description?: string;
}

// --- New Structures for Soil & Pot ---

export interface SoilDefinition {
  id: string;
  name: string;
  maker: string; // New: Manufacturer name
  description?: string; // New: Description of the soil
  category: 'mix' | 'base' | 'organic' | 'adjust'; // mix = Cultivation Soil (Baiyoudo)
}

export interface SoilMixComponent {
  soilId: string;
  value: number; // Part or Liter
}

export interface PotChangeDetail {
  mode: 'up' | 'down' | 'same'; // 鉢増し, 鉢下げ, 維持
  fromSize: number; // 号数
  toSize: number;   // 号数
}

export interface CareEvent {
  id: string;
  roseId: string;
  date: string; // ISO Date YYYY-MM-DD
  typeId: CareTypeId;
  productId?: string; // ID of the specific product used
  
  // New Fields
  soilMix?: SoilMixComponent[]; 
  potChange?: PotChangeDetail;

  note?: string;
  images?: {
    before?: string; // Base64 data string
    after?: string;  // Base64 data string
  };
}

export interface GardenData {
  roses: Rose[];
  events: CareEvent[];
}

// View State
export type ViewMode = 'sheet' | 'dashboard' | 'album' | 'batch';

// App Settings
export type FontSize = 'normal' | 'large' | 'xl';

export interface AppSettings {
  fontSize: FontSize;
  highContrast: boolean; // True = Black text, False = Default design
}

// --- Database Types ---

export interface RoseDefinition {
  name: string;
  brand: string;
  year: number;
  description: string;
  kana: string; // For sorting
}

export interface ProductDefinition {
  id: string;
  name: string;
  maker: string;
  description: string;
  color: string; // Specific hex color for the icon
  typeId: CareTypeId;
}
