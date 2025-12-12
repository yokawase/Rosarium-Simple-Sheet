import React from 'react';
import { Rose, CareEvent } from '../types';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';

interface AlbumProps {
  roses: Rose[];
  events: CareEvent[];
}

export const Album: React.FC<AlbumProps> = ({ roses, events }) => {
  // Filter events that have images (Mainly pruning events)
  const photoEvents = events.filter(ev => ev.images && (ev.images.before || ev.images.after));

  // Sort by date descending
  photoEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex-grow overflow-y-auto bg-[#FDFBF7] p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-light text-gray-800 mb-2">Garden Album</h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Pruning Records & Memories</p>
        </div>

        {photoEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <ImageIcon className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-serif">まだ写真がありません</p>
            <p className="text-xs text-gray-400 mt-2">「剪定」の記録時に写真を登録するとここに表示されます</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoEvents.map(ev => {
              const rose = roses.find(r => r.id === ev.roseId);
              if (!rose) return null;
              
              const [year, month, day] = ev.date.split('-');
              
              return (
                <div key={ev.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-50 flex justify-between items-baseline">
                    <h3 className="font-serif font-medium text-lg text-gray-800 truncate pr-2">{rose.name}</h3>
                    <span className="text-xs text-gray-400 font-mono flex-none">{year}.{month}.{day}</span>
                  </div>
                  
                  {/* Photos */}
                  <div className="flex h-48">
                    {/* Before */}
                    <div className="flex-1 relative border-r border-white">
                        {ev.images?.before ? (
                            <img src={ev.images.before} alt="Before" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs">No Photo</div>
                        )}
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">Before</div>
                    </div>
                    
                    {/* After */}
                    <div className="flex-1 relative">
                         {ev.images?.after ? (
                            <img src={ev.images.after} alt="After" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs">No Photo</div>
                        )}
                         <div className="absolute top-2 left-2 bg-green-700/70 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">After</div>
                    </div>
                  </div>
                  
                  {/* Footer (Visual connection) */}
                  <div className="bg-green-50/30 p-2 flex justify-center items-center text-green-800/50">
                    <ArrowRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
