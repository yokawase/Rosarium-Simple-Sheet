
export type CareTypeId = 'pruning' | 'repot' | 'liquid' | 'solid' | 'vital' | 'pest' | 'blooming';

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

export interface CareEvent {
  id: string;
  roseId: string;
  date: string; // ISO Date YYYY-MM-DD
  typeId: CareTypeId;
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
export type ViewMode = 'sheet' | 'dashboard' | 'album';

// App Settings
export type FontSize = 'normal' | 'large' | 'xl';

export interface AppSettings {
  fontSize: FontSize;
  highContrast: boolean; // True = Black text, False = Default design
}
