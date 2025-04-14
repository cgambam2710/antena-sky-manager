
import { Layout } from "@/components/layout/Layout";
import { AntennaCard } from "@/components/antennas/AntennaCard";
import { SAMPLE_ANTENNAS } from "@/data/antennas";
import { AntennaStatus, AntennaType } from "@/types/antenna";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FilterX, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function AntennaList() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredAntennas = SAMPLE_ANTENNAS.filter((antenna) => {
    const matchesStatus = statusFilter === "all" || antenna.status === statusFilter;
    const matchesType = typeFilter === "all" || antenna.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const clearFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
  };

  return (
    <Layout title="Catálogo de Antenas">
      <div className="space-y-6">
        {/* Acciones y filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value={AntennaStatus.ACTIVE}>Activas</SelectItem>
                <SelectItem value={AntennaStatus.INACTIVE}>Inactivas</SelectItem>
                <SelectItem value={AntennaStatus.MAINTENANCE}>Mantenimiento</SelectItem>
                <SelectItem value={AntennaStatus.ALERT}>Alerta</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value={AntennaType.MACRO}>Macro</SelectItem>
                <SelectItem value={AntennaType.MICRO}>Micro</SelectItem>
                <SelectItem value={AntennaType.SMALL}>Small</SelectItem>
              </SelectContent>
            </Select>

            {(statusFilter !== "all" || typeFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-9"
              >
                <FilterX size={16} className="mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link to="/new-antenna">
              <Plus size={16} className="mr-1" />
              Nueva Antena
            </Link>
          </Button>
        </div>

        {/* Resultados */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Antenas{" "}
              {(statusFilter !== "all" || typeFilter !== "all") && (
                <Badge variant="outline" className="ml-2 font-normal">
                  {filteredAntennas.length} resultados
                </Badge>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAntennas.length > 0 ? (
              filteredAntennas.map((antenna) => (
                <AntennaCard key={antenna.id} antenna={antenna} />
              ))
            ) : (
              <div className="col-span-3 py-10 text-center">
                <p className="text-muted-foreground">
                  No se encontraron antenas con los filtros seleccionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
