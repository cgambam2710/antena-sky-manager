
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAntennaTypeDistribution, getAntennaStatusCount } from '@/data/antennas';

export function AntennaTypesChart() {
  const typeDistribution = getAntennaTypeDistribution();
  
  const data = [
    { name: 'Macro', value: typeDistribution.macro },
    { name: 'Micro', value: typeDistribution.micro },
    { name: 'Small', value: typeDistribution.small },
  ];

  return (
    <div className="h-[300px] w-full bg-white rounded-lg p-5 shadow-sm border">
      <h3 className="text-base font-semibold mb-4">Distribución por Tipo</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value: number) => [`${value} antenas`, 'Cantidad']}
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0', 
              borderRadius: '6px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="#0EA5E9" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AntennaStatusChart() {
  const statusCount = getAntennaStatusCount();
  
  const data = [
    { name: 'Activas', value: statusCount.active, color: '#10B981' },
    { name: 'Inactivas', value: statusCount.inactive, color: '#64748B' },
    { name: 'Mantenimiento', value: statusCount.maintenance, color: '#F59E0B' },
    { name: 'Alerta', value: statusCount.alert, color: '#EF4444' },
  ];

  return (
    <div className="h-[300px] w-full bg-white rounded-lg p-5 shadow-sm border">
      <h3 className="text-base font-semibold mb-4">Estado de Antenas</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value: number) => [`${value} antenas`, 'Cantidad']}
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0', 
              borderRadius: '6px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
