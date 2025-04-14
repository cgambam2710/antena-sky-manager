
import { Antenna, AntennaStatus, AntennaType } from "../types/antenna";

export const SAMPLE_ANTENNAS: Antenna[] = [
  {
    id: "ant-001",
    name: "Torre Norte",
    type: AntennaType.MACRO,
    status: AntennaStatus.ACTIVE,
    location: {
      lat: 40.4167,
      lng: -3.7033
    },
    height: 45,
    azimuth: 120,
    tilt: 5,
    frequency: "800 MHz",
    power: 40,
    gain: 18,
    bandwidth: "20 MHz",
    installation_date: "2022-03-15",
    last_maintenance: "2024-01-20",
    notes: "Última revisión realizada por equipo técnico. Se reemplazaron conectores."
  },
  {
    id: "ant-002",
    name: "Estación Central",
    type: AntennaType.MICRO,
    status: AntennaStatus.ACTIVE,
    location: {
      lat: 40.4260,
      lng: -3.7120
    },
    height: 25,
    azimuth: 85,
    tilt: 3,
    frequency: "1800 MHz",
    power: 20,
    gain: 15,
    bandwidth: "15 MHz",
    installation_date: "2023-05-08",
    last_maintenance: "2024-02-15",
    notes: "Instalación en azotea de edificio comercial. Acceso con permiso previo."
  },
  {
    id: "ant-003",
    name: "Sector Sur",
    type: AntennaType.SMALL,
    status: AntennaStatus.MAINTENANCE,
    location: {
      lat: 40.4050,
      lng: -3.6980
    },
    height: 12,
    azimuth: 210,
    tilt: 2,
    frequency: "2600 MHz",
    power: 10,
    gain: 10,
    bandwidth: "10 MHz",
    installation_date: "2023-10-30",
    last_maintenance: "2024-03-05",
    notes: "En mantenimiento programado por problemas de rendimiento detectados."
  },
  {
    id: "ant-004",
    name: "Estación Este",
    type: AntennaType.MACRO,
    status: AntennaStatus.INACTIVE,
    location: {
      lat: 40.4280,
      lng: -3.6800
    },
    height: 50,
    azimuth: 270,
    tilt: 4,
    frequency: "700 MHz",
    power: 45,
    gain: 20,
    bandwidth: "25 MHz",
    installation_date: "2021-12-10",
    last_maintenance: "2023-11-25",
    notes: "Antena desactivada temporalmente por obras en la zona."
  },
  {
    id: "ant-005",
    name: "Punto Oeste",
    type: AntennaType.MICRO,
    status: AntennaStatus.ACTIVE,
    location: {
      lat: 40.4150,
      lng: -3.7250
    },
    height: 30,
    azimuth: 45,
    tilt: 2,
    frequency: "2100 MHz",
    power: 25,
    gain: 16,
    bandwidth: "20 MHz",
    installation_date: "2022-08-22",
    last_maintenance: "2024-02-28",
    notes: "Funcionamiento óptimo. Área con alta densidad de usuarios."
  }
];

export const getAntennaStatusCount = () => {
  const statusCounts = {
    active: 0,
    inactive: 0,
    maintenance: 0,
    alert: 0
  };
  
  SAMPLE_ANTENNAS.forEach(antenna => {
    if (antenna.status === AntennaStatus.ACTIVE) statusCounts.active++;
    else if (antenna.status === AntennaStatus.INACTIVE) statusCounts.inactive++;
    else if (antenna.status === AntennaStatus.MAINTENANCE) statusCounts.maintenance++;
    else if (antenna.status === AntennaStatus.ALERT) statusCounts.alert++;
  });
  
  return statusCounts;
};

export const getAntennaTypeDistribution = () => {
  const typeCounts = {
    macro: 0,
    micro: 0,
    small: 0
  };
  
  SAMPLE_ANTENNAS.forEach(antenna => {
    if (antenna.type === AntennaType.MACRO) typeCounts.macro++;
    else if (antenna.type === AntennaType.MICRO) typeCounts.micro++;
    else if (antenna.type === AntennaType.SMALL) typeCounts.small++;
  });
  
  return typeCounts;
};
