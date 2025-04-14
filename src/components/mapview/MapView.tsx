
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SAMPLE_ANTENNAS } from "@/data/antennas";
import { AntennaStatus } from "@/types/antenna";

// Nota: En un entorno real, esto debería estar en variables de entorno
// Para esta demo, usamos un token público de mapbox
const MAPBOX_TOKEN = "pk.eyJ1IjoiZGVtby1tYXBib3giLCJhIjoiY2s4aTZldWd5MDE3cDNscWxkajQ5c3hteiJ9.dLBA9S9-KlL0J-UgsDpfqg";

const statusColors = {
  [AntennaStatus.ACTIVE]: "#10B981",
  [AntennaStatus.INACTIVE]: "#64748B",
  [AntennaStatus.MAINTENANCE]: "#F59E0B",
  [AntennaStatus.ALERT]: "#EF4444",
};

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-3.7033, 40.4167], // Madrid como centro por defecto
      zoom: 10,
    });

    newMap.on("load", () => {
      setMapLoaded(true);
      map.current = newMap;
    });

    // Añadir controles de navegación
    newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      newMap.remove();
    };
  }, []);

  // Añadir marcadores de antenas cuando el mapa esté cargado
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Añadir marcadores para cada antena
    SAMPLE_ANTENNAS.forEach((antenna) => {
      // Crear elemento personalizado para el marcador
      const el = document.createElement("div");
      el.className = "antenna-marker";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = statusColors[antenna.status];
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
      el.style.cursor = "pointer";

      // Crear y añadir popup con información
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        maxWidth: "300px",
      }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold text-sm mb-1">${antenna.name}</h3>
          <div class="text-xs grid grid-cols-2 gap-x-3 gap-y-1">
            <span>Tipo: ${antenna.type}</span>
            <span>Estado: ${antenna.status}</span>
            <span>Altura: ${antenna.height}m</span>
            <span>Frecuencia: ${antenna.frequency}</span>
          </div>
        </div>
      `);

      // Crear y añadir marcador al mapa
      new mapboxgl.Marker(el)
        .setLngLat([antenna.location.lng, antenna.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [mapLoaded]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
