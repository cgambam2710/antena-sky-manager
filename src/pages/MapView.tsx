
import { Layout } from "@/components/layout/Layout";
import MapViewComponent from "@/components/mapview/MapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_ANTENNAS } from "@/data/antennas";
import { AntennaStatus } from "@/types/antenna";
import { MapPin } from "lucide-react";

export default function MapView() {
  // Contar antenas por estado
  const activesCount = SAMPLE_ANTENNAS.filter(a => a.status === AntennaStatus.ACTIVE).length;
  const inactivesCount = SAMPLE_ANTENNAS.filter(a => a.status === AntennaStatus.INACTIVE).length;
  const maintenanceCount = SAMPLE_ANTENNAS.filter(a => a.status === AntennaStatus.MAINTENANCE).length;
  const alertsCount = SAMPLE_ANTENNAS.filter(a => a.status === AntennaStatus.ALERT).length;

  return (
    <Layout title="Vista de Mapa">
      <div className="space-y-5">
        {/* Leyenda del mapa */}
        <div className="flex flex-wrap gap-3">
          <Card className="flex-1 min-w-[150px]">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-antenna-accent-success"></span>
                Activas
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-semibold">{activesCount}</p>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[150px]">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-antenna-gray"></span>
                Inactivas
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-semibold">{inactivesCount}</p>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[150px]">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-antenna-accent-warning"></span>
                Mantenimiento
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-semibold">{maintenanceCount}</p>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[150px]">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-antenna-accent-error"></span>
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-semibold">{alertsCount}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Mapa */}
        <div className="h-[calc(100vh-270px)]">
          <MapViewComponent />
        </div>
        
        <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
          <MapPin size={12} />
          <span>Las antenas se muestran según su estado actual. Haga clic en cualquier antena para ver detalles.</span>
        </div>
      </div>
    </Layout>
  );
}
