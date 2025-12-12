import React, { useState } from 'react';
import { Flower, BarChart3, Grid, Image as ImageIcon } from 'lucide-react';
import { Sheet } from './components/Sheet';
import { Dashboard } from './components/Dashboard';
import { Album } from './components/Album';
import { RoseFormModal, CareModal } from './components/Modals';
import { Rose, CareEvent, ViewMode } from './types';
import { INITIAL_ROSES, generateMockEvents, CARE_TYPES } from './constants';

const App: React.FC = () => {
  // --- Global State ---
  const [view, setView] = useState<ViewMode>('sheet');
  const [roses, setRoses] = useState<Rose[]>(INITIAL_ROSES);
  
  // NOTE: Start with empty events for a clean slate
  const [events, setEvents] = useState<CareEvent[]>([]);
  
  // --- Modal State ---
  const [isRoseModalOpen, setRoseModalOpen] = useState(false);
  const [editingRose, setEditingRose] = useState<Rose | null>(null);

  const [isCareModalOpen, setCareModalOpen] = useState(false);
  const [careContext, setCareContext] = useState<{year: number, month: number, rose: Rose | null}>({ year: 0, month: 0, rose: null });

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

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const getEventsForContext = () => {
    if(!careContext.rose) return [];
    const prefix = `${careContext.year}-${careContext.month.toString().padStart(2, '0')}`;
    return events.filter(e => e.roseId === careContext.rose?.id && e.date.startsWith(prefix));
  };

  return (
    <div className="h-screen flex flex-col bg-[#FDFBF7]">
      {/* --- Header --- */}
      <header className="flex-none px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-sm z-50 sticky top-0">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setView('sheet')}>
          <div className="bg-green-100 p-2 rounded-full text-green-700 group-hover:bg-green-200 transition-colors">
            <Flower size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-gray-800 tracking-tight leading-none">Rosarium</h1>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium hidden sm:block mt-1">Infinite Garden Log</span>
          </div>
        </div>

        <nav className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setView('sheet')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'sheet' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Grid size={16} />
            <span className="hidden md:inline">SHEET</span>
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
      </header>

      {/* --- Legend Bar (Sheet View Only) --- */}
      {view === 'sheet' && (
        <div className="flex-none px-6 py-2 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-4 items-center overflow-x-auto z-10">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mr-2">Legend:</span>
          {CARE_TYPES.map(type => (
            <div key={type.id} className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-default">
              <span className={`w-2.5 h-2.5 rounded-full ${type.bgColor}`}></span>
              <span className="text-xs text-gray-600 font-medium">{type.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* --- Main Content --- */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {view === 'sheet' ? (
          <Sheet 
            roses={roses} 
            events={events}
            onOpenRoseModal={handleOpenRoseModal}
            onOpenCareModal={handleOpenCareModal}
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
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default App;
