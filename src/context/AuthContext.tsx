"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// API Base URL para el servidor de autenticación
const API_BASE_URL = 'http://localhost:5001/api';

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
  const [isMounted, setIsMounted] = useState(false);

  // Marcar cuando el componente está montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if user is already logged in on initial load
  useEffect(() => {
    // Solo ejecutar esta lógica en el cliente y cuando el componente esté montado
    if (isMounted) {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        setToken(storedToken);
        fetchCurrentUser(storedToken);
      } else {
        setIsLoading(false);
      }
    }
  }, [isMounted]);

  // Effect to set isAdmin whenever user changes
  useEffect(() => {
    if (user?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      // Token especial para admin
      if (authToken === 'admin_token') {
        const adminUser = {
          id: "admin-001",
          username: "Administrator",
          email: "admin@punchmeter.com",
          role: "admin"
        };
        setUser(adminUser);
        setIsAdmin(true);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token is invalid or expired
        if (isMounted) {
          localStorage.removeItem('auth_token');
        }
        setToken(null);
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Usuario admin predefinido
    if (email === "admin@punchmeter.com" && password === "admin123") {
      if (isMounted) {
        localStorage.setItem('auth_token', 'admin_token');
      }
      setToken('admin_token');
      const adminUser = {
        id: "admin-001",
        username: "Administrator",
        email: "admin@punchmeter.com",
        role: "admin"
      };
      setUser(adminUser);
      setIsAdmin(true);
      setIsLoading(false);
      return true;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (isMounted) {
          localStorage.setItem('auth_token', data.token);
        }
        setToken(data.token);
        setUser(data.user);
        return true;
      } else {
        setError(data.message || 'Login failed');
        return false;
      }
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
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (isMounted) {
          localStorage.setItem('auth_token', data.token);
        }
        setToken(data.token);
        setUser(data.user);
        return true;
      } else {
        setError(data.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error('Registration error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (isMounted) {
      localStorage.removeItem('auth_token');
    }
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