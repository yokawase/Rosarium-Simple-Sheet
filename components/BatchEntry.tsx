import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Rose, CareEvent, CareTypeId } from '../types';
import { CARE_TYPES, BRAND_MASTER, PRODUCT_LIBRARY, SOIL_LIBRARY } from '../constants';
import * as Icons from 'lucide-react';
import { Check, Calendar, Layers, ArrowRight } from 'lucide-react';

interface BatchEntryProps {
  roses: Rose[];
  onAddBatchEvents: (events: CareEvent[]) => void;
  onComplete: (targetDate?: { year: number, month: number }) => void;
}

// Icon Helper
const IconComponent = ({ name, className, color, size = 16 }: { name: string, className?: string, color?: string, size?: number }) => {
    const Icon = (Icons as any)[name] || Icons.HelpCircle;
    return <Icon className={className} size={size} stroke={color} strokeWidth={2} />;
};

export const BatchEntry: React.FC<BatchEntryProps> = ({ roses, onAddBatchEvents, onComplete }) => {
  // --- Date State ---
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  // --- Care State ---
  const [selectedType, setSelectedType] = useState<CareTypeId | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedSoilId, setSelectedSoilId] = useState<string>(""); // Simple single soil selection for batch

  // --- Rose Selection State ---
  const [selectedRoseIds, setSelectedRoseIds] = useState<Set<string>>(new Set());

  const daysContainerRef = useRef<HTMLDivElement>(null);

  // Calculate days in month
  const daysInMonth = useMemo(() => new Date(year, month, 0).getDate(), [year, month]);
  const daysArray = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

  // Scroll to day on mount
  useEffect(() => {
    if (daysContainerRef.current) {
        setTimeout(() => {
            const selectedButton = daysContainerRef.current?.querySelector(`[data-day="${day}"]`) as HTMLButtonElement;
            if (selectedButton) {
                selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 100);
    }
  }, []);

  // Filter products/soils
  const availableProducts = useMemo(() => {
      if (!selectedType) return [];
      return Object.values(PRODUCT_LIBRARY).filter(p => p.typeId === selectedType);
  }, [selectedType]);

  const toggleRose = (id: string) => {
    const newSet = new Set(selectedRoseIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedRoseIds(newSet);
  };

  const toggleAllRoses = () => {
    if (selectedRoseIds.size === roses.length) {
      setSelectedRoseIds(new Set());
    } else {
      setSelectedRoseIds(new Set(roses.map(r => r.id)));
    }
  };

  const handleSubmit = () => {
    if (!selectedType || selectedRoseIds.size === 0) return;

    // Remove window.confirm to prevent blocking issues on mobile
    // Direct execution ensures smoother UX and reliable state updates
    
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const newEvents: CareEvent[] = [];

    selectedRoseIds.forEach(roseId => {
        const event: CareEvent = {
            id: Math.random().toString(36).substr(2, 9),
            roseId,
            date: dateStr,
            typeId: selectedType,
            productId: selectedProductId || undefined,
            // Simple assumption for batch soil: single component mixed 100% or just noted
            soilMix: (selectedType === 'soil' && selectedSoilId) ? [{ soilId: selectedSoilId, value: 1 }] : undefined,
        };
        newEvents.push(event);
    });

    onAddBatchEvents(newEvents);
    
    // Pass the date back so Sheet can scroll to it
    // Small delay is not necessary here because App will handle the view switch and remount
    onComplete({ year, month }); 
  };

  const selectedTypeInfo = CARE_TYPES.find(t => t.id === selectedType);

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7] animate-fade-in relative">
      
      {/* --- Fixed Header: Date Selection --- */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm flex-none">
          <div className="pt-4 px-6 flex justify-between items-end mb-3">
             <div>
                 <p className="text-xs font-bold opacity-50 uppercase tracking-widest text-green-800">Batch Entry</p>
                 <h2 className="text-2xl font-serif font-semibold text-gray-800 flex items-baseline gap-2">
                    {year}年 {month}月
                    <span className="text-sm font-sans font-normal opacity-50 text-gray-500">(お手入れ一括入力)</span>
                 </h2>
            </div>
          </div>
          
          <div 
            ref={daysContainerRef}
            className="flex overflow-x-auto gap-2 px-6 pb-4 no-scrollbar snap-x scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
             <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
             {daysArray.map(d => (
                 <button
                    key={d}
                    data-day={d}
                    type="button"
                    onClick={() => setDay(d)}
                    className={`flex-none w-10 h-14 rounded-full flex flex-col items-center justify-center transition-all snap-center border shrink-0 ${
                        day === d 
                        ? 'bg-green-700 border-green-700 text-white shadow-lg scale-110 z-10' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-600'
                    }`}
                 >
                     <span className="text-[9px] font-bold uppercase opacity-60 leading-none mb-0.5">Day</span>
                     <span className="text-xl font-serif font-bold leading-none">{d}</span>
                 </button>
             ))}
             <div className="w-4 flex-none" />
          </div>
      </div>

      {/* --- Scrollable Content --- */}
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            
            {/* Step 1: Select Care */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">1</span>
                    作業内容を選ぶ
                </h3>
                
                {/* Type Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
                    {CARE_TYPES.map(type => (
                        <button
                        key={type.id}
                        type="button"
                        onClick={() => { setSelectedType(type.id); setSelectedProductId(""); setSelectedSoilId(""); }}
                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
                            selectedType === type.id 
                            ? `bg-green-50 ring-2 ring-green-600 ring-offset-2 scale-105` 
                            : `hover:bg-gray-50 opacity-60 hover:opacity-100`
                        }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${type.bgColor}`}>
                                <IconComponent name={type.iconName} size={18} color="white" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-700">{type.label}</span>
                        </button>
                    ))}
                </div>

                {/* Sub-Selection: Products */}
                {availableProducts.length > 0 && (
                    <div className="animate-fade-in bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <label className="block text-xs font-bold text-gray-500 mb-2">使用したアイテム (任意)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {availableProducts.map(prod => (
                                <button
                                    key={prod.id}
                                    onClick={() => setSelectedProductId(selectedProductId === prod.id ? "" : prod.id)}
                                    className={`flex items-center p-2 rounded-md border text-left transition-all bg-white ${
                                        selectedProductId === prod.id
                                        ? 'border-green-500 ring-1 ring-green-500 text-green-800'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="w-3 h-3 rounded-full mr-2 flex-none" style={{ backgroundColor: prod.color }}></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold truncate">{prod.name}</div>
                                        <div className="text-[10px] opacity-60 truncate">{prod.maker}</div>
                                    </div>
                                    {selectedProductId === prod.id && <Check size={14} className="text-green-600 flex-none" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                 {/* Sub-Selection: Soil (Simplified) */}
                 {selectedType === 'soil' && (
                    <div className="animate-fade-in bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <label className="block text-xs font-bold text-gray-500 mb-2">主な用土 (任意)</label>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                            value={selectedSoilId}
                            onChange={(e) => setSelectedSoilId(e.target.value)}
                        >
                            <option value="">-- 指定なし --</option>
                            {SOIL_LIBRARY.filter(s => s.category === 'mix').map(s => (
                                <option key={s.id} value={s.id}>{s.maker} - {s.name}</option>
                            ))}
                        </select>
                    </div>
                 )}
            </section>

            {/* Step 2: Select Roses */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">2</span>
                        対象のバラ ({selectedRoseIds.size}株)
                    </h3>
                    <button 
                        onClick={toggleAllRoses}
                        className="text-xs font-bold text-green-700 hover:text-green-800 underline"
                    >
                        {selectedRoseIds.size === roses.length ? 'すべて解除' : 'すべて選択'}
                    </button>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {roses.map(rose => {
                        const isSelected = selectedRoseIds.has(rose.id);
                        return (
                            <div 
                                key={rose.id}
                                onClick={() => toggleRose(rose.id)}
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all select-none ${
                                    isSelected 
                                    ? 'bg-green-50 border-green-500 shadow-sm' 
                                    : 'bg-white border-gray-100 hover:border-gray-300'
                                }`}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
                                    isSelected ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'
                                }`}>
                                    {isSelected && <Check size={12} className="text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`font-medium truncate ${isSelected ? 'text-green-900' : 'text-gray-700'}`}>{rose.name}</div>
                                    <div className="text-[10px] text-gray-400 truncate">
                                        {BRAND_MASTER[rose.brand]?.label || rose.brand}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                 </div>
            </section>
        </div>
      </div>

      {/* --- Footer Action Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-3xl mx-auto flex gap-4">
            <button
                onClick={handleSubmit}
                disabled={!selectedType || selectedRoseIds.size === 0}
                className="flex-1 py-3 bg-green-800 text-white rounded-lg font-bold shadow-lg hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <Layers size={18} />
                <span>{selectedRoseIds.size}件をまとめて記録して戻る</span>
            </button>
        </div>
      </div>

    </div>
  );
};