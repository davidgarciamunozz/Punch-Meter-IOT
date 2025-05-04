"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const { register, error, isLoading, user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    // Redirigir al dashboard si el usuario ya está autenticado
    if (mounted && !isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router, mounted]);
  
  useEffect(() => {
    // Redirect after successful registration
    if (success) {
      router.push("/dashboard");
    }
  }, [success, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    const { username, email, password } = formData;
    
    if (!username || !email || !password) {
      setFormError("All fields are required");
      return;
    }
    
    const result = await register(username, email, password);
    if (result) {
      setSuccess(true);
    }
  };

  // Si está cargando o el usuario ya está autenticado, mostramos una pantalla de carga
  if (!mounted || isLoading) {
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

        {/* Sign Up Form */}
        <div className="mt-8 w-full max-w-sm rounded-lg border border-gray-700 bg-black/40 p-5 backdrop-blur-sm md:max-w-md">
          <h2 className="mb-6 text-3xl font-bold italic text-white">Sign up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {(formError || error) && (
              <div className="bg-red-600/20 border border-red-400 text-white px-4 py-2 rounded-md">
                {formError || error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="username" className="block text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-600/80 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

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
            
            {/* Sign Up Button */}
            <button 
              type="submit"
              className="mt-5 w-full rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5 text-lg font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-white">Do you have an account?</p>
          <Link
            href="/login"
            className="mt-2 inline-block rounded-full border-2 border-yellow-500 px-8 py-2 text-center text-white hover:bg-yellow-500 hover:text-black"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}
