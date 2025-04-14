
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const handleSaveSettings = () => {
    toast.success("Configuraciones guardadas correctamente");
  };

  return (
    <Layout title="Configuración">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Gestione las preferencias y ajustes del sistema.
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuración General */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Configura los ajustes generales de la aplicación.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nombre de la Empresa</Label>
                <Input id="company-name" defaultValue="Telecom Solutions" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Región por defecto</Label>
                <Select defaultValue="madrid">
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Seleccionar región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="valencia">Valencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona horaria</Label>
                <Select defaultValue="europe-madrid">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Seleccionar zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-madrid">Europe/Madrid (UTC+1)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo Oscuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Activar el modo oscuro en la interfaz.
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Configure sus preferencias de notificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="alert-notifications">Alertas de antena</Label>
                  <p className="text-sm text-muted-foreground">
                    Reciba notificaciones cuando una antena presente alertas.
                  </p>
                </div>
                <Switch id="alert-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-notifications">Mantenimiento programado</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificaciones sobre mantenimientos programados.
                  </p>
                </div>
                <Switch id="maintenance-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="report-notifications">Informes semanales</Label>
                  <p className="text-sm text-muted-foreground">
                    Reciba informes semanales por correo electrónico.
                  </p>
                </div>
                <Switch id="report-notifications" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-notifications">Correo electrónico</Label>
                <Input 
                  id="email-notifications" 
                  type="email" 
                  placeholder="usuario@ejemplo.com" 
                  defaultValue="admin@telecom.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Configure los ajustes de seguridad de la aplicación.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticación de dos factores</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilite la verificación en dos pasos para mayor seguridad.
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
          </Card>

          {/* Ajustes del sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Sistema</CardTitle>
              <CardDescription>
                Configure los ajustes del sistema y almacenamiento de datos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Retención de datos</Label>
                <Select defaultValue="365">
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                    <SelectItem value="180">180 días</SelectItem>
                    <SelectItem value="365">1 año</SelectItem>
                    <SelectItem value="730">2 años</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Copia de seguridad automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Realizar copias de seguridad automáticas diarias.
                  </p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytic-data">Compartir datos de uso</Label>
                  <p className="text-sm text-muted-foreground">
                    Compartir datos anónimos para mejorar el sistema.
                  </p>
                </div>
                <Switch id="analytic-data" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" defaultValue="sk_live_T3l3c0m2023K3y" type="password" />
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    Mostrar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Utilice esta clave para acceder a la API del sistema.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSaveSettings}>Guardar Cambios</Button>
        </div>
      </div>
    </Layout>
  );
}
