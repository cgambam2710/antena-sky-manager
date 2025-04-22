
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  username: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          // Clear session data
          setSession(null);
          setUser(null);
          // Clear any cached data
          window.location.reload();
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        toast.error('Error al cargar el perfil');
        throw error;
      }

      return data as UserProfile | null;
    },
    enabled: !!user?.id,
  });

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Error al iniciar sesión: ' + error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      toast.error('Error al registrarse: ' + error.message);
      throw error;
    }

    toast.success('Usuario creado exitosamente');
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error al cerrar sesión');
      throw error;
    }
  };

  return {
    user,
    session,
    profile,
    isAdmin: profile?.role === 'admin',
    signIn,
    signUp,
    signOut,
  };
}
