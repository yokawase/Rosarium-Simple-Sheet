import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Pencil, Trash2, Camera, Upload, Settings, Save, Check, Search, ChevronDown, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Rose, BrandData, CareType, CareEvent, AppSettings, FontSize, RoseDefinition, ProductDefinition, SoilMixComponent, PotChangeDetail } from '../types';
import { BRAND_MASTER, CARE_TYPES, ROSE_LIBRARY, PRODUCT_LIBRARY, SOIL_LIBRARY } from '../constants';

// --- Icon Helper ---
const IconComponent = ({ name, className, color, size = 16 }: { name: string, className?: string, color?: string, size?: number }) => {
    const Icon = (Icons as any)[name] || Icons.HelpCircle;
    return <Icon className={className} size={size} stroke={color} strokeWidth={2} />;
};

// --- Reusable Modal Wrapper ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up border border-white/50 max-h-[90vh] overflow-y-auto flex flex-col">
        {title && (
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#FDFBF7] sticky top-0 z-10 shrink-0">
            <h3 className="text-xl font-serif italic text-green-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
        )}
        {!title && (
             <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
        )}
        <div className="p-6 bg-white overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Settings Modal ---
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  
  const handleFontSizeChange = (size: FontSize) => {
    onUpdateSettings({ ...settings, fontSize: size });
  };

  const toggleContrast = () => {
    onUpdateSettings({ ...settings, highContrast: !settings.highContrast });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="表示設定">
      <div className="space-y-8">
        
        {/* Font Size */}
        <div>
          <label className="block text-sm font-bold opacity-70 uppercase tracking-wider mb-3">文字サイズ</label>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => handleFontSizeChange('normal')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${settings.fontSize === 'normal' ? 'bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="text-base font-serif">A</span>
              <span className="text-[10px] mt-1">普通</span>
            </button>
            <button 
              onClick={() => handleFontSizeChange('large')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${settings.fontSize === 'large' ? 'bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="text-xl font-serif">A</span>
              <span className="text-[10px] mt-1">大</span>
            </button>
            <button 
              onClick={() => handleFontSizeChange('xl')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${settings.fontSize === 'xl' ? 'bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="text-3xl font-serif">A</span>
              <span className="text-[10px] mt-1">特大</span>
            </button>
          </div>
        </div>

        {/* Color / Contrast */}
        <div>
           <label className="block text-sm font-bold opacity-70 uppercase tracking-wider mb-3">文字色モード</label>
           <div 
             onClick={toggleContrast}
             className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${settings.highContrast ? 'bg-gray-50 border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}
           >
             <div>
               <div className="font-bold">くっきりブラック</div>
               <div className="text-xs opacity-70 mt-1">文字色を「黒」に統一し、視認性を高めます</div>
             </div>
             <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.highContrast ? 'bg-black' : 'bg-gray-300'}`}>
               <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${settings.highContrast ? 'translate-x-6' : ''}`} />
             </div>
           </div>
        </div>

        {/* Explicit Save Button */}
        <div className="pt-6 border-t border-gray-100">
           <button 
             onClick={onClose}
             className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center justify-center space-x-2 transition-colors shadow-md"
           >
             <Save size={18} />
             <span className="font-bold">設定を保存する</span>
           </button>
        </div>

      </div>
    </Modal>
  );
};

// --- Rose Form Modal ---
interface RoseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rose: Rose) => void;
  onDelete?: (id: string) => void;
  initialData?: Rose | null;
}

export const RoseFormModal: React.FC<RoseFormModalProps> = ({ isOpen, onClose, onSubmit, onDelete, initialData }) => {
  const [formData, setFormData] = useState<Partial<Rose>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // Sort Library by Kana
  const sortedLibrary = useMemo(() => {
    return [...ROSE_LIBRARY].sort((a, b) => a.kana.localeCompare(b.kana, 'ja'));
  }, []);

  const [filteredRoses, setFilteredRoses] = useState<RoseDefinition[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setNameInput(initialData.name || '');
    } else {
      setFormData({
        brand: '',
        name: '',
        acquisitionDate: new Date().toISOString().split('T')[0],
        description: ''
      });
      setNameInput('');
    }
    setFilteredRoses(sortedLibrary);
  }, [initialData, isOpen, sortedLibrary]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNameInput(val);
    setFormData(prev => ({ ...prev, name: val }));
    setShowSuggestions(true);

    if (val.trim() === '') {
      setFilteredRoses(sortedLibrary);
    } else {
      const lower = val.toLowerCase();
      setFilteredRoses(sortedLibrary.filter(r => 
        r.name.toLowerCase().includes(lower) || r.kana.includes(lower)
      ));
    }
  };

  const selectRoseFromLibrary = (def: RoseDefinition) => {
    setFormData(prev => ({
      ...prev,
      name: def.name,
      brand: def.brand,
      year: def.year,
      description: def.description
    }));
    setNameInput(def.name);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      onSubmit({
        id: initialData?.id || Math.random().toString(36).substr(2, 9),
        name: formData.name,
        brand: formData.brand || 'Unknown',
        year: formData.year,
        acquisitionDate: formData.acquisitionDate,
        description: formData.description
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "バラ情報の編集" : "新しいバラをお迎え"}>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name Input with Autocomplete */}
        <div className="relative">
            <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">品種名</label>
            <div className="relative">
                <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-lg font-serif text-gray-900"
                    value={nameInput}
                    onChange={handleNameChange}
                    onFocus={() => setShowSuggestions(true)}
                    // Delay blur to allow click on suggestion
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="品種名を入力 (例: ぴえーる...)"
                    required
                    autoComplete="off"
                />
                <div className="absolute right-3 top-3.5 text-gray-400">
                    <Search size={18} />
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {filteredRoses.length === 0 ? (
                         <div className="p-3 text-sm text-gray-400 text-center">見つかりません（手動で入力可能）</div>
                    ) : (
                        filteredRoses.map((rose, idx) => (
                            <div 
                                key={idx}
                                className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-50 last:border-0"
                                onClick={() => selectRoseFromLibrary(rose)}
                            >
                                <div className="font-medium text-gray-800">{rose.name}</div>
                                <div className="text-xs text-gray-500 flex justify-between mt-0.5">
                                    <span>{rose.brand}</span>
                                    <span>{rose.year}年</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>

        <div>
          <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">ブランド / 作出者</label>
          <select 
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-base bg-white text-gray-900"
            value={formData.brand || ''}
            onChange={e => setFormData({...formData, brand: e.target.value})}
            required
          >
            <option value="">-- 選択してください (自動入力可) --</option>
            {Object.entries(BRAND_MASTER).map(([key, data]) => (
              <option key={key} value={key}>{data.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">お迎え日</label>
            <input 
              type="date" 
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-green-500 outline-none text-base text-gray-900"
              value={formData.acquisitionDate || ''}
              onChange={e => setFormData({...formData, acquisitionDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">作出年 (Year)</label>
             <input 
              type="number" 
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-green-500 outline-none text-base text-gray-900"
              value={formData.year || ''}
              onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              placeholder="1985"
            />
          </div>
        </div>

         <div>
          <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">特徴・メモ</label>
          <textarea 
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-green-500 outline-none text-base h-24 resize-none text-gray-900"
            value={formData.description || ''}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="花の特徴、香り、耐病性など..."
          />
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-gray-100 mt-4">
            {initialData && onDelete ? (
                 <button 
                 type="button" 
                 onClick={() => { onDelete(initialData.id); onClose(); }}
                 className="text-red-400 hover:text-red-600 text-sm font-bold flex items-center space-x-1"
               >
                 <Trash2 size={14} />
                 <span>このバラを削除</span>
               </button>
            ) : <div />}
         
          <div className="flex space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 opacity-70 hover:bg-gray-100 rounded-md text-sm transition-colors">
                キャンセル
            </button>
            <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-md shadow-sm hover:bg-green-800 text-sm font-bold transition-colors">
                保存する
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};


// --- Care Event Modal ---
interface CareModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  rose: Rose | null;
  existingEvents: CareEvent[];
  onAddEvent: (event: CareEvent) => void;
  onUpdateEvent: (event: CareEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

export const CareModal: React.FC<CareModalProps> = ({ 
  isOpen, onClose, year, month, rose, existingEvents, onAddEvent, onUpdateEvent, onDeleteEvent 
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  
  const [day, setDay] = useState<number>(new Date().getDate());
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Photo States
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  // New States for Soil and Pot
  const [soilMix, setSoilMix] = useState<SoilMixComponent[]>([]);
  const [potChange, setPotChange] = useState<PotChangeDetail>({ mode: 'same', fromSize: 8, toSize: 8 });

  const inputRef = useRef<HTMLDivElement>(null);

  // Reset when modal opens/closes
  useEffect(() => {
    if(isOpen) {
        resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setEditingId(null);
    setBeforeImage(null);
    setAfterImage(null);
    setSelectedProductId("");
    setSelectedType(null);
    setSoilMix([]);
    setPotChange({ mode: 'same', fromSize: 8, toSize: 8 });
    setDay(new Date().getDate());
  };

  // Reset details when type changes (unless editing)
  useEffect(() => {
      if (!editingId && selectedType) {
        setSelectedProductId("");
        setSoilMix([]);
      }
  }, [selectedType]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isBefore: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isBefore) setBeforeImage(reader.result as string);
        else setAfterImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Soil Logic
  const handleAddSoil = (soilId: string) => {
      setSoilMix(prev => {
          if (prev.find(s => s.soilId === soilId)) return prev;
          return [...prev, { soilId, value: 1 }];
      });
  };

  const handleSoilValueChange = (soilId: string, newVal: number) => {
      setSoilMix(prev => prev.map(s => s.soilId === soilId ? { ...s, value: Math.max(0, newVal) } : s));
  };

  const removeSoil = (soilId: string) => {
      setSoilMix(prev => prev.filter(s => s.soilId !== soilId));
  };

  const soilTotal = useMemo(() => soilMix.reduce((sum, s) => sum + s.value, 0), [soilMix]);

  // Handle Edit Click
  const handleEditClick = (ev: CareEvent) => {
      setEditingId(ev.id);
      setSelectedType(ev.typeId);
      setDay(parseInt(ev.date.split('-')[2]));
      setSelectedProductId(ev.productId || "");
      setSoilMix(ev.soilMix || []);
      setPotChange(ev.potChange || { mode: 'same', fromSize: 8, toSize: 8 });
      setBeforeImage(ev.images?.before || null);
      setAfterImage(ev.images?.after || null);
      
      // Scroll to top
      if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleCancelEdit = () => {
      resetForm();
  };

  // Handle Save (Add or Update)
  const handleSave = () => {
    if (selectedType && rose) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      const eventPayload: CareEvent = {
        id: editingId || Math.random().toString(36).substr(2, 9),
        roseId: rose.id,
        date: dateStr,
        typeId: selectedType as any,
        productId: selectedProductId || undefined,
        soilMix: (selectedType === 'soil' && soilMix.length > 0) ? soilMix : undefined,
        potChange: selectedType === 'repot' ? potChange : undefined,
      };

      // Add images if pruning
      if (selectedType === 'pruning' && (beforeImage || afterImage)) {
          eventPayload.images = {
              before: beforeImage || undefined,
              after: afterImage || undefined
          };
      }

      if (editingId) {
          onUpdateEvent(eventPayload);
      } else {
          onAddEvent(eventPayload);
      }
      
      resetForm();
    }
  };

  // Filter products for the selected category
  const availableProducts = useMemo(() => {
      if (!selectedType) return [];
      return Object.values(PRODUCT_LIBRARY).filter(p => p.typeId === selectedType);
  }, [selectedType]);

  if (!rose) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="お世話の記録">
      <div className="text-center mb-6">
        <h4 className="text-2xl font-serif text-gray-900 italic">{rose.name}</h4>
        <p className="text-sm opacity-60 tracking-widest uppercase mt-1">{year}年 {month}月</p>
      </div>

      {/* Input Section */}
      <div ref={inputRef} className={`p-4 rounded-lg border mb-6 shadow-sm transition-colors ${editingId ? 'bg-orange-50 border-orange-200' : 'bg-[#FDFBF7] border-green-100/50'}`}>
        <div className="flex justify-between items-center mb-3">
             <label className={`block text-xs font-bold uppercase ${editingId ? 'text-orange-600' : 'opacity-50'}`}>
                {editingId ? '記録を編集' : '新規記録'}
             </label>
             {editingId && (
                 <button onClick={handleCancelEdit} className="text-xs text-gray-400 hover:text-gray-600 underline">
                     キャンセル
                 </button>
             )}
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="opacity-70 text-sm font-serif">{month}月</span>
            <input 
                type="number" 
                min="1" max="31"
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-16 p-2 text-center border border-gray-300 rounded focus:border-green-500 outline-none font-serif text-lg bg-white text-gray-900"
            />
            <span className="opacity-70 text-sm">日</span>
        </div>

        {/* 1. Select Care Type */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {CARE_TYPES.map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                selectedType === type.id 
                  ? `${type.bgColor} text-white ring-2 ring-offset-2 ring-green-600 scale-110 shadow-md` 
                  : `${type.bgColor} text-white opacity-40 hover:opacity-80`
              }`}
              title={type.label}
            >
             <IconComponent name={type.iconName} size={14} color="white" />
            </button>
          ))}
        </div>
        
        <div className="text-center text-xs h-4 mb-4 text-green-700 font-bold">
            {selectedType ? CARE_TYPES.find(t => t.id === selectedType)?.label : '作業を選択してください'}
        </div>

        {/* --- Pot Change UI (When 'repot' is selected) --- */}
        {selectedType === 'repot' && (
            <div className="mb-4 animate-fade-in space-y-4">
                <div className="flex justify-center gap-2">
                    <button 
                        onClick={() => setPotChange({ ...potChange, mode: 'up' })}
                        className={`px-3 py-2 rounded-md text-xs font-bold flex items-center gap-1 transition-colors ${potChange.mode === 'up' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-white border border-gray-200 text-gray-500'}`}
                    >
                        <TrendingUp size={14} /> 鉢増し
                    </button>
                    <button 
                         onClick={() => setPotChange({ ...potChange, mode: 'same' })}
                         className={`px-3 py-2 rounded-md text-xs font-bold flex items-center gap-1 transition-colors ${potChange.mode === 'same' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white border border-gray-200 text-gray-500'}`}
                    >
                        <Minus size={14} /> 維持
                    </button>
                    <button 
                         onClick={() => setPotChange({ ...potChange, mode: 'down' })}
                         className={`px-3 py-2 rounded-md text-xs font-bold flex items-center gap-1 transition-colors ${potChange.mode === 'down' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-white border border-gray-200 text-gray-500'}`}
                    >
                        <TrendingDown size={14} /> 鉢下げ
                    </button>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center">
                        <label className="text-[10px] text-gray-400 mb-1">From</label>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                className="w-12 p-1 text-center border border-gray-300 rounded text-sm"
                                value={potChange.fromSize}
                                onChange={(e) => setPotChange({...potChange, fromSize: parseInt(e.target.value)})}
                            />
                            <span className="text-xs ml-1">号</span>
                        </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 mt-4" />
                    <div className="flex flex-col items-center">
                        <label className="text-[10px] text-gray-400 mb-1">To</label>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                className="w-12 p-1 text-center border border-gray-300 rounded text-sm"
                                value={potChange.toSize}
                                onChange={(e) => setPotChange({...potChange, toSize: parseInt(e.target.value)})}
                            />
                             <span className="text-xs ml-1">号</span>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- Soil Mix UI (When 'soil' is selected) --- */}
        {selectedType === 'soil' && (
            <div className="mb-4 animate-fade-in">
                 <label className="block text-[10px] font-bold opacity-50 uppercase text-center mb-2">使用した用土（複数選択可）</label>
                 
                 {/* Soil Selector */}
                 <div className="flex flex-wrap gap-2 justify-center mb-4">
                     {SOIL_LIBRARY.map(soil => (
                         <button
                            key={soil.id}
                            onClick={() => handleAddSoil(soil.id)}
                            className="text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition-colors"
                         >
                             {soil.name}
                         </button>
                     ))}
                 </div>

                 {/* Mixed List */}
                 {soilMix.length > 0 && (
                     <div className="bg-white rounded-md border border-gray-200 p-3 space-y-2">
                         {soilMix.map((comp) => {
                             const def = SOIL_LIBRARY.find(s => s.id === comp.soilId);
                             const percent = soilTotal > 0 ? Math.round((comp.value / soilTotal) * 100) : 0;
                             
                             return (
                                 <div key={comp.soilId} className="flex items-center gap-2">
                                     <span className="flex-1 text-sm font-medium text-gray-700">{def?.name}</span>
                                     <div className="flex items-center gap-1">
                                         <input 
                                            type="number"
                                            min="0"
                                            value={comp.value}
                                            onChange={(e) => handleSoilValueChange(comp.soilId, parseFloat(e.target.value))}
                                            className="w-12 p-1 text-right border border-gray-300 rounded text-sm"
                                         />
                                         <span className="text-xs text-gray-400 w-8">part</span>
                                     </div>
                                     <div className="w-10 text-right text-xs font-bold text-amber-600">{percent}%</div>
                                     <button onClick={() => removeSoil(comp.soilId)} className="text-gray-300 hover:text-red-400">
                                         <X size={14} />
                                     </button>
                                 </div>
                             )
                         })}
                         <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                             <span className="text-xs text-gray-400">Total: {soilTotal} parts</span>
                         </div>
                     </div>
                 )}
            </div>
        )}

        {/* 2. Select Product (If available for type) */}
        {availableProducts.length > 0 && (
            <div className="mb-4 animate-fade-in">
                <label className="block text-[10px] font-bold opacity-50 uppercase text-center mb-2">使用した薬剤・肥料</label>
                <div className="grid grid-cols-1 gap-2">
                    {availableProducts.map(prod => (
                        <button
                            key={prod.id}
                            type="button"
                            onClick={() => setSelectedProductId(prod.id === selectedProductId ? "" : prod.id)}
                            className={`p-2 rounded-md border text-left text-sm flex items-center transition-all ${
                                selectedProductId === prod.id
                                    ? 'bg-white border-green-500 ring-1 ring-green-500 text-green-800 shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                            }`}
                        >
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: prod.color }}></div>
                            <div className="flex-1">
                                <div className="font-bold">{prod.name}</div>
                                <div className="text-[10px] opacity-60 truncate">{prod.maker}</div>
                            </div>
                            {selectedProductId === prod.id && <Check size={14} className="text-green-600" />}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* --- Pruning Photo Upload UI --- */}
        {selectedType === 'pruning' && (
            <div className="mb-4 grid grid-cols-2 gap-3 animate-fade-in">
                {/* Before Photo */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-bold opacity-50 uppercase text-center">Before</label>
                    <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden bg-white">
                        {beforeImage ? (
                            <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Camera className="text-gray-400 mb-1" size={20} />
                                <span className="text-[9px] text-gray-400">撮影/選択</span>
                            </>
                        )}
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleImageUpload(e, true)} />
                    </label>
                </div>
                {/* After Photo */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-bold opacity-50 uppercase text-center">After</label>
                    <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden bg-white">
                        {afterImage ? (
                            <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Camera className="text-gray-400 mb-1" size={20} />
                                <span className="text-[9px] text-gray-400">撮影/選択</span>
                            </>
                        )}
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
                    </label>
                </div>
            </div>
        )}

        <div className="flex gap-2">
            <button 
                onClick={handleSave}
                disabled={!selectedType}
                className={`flex-1 py-2.5 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm transition-all shadow-sm active:scale-95 ${editingId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-700 hover:bg-green-800'}`}
            >
                {editingId ? '更新する' : '記録する'}
            </button>
            {editingId && (
                <button 
                    onClick={() => {
                        if(editingId && window.confirm("この記録を削除しますか？")) {
                            onDeleteEvent(editingId);
                            resetForm();
                        }
                    }}
                    className="px-4 py-2.5 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-md transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
      </div>

      {/* Existing Records */}
      <div>
        <div className="flex justify-between items-end mb-2 border-b border-gray-100 pb-1">
            <label className="block text-xs font-bold opacity-50 uppercase">履歴 (タップして編集)</label>
        </div>
        
        <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {existingEvents.length === 0 && <p className="text-center text-gray-300 text-sm italic py-4">まだ記録はありません</p>}
          {existingEvents.sort((a,b) => parseInt(b.date.split('-')[2]) - parseInt(a.date.split('-')[2])).map(ev => {
             const type = CARE_TYPES.find(t => t.id === ev.typeId);
             const prod = ev.productId ? PRODUCT_LIBRARY[ev.productId] : null;
             const dayStr = ev.date.split('-')[2];
             const hasPhotos = ev.images && (ev.images.before || ev.images.after);
             const isBeingEdited = ev.id === editingId;

             // Dynamic color based on product or default type color
             const indicatorColor = prod ? prod.color : (type?.color || '#ccc');

             return (
               <div 
                    key={ev.id} 
                    onClick={() => handleEditClick(ev)}
                    className={`flex justify-between items-center p-2.5 bg-white border rounded-md transition-all group shadow-sm cursor-pointer ${isBeingEdited ? 'border-orange-400 ring-1 ring-orange-400 bg-orange-50' : 'border-gray-100 hover:border-green-300 hover:shadow-md'}`}
               >
                 <div className="flex items-center space-x-3 flex-1">
                   {/* Date Stamp Preview in List */}
                   <div className="flex flex-col items-center justify-center w-8 h-9 rounded bg-white border shadow-sm" style={{ borderColor: indicatorColor }}>
                       <span className="text-[10px] font-bold leading-none mb-0.5" style={{ color: indicatorColor }}>{dayStr}</span>
                       <IconComponent name={type?.iconName || ''} size={14} color={indicatorColor} />
                   </div>

                   <div className="flex flex-col flex-1 pl-2">
                        <span className="text-sm font-medium">{type?.label}</span>
                        {prod && <span className="text-[10px] text-gray-500">{prod.name}</span>}
                        {/* Detail View for Pot Change */}
                        {ev.potChange && (
                            <span className="text-[10px] text-orange-600 flex items-center gap-1">
                                {ev.potChange.mode === 'up' && <TrendingUp size={10} />}
                                {ev.potChange.mode === 'down' && <TrendingDown size={10} />}
                                {ev.potChange.fromSize}号 → {ev.potChange.toSize}号
                            </span>
                        )}
                        {/* Detail View for Soil Mix */}
                        {ev.soilMix && (
                            <span className="text-[10px] text-amber-700 truncate max-w-[120px]">
                                {ev.soilMix.length}種のブレンド
                            </span>
                        )}
                   </div>
                   {hasPhotos && <Camera size={14} className="opacity-40" />}
                 </div>
                 
                 {/* Pencil Icon Indicator */}
                 <div className={`text-gray-400 px-2 ${isBeingEdited ? 'opacity-100 text-orange-500' : 'opacity-0 group-hover:opacity-100'}`}>
                    <Pencil size={14} />
                 </div>
               </div>
             )
          })}
        </div>
      </div>
      
      {/* Close Button at bottom */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <button 
            onClick={onClose} 
            className="w-full py-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
        >
            閉じる
        </button>
      </div>

    </Modal>
  );
};
