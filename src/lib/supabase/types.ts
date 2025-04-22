
export interface Database {
  public: {
    Tables: {
      antennas: {
        Row: {
          id: string
          name: string
          type: "macro" | "micro" | "small"
          status: "active" | "inactive" | "maintenance" | "alert"
          lat: number
          lng: number
          height: number
          azimuth: number | null
          tilt: number | null
          frequency: string
          power: number
          gain: number
          bandwidth: string | null
          installation_date: string
          last_maintenance: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['antennas']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['antennas']['Insert']>
      }
      maintenance_logs: {
        Row: {
          id: string
          antenna_id: string
          maintenance_date: string
          type: "preventive" | "corrective" | "installation" | "upgrade"
          description: string
          technician: string
          status: "completed" | "pending" | "in_progress"
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['maintenance_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['maintenance_logs']['Insert']>
      }
    }
  }
}
