import React, { useState, useEffect } from 'react';
import { Flower, BarChart3, Grid, Image as ImageIcon, Settings as SettingsIcon, Layers } from 'lucide-react';
import { Sheet } from './components/Sheet';
import { Dashboard } from './components/Dashboard';
import { Album } from './components/Album';
import { BatchEntry } from './components/BatchEntry';
import { RoseFormModal, CareModal, SettingsModal } from './components/Modals';
import { Rose, CareEvent, ViewMode, AppSettings, StoredData } from './types';
import { INITIAL_ROSES, CARE_TYPES } from './constants';

const STORAGE_KEY = 'rosarium_data_v1';

const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 'normal',
  highContrast: false,
};

const App: React.FC = () => {
  // --- Global State & Persistence ---
  
  // Initialize state from LocalStorage or Defaults
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const [view, setView] = useState<ViewMode>('sheet');
  const [roses, setRoses] = useState<Rose[]>(INITIAL_ROSES);
  const [events, setEvents] = useState<CareEvent[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Focus Date for Sheet (used after Batch Entry)
  const [sheetTargetDate, setSheetTargetDate] = useState<{year: number, month: number} | null>(null);

  // Load on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredData = JSON.parse(stored);
        if (parsed.roses) setRoses(parsed.roses);
        if (parsed.events) setEvents(parsed.events);
        if (parsed.settings) setSettings(parsed.settings);
      }
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      setDataLoaded(true);
    }
  }, []);

  // Save on change
  useEffect(() => {
    if (!dataLoaded) return; // Don't save before initial load finishes
    try {
      const data: StoredData = { roses, events, settings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Storage failed", e);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          // Alert user carefully (using native alert might interrupt flow, but here it's critical)
          alert("保存容量の上限を超えました。これ以上データを保存できません。\n不要な画像を削除するか、データをエクスポートして整理してください。");
      }
    }
  }, [roses, events, settings, dataLoaded]);

  
  // --- Modal State ---
  const [isRoseModalOpen, setRoseModalOpen] = useState(false);
  const [editingRose, setEditingRose] = useState<Rose | null>(null);

  const [isCareModalOpen, setCareModalOpen] = useState(false);
  const [careContext, setCareContext] = useState<{year: number, month: number, rose: Rose | null}>({ year: 0, month: 0, rose: null });

  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  // --- Handlers ---

  // Rose Management
  const handleOpenRoseModal = (rose?: Rose) => {
    setEditingRose(rose || null);
    setRoseModalOpen(true);
  };

  const handleSaveRose = (rose: Rose) => {
    setRoses(prev => {
      const exists = prev.find(r => r.id === rose.id);
      if (exists) {
        return prev.map(r => r.id === rose.id ? rose : r);
      }
      return [rose, ...prev]; // Add new to top
    });
  };

  const handleDeleteRose = (id: string) => {
    if(window.confirm('Are you sure you want to remove this rose from your garden?')) {
        setRoses(prev => prev.filter(r => r.id !== id));
        setEvents(prev => prev.filter(e => e.roseId !== id)); // Cleanup events
    }
  };

  // Care Management
  const handleOpenCareModal = (year: number, month: number, rose: Rose) => {
    setCareContext({ year, month, rose });
    setCareModalOpen(true);
  };

  const handleAddEvent = (event: CareEvent) => {
    setEvents(prev => [...prev, event]);
  };

  const handleAddBatchEvents = (newEvents: CareEvent[]) => {
    setEvents(prev => [...prev, ...newEvents]);
  };

  const handleUpdateEvent = (updatedEvent: CareEvent) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const getEventsForContext = () => {
    if(!careContext.rose) return [];
    const prefix = `${careContext.year}-${careContext.month.toString().padStart(2, '0')}`;
    return events.filter(e => e.roseId === careContext.rose?.id && e.date.startsWith(prefix));
  };

  // Import Data Handler
  const handleImportData = (data: StoredData) => {
      setRoses(data.roses);
      setEvents(data.events);
      setSettings(data.settings);
      // Force reload of view slightly to ensure everything repaints
      setSheetTargetDate(null);
  };

  // --- Styles Logic ---
  const getScaleClass = () => {
    switch(settings.fontSize) {
      case 'large': return 'text-[112.5%]'; // Approx 18px base
      case 'xl': return 'text-[125%]'; // Approx 20px base
      default: return 'text-[100%]'; // 16px base
    }
  };

  const highContrastStyles = settings.highContrast ? {
    color: '#000000',
    '--text-main': '#000000',
    '--text-muted': '#000000',
  } as React.CSSProperties : {};

  // Inject a global style for High Contrast overrides if needed
  const highContrastClass = settings.highContrast ? "high-contrast-mode" : "";

  // Generate a key for Sheet that changes when data or target changes
  // This forces React to unmount and remount the Sheet, ensuring all state is reset 
  // and correct year columns are generated for the new data.
  const sheetKey = `sheet-${events.length}-${sheetTargetDate ? `${sheetTargetDate.year}-${sheetTargetDate.month}` : 'default'}`;

  return (
    <div 
      className={`h-screen flex flex-col bg-[#FDFBF7] transition-all duration-300 ${getScaleClass()} ${highContrastClass}`}
      style={highContrastStyles}
    >
      {/* High Contrast Global Overrides */}
      {settings.highContrast && (
        <style>{`
          .high-contrast-mode .text-gray-400, 
          .high-contrast-mode .text-gray-500, 
          .high-contrast-mode .text-gray-600,
          .high-contrast-mode .text-gray-700,
          .high-contrast-mode .text-green-700,
          .high-contrast-mode .text-green-800 { 
            color: #000000 !important; 
          }
          .high-contrast-mode .border-gray-100,
          .high-contrast-mode .border-gray-200,
          .high-contrast-mode .border-gray-300 {
            border-color: #000000 !important;
          }
          .high-contrast-mode .bg-white {
            background-color: #ffffff !important;
          }
          .high-contrast-mode .bg-[#FDFBF7] {
            background-color: #ffffff !important;
          }
          /* Keep colored badges legible but high contrast borders */
          .high-contrast-mode .rounded-full, 
          .high-contrast-mode .rounded-md {
             border: 1px solid #000 !important;
          }
        `}</style>
      )}

      {/* --- Header --- */}
      <header className="flex-none px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-sm z-50 sticky top-0">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setView('sheet')}>
          <div className="bg-green-100 p-2 rounded-full text-green-700 group-hover:bg-green-200 transition-colors">
            <Flower size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-gray-800 tracking-tight leading-none">Rosarium</h1>
            <span className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-medium hidden sm:block mt-1">Infinite Garden Log</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
            <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => { setView('sheet'); setSheetTargetDate(null); }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'sheet' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Grid size={16} />
                <span className="hidden md:inline">SHEET</span>
            </button>
            <button 
                onClick={() => { setView('batch'); setSheetTargetDate(null); }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'batch' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Layers size={16} />
                <span className="hidden md:inline">BATCH</span>
            </button>
            <button 
                onClick={() => setView('dashboard')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <BarChart3 size={16} />
                <span className="hidden md:inline">ANALYSIS</span>
            </button>
            <button 
                onClick={() => setView('album')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'album' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <ImageIcon size={16} />
                <span className="hidden md:inline">ALBUM</span>
            </button>
            </nav>
            
            <button 
                onClick={() => setSettingsModalOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                title="設定"
            >
                <SettingsIcon size={20} />
            </button>
        </div>
      </header>

      {/* --- Legend Bar (Sheet View Only) --- */}
      {view === 'sheet' && (
        <div className="flex-none px-6 py-2 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-4 items-center overflow-x-auto z-10">
          <span className="text-[10px] opacity-50 uppercase tracking-wider font-bold mr-2">Legend:</span>
          {CARE_TYPES.map(type => (
            <div key={type.id} className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-default">
              <span className={`w-2.5 h-2.5 rounded-full ${type.bgColor}`}></span>
              <span className="text-xs opacity-70 font-medium">{type.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* --- Main Content --- */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {view === 'sheet' ? (
          <Sheet 
            key={sheetKey} // CRITICAL: Forces remount on data change
            roses={roses} 
            events={events}
            onOpenRoseModal={handleOpenRoseModal}
            onOpenCareModal={handleOpenCareModal}
            initialTarget={sheetTargetDate}
          />
        ) : view === 'batch' ? (
          <BatchEntry 
            roses={roses}
            onAddBatchEvents={handleAddBatchEvents}
            onComplete={(target) => {
                if (target) setSheetTargetDate(target);
                setView('sheet');
            }}
          />
        ) : view === 'dashboard' ? (
          <Dashboard roses={roses} events={events} />
        ) : (
          <Album roses={roses} events={events} />
        )}
      </main>

      {/* --- Modals --- */}
      <RoseFormModal 
        isOpen={isRoseModalOpen} 
        onClose={() => setRoseModalOpen(false)} 
        initialData={editingRose}
        onSubmit={handleSaveRose}
        onDelete={handleDeleteRose}
      />
      
      <CareModal 
        isOpen={isCareModalOpen}
        onClose={() => setCareModalOpen(false)}
        year={careContext.year}
        month={careContext.month}
        rose={careContext.rose}
        existingEvents={getEventsForContext()}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        currentData={{ roses, events }}
        onImportData={handleImportData}
      />
    </div>
  );
};

export default App;