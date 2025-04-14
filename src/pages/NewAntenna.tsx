
import { Layout } from "@/components/layout/Layout";
import { AntennaForm } from "@/components/antennas/AntennaForm";
import { Separator } from "@/components/ui/separator";

export default function NewAntenna() {
  return (
    <Layout title="Nueva Antena">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Registrar Nueva Antena</h1>
          <p className="text-muted-foreground">
            Complete el formulario para añadir una nueva antena al sistema.
          </p>
        </div>
        
        <Separator />
        
        <AntennaForm />
      </div>
    </Layout>
  );
}
