
import { Antenna, AntennaStatus } from "@/types/antenna";
import { Activity, Calendar, MapPin, Radio, Signal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AntennaCardProps {
  antenna: Antenna;
}

const getStatusConfig = (status: AntennaStatus) => {
  switch (status) {
    case AntennaStatus.ACTIVE:
      return { color: "bg-emerald-100 text-emerald-700", label: "Activa" };
    case AntennaStatus.INACTIVE:
      return { color: "bg-slate-100 text-slate-700", label: "Inactiva" };
    case AntennaStatus.MAINTENANCE:
      return { color: "bg-amber-100 text-amber-700", label: "Mantenimiento" };
    case AntennaStatus.ALERT:
      return { color: "bg-red-100 text-red-700", label: "Alerta" };
    default:
      return { color: "bg-slate-100 text-slate-700", label: "Desconocido" };
  }
};

export function AntennaCard({ antenna }: AntennaCardProps) {
  const statusConfig = getStatusConfig(antenna.status);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Radio size={18} className="text-primary" />
          {antenna.name}
        </h3>
        <Badge 
          variant="outline" 
          className={cn("px-2.5 font-medium", statusConfig.color)}
        >
          {statusConfig.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>
            {antenna.location.lat.toFixed(4)}, {antenna.location.lng.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Signal size={16} />
          <span>{antenna.frequency}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity size={16} />
          <span>{antenna.power} dBm / {antenna.gain} dBi</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} />
          <span>Inst: {new Date(antenna.installation_date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground line-clamp-2">
        {antenna.notes || "Sin notas adicionales."}
      </div>
    </div>
  );
}
