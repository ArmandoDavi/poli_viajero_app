import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertCircle, X, Compass, Eye, EyeOff } from "lucide-react"; // <-- Agregamos iconos para ver/ocultar contraseña

// --- LA MAGIA ESTÁ AQUÍ ---
// Importamos el modal completo desde su archivo externo
import { ModalPerfil } from "./app/components/ModalPerfil";
// -------------------------

// CATÁLOGO DE PAÍSES DESTINO
const PAISES_DESTINO = [
  { id: 'DE', nombre: 'Alemania', bandera: '🇩🇪' },
  { id: 'AR', nombre: 'Argentina', bandera: '🇦🇷' },
  { id: 'BR', nombre: 'Brasil', bandera: '🇧🇷' },
  { id: 'CA', nombre: 'Canadá', bandera: '🇨🇦' },
  { id: 'KR', nombre: 'Corea del Sur', bandera: '🇰🇷' },
  { id: 'CO', nombre: 'Colombia', bandera: '🇨🇴' },
  { id: 'CL', nombre: 'Chile', bandera: '🇨🇱' },
  { id: 'ES', nombre: 'España', bandera: '🇪🇸' },
  { id: 'US', nombre: 'Estados Unidos', bandera: '🇺🇸' },
  { id: 'FR', nombre: 'Francia', bandera: '🇫🇷' },
  { id: 'IT', nombre: 'Italia', bandera: '🇮🇹' },
  { id: 'JP', nombre: 'Japón', bandera: '🇯🇵' },
  { id: 'MX', nombre: 'México', bandera: '🇲🇽' },
  { id: 'GB', nombre: 'Reino Unido', bandera: '🇬🇧' },
  { id: 'OT', nombre: 'Otro destino', bandera: '🌍' }
];

export default function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [boleta, setBoleta] = useState("");
  
  // NUEVO ESTADO PARA LA CONTRASEÑA (Solo visual)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Para alternar ver/ocultar
  
  const [movilidad, setMovilidad] = useState("");
  const [destino, setDestino] = useState("");
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      apellidoPaterno.trim() === "" ||
      apellidoMaterno.trim() === "" ||
      email.trim() === "" ||
      boleta.trim() === "" ||
      password.trim() === "" || 
      movilidad === "" ||
      destino.trim() === ""
    ) {
      setShowError(true);
      return;
    }

    // 1. JUNTAMOS EL NOMBRE COMPLETO
    const nombreCompleto = `${nombre.trim()} ${apellidoPaterno.trim()} ${apellidoMaterno.trim()}`;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/registro", {
        method: "POST",
        body: JSON.stringify({ 
          nombre: nombreCompleto, // Enviamos el nombre ya unido
          email: email.trim(), 
          boleta: boleta.trim(), 
          movilidad, 
          destino 
        }),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        localStorage.setItem("boleta", boleta);
        setShowModal(true);
      } else {
        // 2. HACEMOS QUE REACT "HABLE" SI HAY UN ERROR
        const errorData = await res.json();
        // Lanzamos una alerta nativa con el mensaje que viene desde Python
        alert(`No se pudo crear la cuenta: ${errorData.detail}`); 
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')" }}></div>
      <div className="absolute inset-0 bg-[#18020E]/85 z-0"></div>

      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] my-4">
        <div className="flex flex-col items-center mb-6">
          {/* REGRESAMOS TU ÍCONO ORIGINAL DE LA BRÚJULA */}
          <Compass className="w-8 h-8 text-[#ED128E] mb-3" />
          <h1 className="text-2xl font-semibold text-white mb-2">Únete a El Poli Viajero</h1>
          <p className="text-sm text-gray-300 text-center px-2">Crea tu cuenta con tu número de boleta y conecta con otros estudiantes por el mundo.</p>
        </div>

        <form onSubmit={manejarSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 ml-1">Nombre(s)</label>
            <input type="text" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">Apellido Paterno</label>
              <input type="text" placeholder="Primer apellido" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">Apellido Materno</label>
              <input type="text" placeholder="Segundo apellido" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">Correo Electrónico</label>
              <input type="email" placeholder="ejemplo@alumno.ipn.mx" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">Número de Boleta</label>
              <input type="text" placeholder="Ej. 2024630000" value={boleta} onChange={(e) => setBoleta(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm" />
            </div>
          </div>

          {/* NUEVO CAMPO DE CONTRASEÑA */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 ml-1">Crear Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Mínimo 8 caracteres" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-medium text-gray-300 ml-1">Estatus de Movilidad</label>
            <div className="grid grid-cols-3 gap-2">
              {["Ya fui", "Estoy ahí", "Me iré"].map((opcion) => (
                <button key={opcion} type="button" onClick={() => setMovilidad(opcion)} className={`py-2 px-1 text-xs sm:text-sm rounded-xl border transition-all ${movilidad === opcion ? "bg-[#ED128E]/20 border-[#ED128E] text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200"}`}>{opcion}</button>
              ))}
            </div>
          </div>

          {movilidad && (
            <div className="space-y-1.5 pt-1 transition-all duration-300">
              <label className="text-xs font-medium text-gray-300 ml-1">Destino</label>
              {/* CAMBIO: Transformamos el input en un elemento select nativo */}
              <select 
                value={destino} 
                onChange={(e) => setDestino(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm appearance-none"
              >
                <option value="" disabled className="text-gray-500 bg-[#18020E]">Selecciona tu país destino...</option>
                {PAISES_DESTINO.map((pais) => (
                  <option key={pais.id} value={`${pais.nombre} ${pais.bandera}`} className="text-white bg-[#18020E]">
                    {pais.bandera} {pais.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-2xl mt-4 hover:bg-gray-100 transition-colors shadow-lg text-sm">Crear cuenta</button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">¿Ya tienes una cuenta? <Link to="/" className="text-[#ED128E] font-medium hover:text-white transition-colors">Inicia sesión aquí</Link></p>
        </div>
      </div>

      {showModal && <ModalPerfil email={email} onClose={() => navigate("/feed")} />}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-[#18020E] border border-[#ED128E]/50 rounded-2xl p-6 text-center">
            <button onClick={() => setShowError(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            <AlertCircle className="w-12 h-12 text-[#ED128E] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">¡Faltan datos!</h3>
            <p className="text-sm text-gray-300 mb-6">Por favor, llena todos los campos para continuar.</p>
            <button onClick={() => setShowError(false)} className="w-full bg-[#ED128E] text-white font-semibold py-3 rounded-xl">Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
}