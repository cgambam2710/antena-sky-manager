
export enum AntennaStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
  ALERT = "alert"
}

export enum AntennaType {
  MACRO = "macro",
  MICRO = "micro",
  SMALL = "small"
}

export interface Antenna {
  id: string;
  name: string;
  type: AntennaType;
  status: AntennaStatus;
  location: {
    lat: number;
    lng: number;
  };
  height: number; // metros
  azimuth: number; // grados
  tilt: number; // grados
  frequency: string;
  power: number; // dBm
  gain: number; // dBi
  bandwidth: string;
  installation_date: string;
  last_maintenance: string;
  notes?: string;
}
