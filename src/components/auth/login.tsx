"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"

export default function Login() {
  const { login, error, isLoading, user, isAdmin } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    setClientLoading(isLoading);
  }, [isLoading]);
  
  useEffect(() => {
    // Redirigir al usuario si ya está autenticado
    if (mounted && !isLoading && user) {
      // Si es admin, redirigir a /admin; si no, al dashboard normal
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, isAdmin, isLoading, router, mounted]);
  
  useEffect(() => {
    // Redirect after successful login
    if (success) {
      // Comprobar si es admin para redirigir al panel de administración
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [success, router, isAdmin]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const fillAdminCredentials = () => {
    setFormData({
      email: "admin@punchmeter.com",
      password: "admin123"
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    const { email, password } = formData;
    
    if (!email || !password) {
      setFormError("All fields are required");
      return;
    }
    
    const result = await login(email, password);
    
    if (result) {
      setSuccess(true);
    }
  };

  // Renderizado condicional solo cuando el componente está montado
  if (!mounted) {
    return null; // No renderizamos nada durante SSR
  }

  // Una vez montado, si está cargando o el usuario ya está autenticado
  if (clientLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  // Si el usuario ya está autenticado, no renderizamos nada (la redirección se hará por el useEffect)
  if (user) {
    return null;
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/boxing-background.jpg"
          alt="Boxer background"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-4 py-6 md:px-8 lg:px-16">
        {/* Logo */}
        <div className="mt-4 w-full max-w-[160px] md:max-w-[200px]">
        <Link href="/">
            <Image src="/media/EverlastLogo.png" alt="Everlast Logo" width={220} height={80} className="w-full" />
          </Link>
        </div>

        {/* Login Form */}
        <div className="mt-8 w-full max-w-sm rounded-lg border border-gray-700 bg-black/40 p-5 backdrop-blur-sm md:max-w-md">
          <h2 className="mb-6 text-3xl font-bold italic text-white">Log in</h2>

          {/* Admin Credentials Info */}
          <div className="mb-4 rounded-md border border-yellow-500/50 bg-yellow-500/20 p-3">
            <p className="text-sm text-yellow-300">
              <strong>Para acceso de administrador:</strong><br />
              Email: admin@punchmeter.com<br />
              Password: admin123
            </p>
            <button
              type="button" 
              onClick={fillAdminCredentials}
              className="mt-2 flex w-full items-center justify-center rounded-md bg-yellow-600/50 px-3 py-1 text-sm font-medium text-white hover:bg-yellow-600"
            >
              <Shield className="mr-1 h-4 w-4" /> Rellenar credenciales de admin
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {(formError || error) && (
              <div className="rounded-md border border-red-400 bg-red-600/20 px-4 py-2 text-white">
                {formError || error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            {/* Login Button */}
            <button 
              type="submit"
              className="mt-5 w-full rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5 text-lg font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-white">Don&apos;t have an account?</p>
          <Link
            href="/register"
            className="mt-2 inline-block rounded-full border-2 border-yellow-500 px-8 py-2 text-center text-white hover:bg-yellow-500 hover:text-black"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  )
}
