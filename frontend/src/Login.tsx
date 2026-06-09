import { Link, useNavigate } from "react-router-dom";
import { Eye, Compass, AlertCircle, X } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
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
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            // --- NUEVO: El candado de validación ---
            if (email.trim() === "" || password.trim() === "") {
              setShowError(true); // <-- Encendemos la alerta visual
              return; 
            }
            console.log("¡Datos capturados exitosamente!", {
              correo: email,
              contra: password,
            });
            navigate("/feed");
          }}
        >
          {/* Input Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password} // <--- Conecta la variable
                onChange={(e) => setPassword(e.target.value)} // <--- Guarda lo que escribes
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
                {/* Check icon simulado */}
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

          {/* Botón Principal (Blanco para resaltar como en la referencia) */}
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
          <span className="relative bg-[#250918] px-3 text-xs text-gray-400 rounded-full">
            O
          </span>
        </div>

        {/* Botón Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center space-x-2 bg-transparent border border-white/10 hover:bg-white/5 text-white py-3 rounded-2xl transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-medium">Inicia sesión con Google</span>
        </button>

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
      {/* --- MODAL DE ALERTA PERSONALIZADO --- */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#18020E] border border-[#ED128E]/50 rounded-2xl p-6 shadow-[0_0_40px_-10px_rgba(237,18,142,0.3)] text-center">
            
            {/* Botón de cerrar (X) en la esquina */}
            <button 
              onClick={() => setShowError(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ícono de advertencia animado */}
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#ED128E]/20 mb-4">
              <AlertCircle className="w-8 h-8 text-[#ED128E]" />
            </div>

            {/* Textos */}
            <h3 className="text-xl font-bold text-white mb-2">
              ¡Faltan datos!
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              Por favor, llena tu correo y contraseña para poder ingresar a El Poli Viajero.
            </p>

            {/* Botón de acción */}
            <button
              onClick={() => setShowError(false)}
              className="w-full bg-[#ED128E] text-white font-semibold py-3 rounded-xl hover:bg-[#c90d76] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
      {/* --- FIN DEL MODAL --- */}
    </div>
  );
}
