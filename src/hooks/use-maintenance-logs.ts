
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/lib/supabase/types';

type MaintenanceLog = Database['public']['Tables']['maintenance_logs']['Row'];
type NewMaintenanceLog = Database['public']['Tables']['maintenance_logs']['Insert'];

export function useMaintenanceLogs(antennaId?: string) {
  const queryClient = useQueryClient();

  const { data: logs, isLoading } = useQuery({
    queryKey: ['maintenance-logs', antennaId],
    queryFn: async () => {
      const query = supabase
        .from('maintenance_logs')
        .select('*')
        .order('maintenance_date', { ascending: false });

      if (antennaId) {
        query.eq('antenna_id', antennaId);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Error al cargar los registros de mantenimiento');
        throw error;
      }

      return data as MaintenanceLog[];
    },
    enabled: !!antennaId,
  });

  const createMaintenanceLog = useMutation({
    mutationFn: async (newLog: NewMaintenanceLog) => {
      const { data, error } = await supabase
        .from('maintenance_logs')
        .insert([newLog])
        .select()
        .single();

      if (error) {
        toast.error('Error al crear el registro de mantenimiento');
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-logs'] });
      toast.success('Registro de mantenimiento creado exitosamente');
    },
  });

  return {
    logs,
    isLoading,
    createMaintenanceLog
  };
}
