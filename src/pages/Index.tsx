
import { Layout } from "@/components/layout/Layout";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { AntennaTypesChart, AntennaStatusChart } from "@/components/dashboard/AntennaChart";
import { SAMPLE_ANTENNAS } from "@/data/antennas";
import { AntennaCard } from "@/components/antennas/AntennaCard";
import { Activity, MapPin, Radio, Signal } from "lucide-react";

export default function Index() {
  // Tomar las últimas 3 antenas para mostrar como recientes
  const recentAntennas = [...SAMPLE_ANTENNAS].sort((a, b) => 
    new Date(b.installation_date).getTime() - new Date(a.installation_date).getTime()
  ).slice(0, 3);

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Tarjetas de estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatusCard 
            title="Total de Antenas" 
            value={SAMPLE_ANTENNAS.length}
            icon={<Radio size={24} />}
            trend={{ value: "3", positive: true }}
          />
          <StatusCard 
            title="Antenas Activas" 
            value={SAMPLE_ANTENNAS.filter(a => a.status === "active").length}
            icon={<Signal size={24} />}
            trend={{ value: "2", positive: true }}
          />
          <StatusCard 
            title="Alertas" 
            value={SAMPLE_ANTENNAS.filter(a => a.status === "alert").length}
            icon={<Activity size={24} />}
            className="border-antenna-accent-warning/30"
            trend={{ value: "1", positive: false }}
          />
          <StatusCard 
            title="Regiones" 
            value="3"
            icon={<MapPin size={24} />}
          />
        </div>
        
        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AntennaTypesChart />
          <AntennaStatusChart />
        </div>
        
        {/* Antenas recientes */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Antenas Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentAntennas.map(antenna => (
              <AntennaCard key={antenna.id} antenna={antenna} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
