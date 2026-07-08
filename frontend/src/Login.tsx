import { Link, useNavigate } from "react-router-dom";
import { Eye, Compass, AlertCircle, X } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  // Cambiamos 'email' por 'boleta'
  const [boleta, setBoleta] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para mensajes dinámicos

  // --- FUNCIÓN DE INICIO DE SESIÓN CONECTADA AL BACKEND ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validación de campos vacíos
    if (boleta.trim() === "" || password.trim() === "") {
      setErrorMessage("Por favor, llena tu boleta y contraseña para poder ingresar.");
      setShowError(true);
      return; 
    }

    try {
      // 2. Petición al backend (FastAPI)
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boleta: boleta.trim() // El backend espera este campo exacto
        })
      });

      const data = await res.json();

      // 3. Si el login es exitoso
      if (res.ok && data.status === "success") {
        console.log("¡Inicio de sesión exitoso!");
        
        // --- EL PASO MÁGICO ---
        // Guardamos la boleta en la memoria del navegador para que el Feed sepa quién eres
        localStorage.setItem("boleta", data.boleta);
        
        // Redirigimos al Feed Principal
        navigate("/feed");
      } else {
        // 4. Si la boleta no existe, mostramos el error de Python en el Modal
        setErrorMessage(data.detail || "No pudimos iniciar sesión. Verifica tus datos.");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error conectando con el servidor:", error);
      setErrorMessage("Error de conexión con el servidor. Verifica que tu backend esté encendido.");
      setShowError(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-sans">
      {/* 1. Fondo de Mapa */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')",
        }}
      ></div>

      {/* 2. Capa oscura guinda/cereza sobre el mapa */}
      <div className="absolute inset-0 bg-[#18020E]/85 z-0"></div>

      {/* 3. Panel Glassmorphism */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {/* Cabecera */}
        <div className="flex flex-col items-center mb-8">
          <Compass className="w-8 h-8 text-[#ED128E] mb-4" />
          <h1 className="text-3xl font-semibold text-white mb-2">
            El Poli Viajero
          </h1>
          <p className="text-sm text-gray-300 text-center px-4">
            Inicia sesión para acceder a tus destinos, red de contactos y
            publicaciones.
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Input Boleta (Antes Email) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 ml-1">
              Boleta
            </label>
            <input
              type="text" // Cambiado de email a text
              placeholder="Ingresa tu número de boleta"
              value={boleta}
              onChange={(e) => setBoleta(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all"
            />
          </div>

          {/* Input Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Opciones extra */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4 rounded border border-white/30 bg-white/5 group-hover:border-[#ED128E] transition-colors">
                <input
                  type="checkbox"
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
              </div>
              <span className="text-sm text-gray-300">Recordar sesión</span>
            </label>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón Principal */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-2xl mt-4 hover:bg-gray-100 transition-colors shadow-lg"
          >
            Ingresar
          </button>
        </form>

        {/* Separador */}
        <div className="relative flex items-center justify-center mt-8 mb-6">
          <div className="absolute w-full border-t border-white/10"></div>
          <span className="relative bg-[#250918] px-3 text-xs text-gray-400 rounded-full"></span>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registro"
              className="text-[#ED128E] font-medium hover:text-white transition-colors"
            >
              Crea una
            </Link>
          </p>
        </div>
      </div>

      {/* --- MODAL DE ALERTA DINÁMICO --- */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#18020E] border border-[#ED128E]/50 rounded-2xl p-6 shadow-[0_0_40px_-10px_rgba(237,18,142,0.3)] text-center">
            
            <button 
              onClick={() => setShowError(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#ED128E]/20 mb-4">
              <AlertCircle className="w-8 h-8 text-[#ED128E]" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Aviso
            </h3>
            {/* Aquí inyectamos el mensaje de error que viene de Python o de la validación */}
            <p className="text-sm text-gray-300 mb-6">
              {errorMessage}
            </p>

            <button
              onClick={() => setShowError(false)}
              className="w-full bg-[#ED128E] text-white font-semibold py-3 rounded-xl hover:bg-[#c90d76] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}