import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Rose, CareEvent } from '../types';
import { CARE_TYPES, BRAND_MASTER, PRODUCT_LIBRARY } from '../constants';
import * as Icons from 'lucide-react';
import { Plus } from 'lucide-react';

interface SheetProps {
  roses: Rose[];
  events: CareEvent[];
  onOpenRoseModal: (rose?: Rose) => void;
  onOpenCareModal: (year: number, month: number, rose: Rose) => void;
}

const IconComponent = React.memo(({ name, className, color }: { name: string, className?: string, color?: string }) => {
  const Icon = (Icons as any)[name] || Icons.HelpCircle;
  return <Icon className={className} stroke={color} />;
});

export const Sheet: React.FC<SheetProps> = ({ roses, events, onOpenRoseModal, onOpenCareModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize with current year and next year
  const [years, setYears] = useState<number[]>(() => {
    const current = new Date().getFullYear();
    return [current, current + 1];
  });

  // Track scroll position for restoration when prepending years
  const scrollState = useRef<{ isPrepending: boolean, previousScrollWidth: number, previousScrollLeft: number }>({ 
    isPrepending: false, 
    previousScrollWidth: 0, 
    previousScrollLeft: 0 
  });

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    // Add Future Year (Right Scroll)
    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      const lastYear = years[years.length - 1];
      if(lastYear < 2035) { 
          setYears(prev => [...prev, lastYear + 1]);
      }
    }
    
    // Add Past Year (Left Scroll)
    // Threshold needs to be large enough to trigger, but we must debounce/lock to prevent loop
    if (scrollLeft < 50 && !scrollState.current.isPrepending) {
       const firstYear = years[0];
       if(firstYear > 2020) { 
            // Capture current state before update
            scrollState.current = {
                isPrepending: true,
                previousScrollWidth: scrollWidth,
                previousScrollLeft: scrollLeft
            };
            setYears(prev => [firstYear - 1, ...prev]);
       }
    }
  };

  // Restore scroll position after DOM update when prepending
  useLayoutEffect(() => {
    if (scrollState.current.isPrepending && containerRef.current) {
        const { previousScrollWidth, previousScrollLeft } = scrollState.current;
        const newScrollWidth = containerRef.current.scrollWidth;
        const diff = newScrollWidth - previousScrollWidth;
        
        // Adjust scrollLeft so the user stays on the same visual element
        containerRef.current.scrollLeft = previousScrollLeft + diff;
        
        // Reset flag
        scrollState.current.isPrepending = false;
    }
  }, [years]);

  const getEventsForCell = (roseId: string, year: number, month: number) => {
    const prefix = `${year}-${month.toString().padStart(2, '0')}`;
    return events.filter(e => e.roseId === roseId && e.date.startsWith(prefix));
  };

  // Group events by Type for vertical stacking
  const groupEventsByType = (cellEvents: CareEvent[]) => {
      const groups: Record<string, CareEvent[]> = {};
      CARE_TYPES.forEach(t => groups[t.id] = []);
      
      cellEvents.forEach(ev => {
          if (groups[ev.typeId]) groups[ev.typeId].push(ev);
      });
      return groups;
  };

  return (
    <div 
      className="flex-grow overflow-auto bg-white relative"
      id="sheet-scroll-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <table className="border-collapse table-fixed w-max">
        <thead>
          <tr>
            {/* Sticky Top-Left Corner */}
            <th className="sticky left-0 top-0 z-50 w-[260px] min-w-[260px] p-4 bg-[#FDFBF7] border-r border-b border-gray-200 shadow-[1px_1px_0_rgba(226,232,240,1)] text-left">
              <div className="flex justify-between items-center">
                <span className="font-serif italic text-xl font-bold opacity-80">Rose Variety</span>
                <button 
                  onClick={() => onOpenRoseModal()}
                  className="w-8 h-8 rounded-full bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center transition-colors shadow-sm"
                  title="バラをお迎えする"
                >
                  <Plus size={18} />
                </button>
              </div>
            </th>

            {/* Dynamic Year Headers */}
            {years.map(year => (
              <React.Fragment key={year}>
                {[...Array(12)].map((_, i) => {
                  const month = i + 1;
                  const isYearStart = month === 1;
                  return (
                    <th 
                      key={`${year}-${month}`}
                      className={`sticky top-0 z-40 min-h-16 h-auto py-2 min-w-[80px] w-[80px] bg-[#FDFBF7] border-b border-gray-200 border-r border-gray-100 ${isYearStart ? 'border-l-2 border-l-gray-300' : ''}`}
                    >
                      {month === 1 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          {/* Increased font size for Year */}
                          <span className="font-bold text-gray-800 text-3xl font-serif">{year}</span>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Jan</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-2xl font-serif text-gray-400 font-medium">{month}</span>
                        </div>
                      )}
                    </th>
                  );
                })}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {roses.map(rose => {
            const brandInfo = BRAND_MASTER[rose.brand];
            // Simplification: Extract just the country or short name for display space
            const displayBrand = brandInfo ? brandInfo.label.split('(')[0] : rose.brand; 

            return (
              <tr key={rose.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-100">
                {/* Sticky Row Header (Rose Info) */}
                <th 
                  className="sticky left-0 z-30 bg-white group-hover:bg-gray-50 transition-colors border-r border-gray-200 p-3 text-left shadow-[1px_0_0_rgba(226,232,240,1)] cursor-pointer"
                  onClick={() => onOpenRoseModal(rose)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium opacity-90 truncate group-hover:text-green-800 transition-colors font-serif text-lg text-ellipsis overflow-hidden whitespace-nowrap">{rose.name}</span>
                    <span className="text-[10px] opacity-50 mt-1 truncate font-sans tracking-wide">
                        {rose.year ? `${rose.year} | ` : ''}{displayBrand}
                    </span>
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Icons.Edit2 size={14} className="opacity-40 hover:text-green-600" />
                  </div>
                </th>

                {/* Event Cells */}
                {years.map(year => (
                  <React.Fragment key={year}>
                    {[...Array(12)].map((_, i) => {
                      const month = i + 1;
                      const cellEvents = getEventsForCell(rose.id, year, month);
                      const isYearStart = month === 1;
                      const groupedEvents = groupEventsByType(cellEvents);

                      return (
                        <td 
                          key={`${year}-${month}`}
                          className={`relative min-h-24 h-24 border-r border-gray-100 align-top hover:bg-green-50/50 cursor-pointer transition-colors ${isYearStart ? 'border-l-2 border-l-gray-300' : ''}`}
                          onClick={() => onOpenCareModal(year, month, rose)}
                        >
                          {/* Vertical Column Layout for different types */}
                          <div className="flex h-full w-full p-1 gap-1 overflow-hidden">
                              {CARE_TYPES.map(type => {
                                  const eventsOfType = groupedEvents[type.id];
                                  if (!eventsOfType || eventsOfType.length === 0) return null;
                                  
                                  // For vertical stacking of specific products
                                  return (
                                      <div key={type.id} className="flex flex-col gap-1 items-center min-w-[12px]">
                                          {eventsOfType.map(ev => {
                                              const prod = ev.productId ? PRODUCT_LIBRARY[ev.productId] : null;
                                              const color = prod ? prod.color : type.color;
                                              const day = ev.date.split('-')[2];

                                              return (
                                                  <div 
                                                    key={ev.id} 
                                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: color }}
                                                    title={`${day}日: ${prod ? prod.name : type.label}`}
                                                  />
                                              );
                                          })}
                                      </div>
                                  );
                              })}
                          </div>
                        </td>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
