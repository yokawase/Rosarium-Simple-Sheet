import React, { useState, useEffect, useRef } from 'react';
import { X, Pencil, Trash2, Camera, Upload, Settings, Save, Check } from 'lucide-react';
import { Rose, BrandData, CareType, CareEvent, AppSettings, FontSize } from '../types';
import { BRAND_MASTER, CARE_TYPES } from '../constants';

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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        brand: '',
        name: '',
        acquisitionDate: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.brand) {
      onSubmit({
        id: initialData?.id || Math.random().toString(36).substr(2, 9),
        name: formData.name,
        brand: formData.brand,
        year: formData.year,
        acquisitionDate: formData.acquisitionDate,
        description: formData.description
      });
      onClose();
    }
  };

  const selectedBrandData = formData.brand ? BRAND_MASTER[formData.brand] : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "バラ情報の編集" : "新しいバラをお迎え"}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">ブランド / 作出者</label>
          <select 
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-base bg-white text-gray-900"
            value={formData.brand || ''}
            onChange={e => {
                setFormData({...formData, brand: e.target.value, name: ''}); // Clear name when brand changes
            }}
            required
          >
            <option value="">-- 選択してください --</option>
            {Object.entries(BRAND_MASTER).map(([key, data]) => (
              <option key={key} value={key}>{data.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold opacity-70 uppercase tracking-wider mb-1">品種名</label>
          <div className="relative">
            <input 
                type="text" 
                list="variety-suggestions"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-base text-gray-900"
                value={formData.name || ''}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder={selectedBrandData ? "リストから選択または入力" : "ブランドを先に選択してください"}
                required
            />
             <datalist id="variety-suggestions">
                {selectedBrandData?.varieties.map(v => (
                <option key={v} value={v} />
                ))}
            </datalist>
          </div>
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
  onDeleteEvent: (eventId: string) => void;
}

export const CareModal: React.FC<CareModalProps> = ({ 
  isOpen, onClose, year, month, rose, existingEvents, onAddEvent, onDeleteEvent 
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Photo States
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  // Reset when modal opens/closes or type changes
  useEffect(() => {
    if(isOpen) {
        setIsEditMode(false);
        setBeforeImage(null);
        setAfterImage(null);
    }
  }, [isOpen]);

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

  const handleAdd = () => {
    if (selectedType && rose) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      const eventPayload: CareEvent = {
        id: Math.random().toString(36).substr(2, 9),
        roseId: rose.id,
        date: dateStr,
        typeId: selectedType as any
      };

      // Add images if pruning
      if (selectedType === 'pruning' && (beforeImage || afterImage)) {
          eventPayload.images = {
              before: beforeImage || undefined,
              after: afterImage || undefined
          };
      }

      onAddEvent(eventPayload);
      
      // Reset
      setSelectedType(null);
      setBeforeImage(null);
      setAfterImage(null);
    }
  };

  if (!rose) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="お世話の記録">
      <div className="text-center mb-6">
        <h4 className="text-2xl font-serif text-gray-900 italic">{rose.name}</h4>
        <p className="text-sm opacity-60 tracking-widest uppercase mt-1">{year}年 {month}月</p>
      </div>

      {/* Add New Section */}
      <div className="bg-[#FDFBF7] p-4 rounded-lg border border-green-100/50 mb-6 shadow-sm">
        <label className="block text-xs font-bold opacity-50 uppercase mb-3 text-center">新規記録</label>
        
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
             {/* Use first char for simplicity in buttons */}
             <span className="text-[10px] font-bold">{type.label[0]}</span>
            </button>
          ))}
        </div>
        
        <div className="text-center text-xs h-4 mb-3 text-green-700 font-bold">
            {selectedType ? CARE_TYPES.find(t => t.id === selectedType)?.label : '作業を選択してください'}
        </div>

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

        <button 
          onClick={handleAdd}
          disabled={!selectedType}
          className="w-full py-2.5 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          記録する
        </button>
      </div>

      {/* Existing Records */}
      <div>
        <div className="flex justify-between items-end mb-2 border-b border-gray-100 pb-1">
            <label className="block text-xs font-bold opacity-50 uppercase">履歴</label>
            <button 
                onClick={() => setIsEditMode(!isEditMode)}
                className={`p-1.5 rounded-full transition-colors ${isEditMode ? 'bg-green-100 text-green-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                title="編集・削除"
            >
                <Pencil size={14} />
            </button>
        </div>
        
        <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {existingEvents.length === 0 && <p className="text-center text-gray-300 text-sm italic py-4">まだ記録はありません</p>}
          {existingEvents.sort((a,b) => parseInt(b.date.split('-')[2]) - parseInt(a.date.split('-')[2])).map(ev => {
             const type = CARE_TYPES.find(t => t.id === ev.typeId);
             const dayStr = ev.date.split('-')[2];
             const hasPhotos = ev.images && (ev.images.before || ev.images.after);

             return (
               <div key={ev.id} className="flex justify-between items-center p-2.5 bg-white border border-gray-100 rounded-md hover:border-green-200 transition-colors group shadow-sm">
                 <div className="flex items-center space-x-3">
                   <span className="font-serif font-bold opacity-60 w-6 text-right text-lg">{dayStr}</span>
                   <div className={`w-2 h-2 rounded-full ${type?.bgColor}`}></div>
                   <span className="text-sm font-medium">{type?.label}</span>
                   {hasPhotos && <Camera size={14} className="opacity-40" />}
                 </div>
                 
                 {isEditMode && (
                     <button 
                      onClick={() => onDeleteEvent(ev.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
                      title="削除"
                     >
                       <Trash2 size={16} />
                     </button>
                 )}
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