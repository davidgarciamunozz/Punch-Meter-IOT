"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

// Valor por defecto para evitar renderizado diferente entre servidor y cliente
const defaultContextValue: AuthContextType = {
  user: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAdmin: false,
  isLoading: true,
  error: null
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          return;
        }

        if (userData) {
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role
          });
          setToken(session.access_token);
          setIsAdmin(userData.role === 'admin');
        }
      } else {
        setUser(null);
        setToken(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError(authError.message);
        return false;
      }

      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          setError(userError.message);
          return false;
        }

        if (userData) {
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role
          });
          setToken(data.session?.access_token || null);
          setIsAdmin(userData.role === 'admin');
          return true;
        }
      }
      return false;
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });

      if (authError) {
        setError(authError.message);
        return false;
      }

      if (authData.user) {
        // Create the user profile in the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              username,
              email,
              role: 'user'
            }
          ])
          .select()
          .single();

        if (userError) {
          setError(userError.message);
          return false;
        }

        if (userData) {
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role
          });
          setToken(authData.session?.access_token || null);
          return true;
        }
      }
      return false;
    } catch (err) {
      setError('An error occurred during registration');
      console.error('Registration error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAdmin,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 