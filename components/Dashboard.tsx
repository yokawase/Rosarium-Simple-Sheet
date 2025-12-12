import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Rose, CareEvent } from '../types';
import { CARE_TYPES } from '../constants';

interface DashboardProps {
  roses: Rose[];
  events: CareEvent[];
}

export const Dashboard: React.FC<DashboardProps> = ({ roses, events }) => {
  // 1. Prepare Data for Pie Chart (Care Type Distribution)
  const typeCounts = events.reduce((acc, ev) => {
    acc[ev.typeId] = (acc[ev.typeId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(typeCounts).map(typeId => {
    const type = CARE_TYPES.find(t => t.id === typeId);
    return {
      name: type?.label || typeId,
      value: typeCounts[typeId],
      color: type?.color || '#ccc'
    };
  });

  // 2. Prepare Data for Bar Chart (Monthly Activity)
  const currentYear = new Date().getFullYear();
  const monthlyData = [...Array(12)].map((_, i) => {
    const month = i + 1;
    const count = events.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === currentYear && d.getMonth() + 1 === month;
    }).length;
    return { name: `${month}月`, count };
  });

  return (
    <div className="flex-grow overflow-y-auto bg-[#FDFBF7] p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-light text-gray-800 mb-2">Garden Analytics ({currentYear})</h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Insights & Patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-6 text-center text-gray-700 font-serif">Care Type Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-6 text-center text-gray-700 font-serif">Monthly Workload</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#2F855A" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
                <p className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1">Total Roses</p>
                <p className="text-3xl font-serif text-green-900">{roses.length}</p>
             </div>
             <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-100">
                <p className="text-xs text-orange-600 uppercase font-bold tracking-wider mb-1">Activities (Year)</p>
                <p className="text-3xl font-serif text-orange-900">{events.length}</p>
             </div>
        </div>
      </div>
    </div>
  );
};