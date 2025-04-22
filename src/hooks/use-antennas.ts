
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/lib/supabase/types';

type Antenna = Database['public']['Tables']['antennas']['Row'];
type NewAntenna = Database['public']['Tables']['antennas']['Insert'];

export function useAntennas() {
  const queryClient = useQueryClient();

  const { data: antennas, isLoading } = useQuery({
    queryKey: ['antennas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('antennas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Error al cargar las antenas');
        throw error;
      }

      return data as Antenna[];
    },
  });

  const createAntenna = useMutation({
    mutationFn: async (newAntenna: NewAntenna) => {
      const { data, error } = await supabase
        .from('antennas')
        .insert([newAntenna])
        .select()
        .single();

      if (error) {
        toast.error('Error al crear la antena');
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['antennas'] });
      toast.success('Antena creada exitosamente');
    },
  });

  return {
    antennas,
    isLoading,
    createAntenna
  };
}
