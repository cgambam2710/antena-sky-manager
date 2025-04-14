
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AntennaStatus, AntennaType } from "@/types/antenna";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Info } from "lucide-react";

export function AntennaForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: AntennaStatus.INACTIVE,
    latitude: "",
    longitude: "",
    height: "",
    azimuth: "",
    tilt: "",
    frequency: "",
    power: "",
    gain: "",
    bandwidth: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos un proceso de guardado
    setTimeout(() => {
      toast.success("Antena creada exitosamente", {
        description: `${formData.name} ha sido añadida al inventario.`,
      });
      setLoading(false);
      navigate("/antennas");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información básica */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Información básica</h3>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la antena *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Torre Norte"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de antena *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AntennaType.MACRO}>Macro</SelectItem>
                    <SelectItem value={AntennaType.MICRO}>Micro</SelectItem>
                    <SelectItem value={AntennaType.SMALL}>Small</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Estado inicial *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AntennaStatus.ACTIVE}>Activa</SelectItem>
                    <SelectItem value={AntennaStatus.INACTIVE}>
                      Inactiva
                    </SelectItem>
                    <SelectItem value={AntennaStatus.MAINTENANCE}>
                      Mantenimiento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="latitude">Latitud *</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Ej: 40.4167"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="longitude">Longitud *</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Ej: -3.7033"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Especificaciones técnicas */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Especificaciones técnicas</h3>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="height">Altura (m) *</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    min="0"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Ej: 30"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frecuencia *</Label>
                  <Input
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    placeholder="Ej: 800 MHz"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="azimuth">Azimut (°)</Label>
                  <Input
                    id="azimuth"
                    name="azimuth"
                    type="number"
                    min="0"
                    max="360"
                    value={formData.azimuth}
                    onChange={handleChange}
                    placeholder="Ej: 180"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tilt">Inclinación (°)</Label>
                  <Input
                    id="tilt"
                    name="tilt"
                    type="number"
                    min="0"
                    value={formData.tilt}
                    onChange={handleChange}
                    placeholder="Ej: 5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="power">Potencia (dBm) *</Label>
                  <Input
                    id="power"
                    name="power"
                    type="number"
                    value={formData.power}
                    onChange={handleChange}
                    placeholder="Ej: 40"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gain">Ganancia (dBi) *</Label>
                  <Input
                    id="gain"
                    name="gain"
                    type="number"
                    value={formData.gain}
                    onChange={handleChange}
                    placeholder="Ej: 18"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bandwidth">Ancho de banda</Label>
                <Input
                  id="bandwidth"
                  name="bandwidth"
                  value={formData.bandwidth}
                  onChange={handleChange}
                  placeholder="Ej: 20 MHz"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notas */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Notas adicionales</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Añada cualquier información relevante sobre la antena..."
                rows={4}
              />
            </div>
            
            <div className="flex items-center mt-3 text-sm text-muted-foreground gap-2 bg-muted/50 p-3 rounded-md">
              <Info size={16} />
              <p>
                Información relacionada con la instalación y registro. Se agregará automáticamente la fecha de instalación.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => navigate(-1)} 
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Antena"}
        </Button>
      </div>
    </form>
  );
}
