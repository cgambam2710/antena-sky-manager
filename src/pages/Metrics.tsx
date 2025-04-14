
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SAMPLE_ANTENNAS } from "@/data/antennas";
import { getAntennaTypeDistribution } from "@/data/antennas";

// Datos de métricas simuladas
const performanceData = [
  { name: "Ene", disponibilidad: 97, rendimiento: 94, cobertura: 85 },
  { name: "Feb", disponibilidad: 98, rendimiento: 95, cobertura: 87 },
  { name: "Mar", disponibilidad: 96, rendimiento: 93, cobertura: 84 },
  { name: "Abr", disponibilidad: 97, rendimiento: 92, cobertura: 86 },
  { name: "May", disponibilidad: 99, rendimiento: 96, cobertura: 89 },
  { name: "Jun", disponibilidad: 98, rendimiento: 95, cobertura: 88 },
];

const trafficData = [
  { name: "Ene", datos: 4500, voz: 1200 },
  { name: "Feb", datos: 5000, voz: 1300 },
  { name: "Mar", datos: 4800, voz: 1250 },
  { name: "Abr", datos: 5200, voz: 1400 },
  { name: "May", datos: 6000, voz: 1500 },
  { name: "Jun", datos: 6500, voz: 1600 },
];

const maintenanceStats = [
  { name: 'Planificado', value: 65, color: '#0EA5E9' },
  { name: 'Por fallo', value: 25, color: '#F59E0B' },
  { name: 'Urgente', value: 10, color: '#EF4444' },
];

export default function Metrics() {
  const typeDistribution = getAntennaTypeDistribution();
  const typeData = [
    { name: 'Macro', value: typeDistribution.macro, color: '#0284C7' },
    { name: 'Micro', value: typeDistribution.micro, color: '#7DD3FC' },
    { name: 'Small', value: typeDistribution.small, color: '#BAE6FD' },
  ];

  return (
    <Layout title="Métricas y Rendimiento">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard de Métricas</h1>
          <p className="text-muted-foreground">
            Visualización del rendimiento general de la red y antenas.
          </p>
        </div>
        
        <Separator />

        <Tabs defaultValue="performance">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="traffic">Tráfico</TabsTrigger>
            <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          </TabsList>
          
          {/* Pestaña de Rendimiento */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Métricas de Rendimiento</CardTitle>
                  <CardDescription>
                    Métricas clave sobre disponibilidad, rendimiento y cobertura.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          domain={[70, 100]}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, '']}
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="disponibilidad"
                          stroke="#0EA5E9"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Disponibilidad (%)"
                        />
                        <Line
                          type="monotone"
                          dataKey="rendimiento"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Rendimiento (%)"
                        />
                        <Line
                          type="monotone"
                          dataKey="cobertura"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Cobertura (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={typeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          nameKey="name"
                        >
                          {typeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} antenas`, 'Cantidad']}
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas Generales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Disponibilidad de Red</span>
                        <span className="text-sm font-semibold">97.8%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '97.8%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Salud General</span>
                        <span className="text-sm font-semibold">89.2%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-antenna-accent-success h-full" style={{ width: '89.2%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Capacidad Utilizada</span>
                        <span className="text-sm font-semibold">76.5%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-antenna-accent-warning h-full" style={{ width: '76.5%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Total Antenas</span>
                        <span className="font-medium">{SAMPLE_ANTENNAS.length}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Versión Software</span>
                        <span className="font-medium">v4.2.1</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Última actualización</span>
                        <span className="font-medium">10 Abr, 2024</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Pestaña de Tráfico */}
          <TabsContent value="traffic">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Tráfico de la Red</CardTitle>
                  <CardDescription>
                    Visualización del tráfico de datos y voz en la red.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={trafficData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value) => `${value}GB`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} GB`, '']}
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="datos" 
                          stackId="1"
                          stroke="#0EA5E9" 
                          fill="#0EA5E9" 
                          fillOpacity={0.3}
                          name="Tráfico de Datos"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="voz" 
                          stackId="1"
                          stroke="#8B5CF6" 
                          fill="#8B5CF6" 
                          fillOpacity={0.3}
                          name="Tráfico de Voz"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Promedio Diario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">257.4 GB</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +12.5% respecto al mes anterior
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Hora Pico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">19:00 - 21:00</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Promedio de 42.8 GB/h
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tasa de Crecimiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+8.3%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mensual (últimos 6 meses)
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Pestaña de Mantenimiento */}
          <TabsContent value="maintenance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Historial de Mantenimiento</CardTitle>
                  <CardDescription>
                    Resumen de actividades de mantenimiento realizadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={maintenanceStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {maintenanceStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Porcentaje']}
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Mantenimiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm mb-1">Tiempo promedio entre fallos</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">42 días</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                          +3.5 días vs anterior
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1">Tiempo promedio de reparación</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">3.2 horas</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                          -0.8h vs anterior
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1">Mantenimientos preventivos</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">18</span>
                        <span className="text-xs text-muted-foreground">
                          Último trimestre
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1">Eficiencia de mantenimiento</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">87%</span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                          -2% vs objetivo
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
