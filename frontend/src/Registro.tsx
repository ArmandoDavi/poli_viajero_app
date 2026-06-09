import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertCircle, X, Compass } from "lucide-react";

export default function Registro() {
  const navigate = useNavigate();

  // --- MEMORIA DE LOS CAMPOS ---
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [boleta, setBoleta] = useState("");
  const [movilidad, setMovilidad] = useState("");
  const [destino, setDestino] = useState("");

  // --- CONTROLADOR DE LA ALERTA ---
  const [showError, setShowError] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-sans">
      {/* Fondo de Mapa */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')",
        }}
      ></div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-[#18020E]/85 z-0"></div>

      {/* Panel Glassmorphism */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] my-4">
        {/* Cabecera */}
        <div className="flex flex-col items-center mb-6">
          <Compass className="w-8 h-8 text-[#ED128E] mb-3" />
          <h1 className="text-2xl font-semibold text-white mb-2">
            Únete a El Poli Viajero
          </h1>
          <p className="text-sm text-gray-300 text-center px-2">
            Crea tu cuenta con tu número de boleta y conecta con otros
            estudiantes por el mundo.
          </p>
        </div>

        {/* Formulario */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            // --- EL CANDADO DE VALIDACIÓN ---
            // Revisamos que ningún campo esté vacío
            if (
              nombre.trim() === "" ||
              apellidoPaterno.trim() === "" ||
              apellidoMaterno.trim() === "" ||
              email.trim() === "" ||
              boleta.trim() === "" ||
              movilidad === "" || // Revisa que sí escogió un botón de estatus
              destino.trim() === "" // Revisa que llenó el destino
            ) {
              setShowError(true);
              return;
            }
            // ----------------------------------------

            console.log("¡Nuevo viajero registrado!", {
              nombre,
              apellidoPaterno,
              apellidoMaterno,
              email,
              boleta,
              movilidad,
              destino,
            });
            navigate("/feed");
          }}
        >
          {/* Fila 1: Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 ml-1">
              Nombre(s)
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm"
            />
          </div>

          {/* Fila 2: Apellidos (2 columnas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Apellido Paterno
              </label>
              <input
                type="text"
                placeholder="Primer apellido"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Apellido Materno
              </label>
              <input
                type="text"
                placeholder="Segundo apellido"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm"
              />
            </div>
          </div>

          {/* Fila 3: Correo y Boleta (2 columnas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@alumno.ipn.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Número de Boleta
              </label>
              <input
                type="text"
                placeholder="Ej. 2024630000"
                value={boleta}
                onChange={(e) => setBoleta(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm"
              />
            </div>
          </div>

          {/* Fila 4: Botones de Estatus */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-medium text-gray-300 ml-1">
              Estatus de Movilidad
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Ya fui", "Estoy ahí", "Me iré"].map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => setMovilidad(opcion)}
                  className={`py-2 px-1 text-xs sm:text-sm rounded-xl border transition-all ${
                    movilidad === opcion
                      ? "bg-[#ED128E]/20 border-[#ED128E] text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200"
                  }`}
                >
                  {opcion}
                </button>
              ))}
            </div>
          </div>

          {/* Fila 5: Destino */}
          {movilidad && (
            <div className="space-y-1.5 pt-1 transition-all duration-300">
              <label className="text-xs font-medium text-gray-300 ml-1">
                {movilidad === "Ya fui"
                  ? "¿A qué país o escuela fuiste?"
                  : movilidad === "Estoy ahí"
                  ? "¿En qué país o escuela estás?"
                  : "¿A qué país o escuela te vas?"}
              </label>
              <input
                type="text"
                placeholder="Ej. Corea del Sur, ESCOM, etc."
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#ED128E] focus:ring-1 focus:ring-[#ED128E] transition-all text-sm"
              />
            </div>
          )}

          {/* Botón Principal */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-2xl mt-4 hover:bg-gray-100 transition-colors shadow-lg text-sm"
          >
            Crear cuenta
          </button>
        </form>

        {/* Footer para regresar al Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/"
              className="text-[#ED128E] font-medium hover:text-white transition-colors"
            >
              Inicia sesión aquí
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
              Por favor, llena todos los campos, selecciona tu estatus de movilidad y tu destino para crear tu cuenta en El Poli Viajero.
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
    </div>
  );
}