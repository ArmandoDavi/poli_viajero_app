import { useState } from 'react';

export function ModalPerfil({ email, onClose }: { email: string, onClose: () => void }) {
  const [datos, setDatos] = useState({ 
    escuela_origen: "",
    carrera: "", 
    semestre: "",
    descripcion_corta: "",
    biografia: ""
  });

  const guardarPerfil = async () => {
    await fetch("http://127.0.0.1:8000/api/perfil/completar", {
      method: "POST",
      body: JSON.stringify({ email, ...datos }),
      headers: { "Content-Type": "application/json" }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#18020E] p-8 rounded-3xl border border-[#ED128E] w-full max-w-md shadow-2xl">
        <h2 className="text-white text-2xl font-bold mb-2">Completa tu perfil</h2>
        <p className="text-[#A0A0A0] text-sm mb-6">Ayuda a otros a conocerte mejor en la red.</p>
        
        <div className="space-y-3">
          <input 
            placeholder="Escuela de origen (Ej. ESCOM-IPN)" 
            onChange={e => setDatos({...datos, escuela_origen: e.target.value})} 
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-[#4A0A2D] focus:outline-none focus:border-[#ED128E] transition-colors" 
          />
          
          <div className="grid grid-cols-2 gap-3">
            <input 
              placeholder="Carrera (Ej. ISC)" 
              onChange={e => setDatos({...datos, carrera: e.target.value})} 
              className="w-full p-3 rounded-xl bg-white/5 text-white border border-[#4A0A2D] focus:outline-none focus:border-[#ED128E] transition-colors" 
            />
            <input 
              placeholder="Semestre (Ej. 6to)" 
              onChange={e => setDatos({...datos, semestre: e.target.value})} 
              className="w-full p-3 rounded-xl bg-white/5 text-white border border-[#4A0A2D] focus:outline-none focus:border-[#ED128E] transition-colors" 
            />
          </div>

          <input 
            placeholder="Frase o Subtítulo" 
            onChange={e => setDatos({...datos, descripcion_corta: e.target.value})} 
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-[#4A0A2D] focus:outline-none focus:border-[#ED128E] transition-colors" 
          />
          
          <textarea 
            placeholder="Biografía (¡Cuéntanos sobre ti y tus viajes!)" 
            rows={3}
            onChange={e => setDatos({...datos, biografia: e.target.value})} 
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-[#4A0A2D] focus:outline-none focus:border-[#ED128E] transition-colors resize-none" 
          />
          
          <button 
            onClick={guardarPerfil} 
            className="w-full bg-[#ED128E] py-3 mt-4 rounded-xl text-white font-bold hover:bg-[#c90d76] transition-colors shadow-lg"
          >
            Guardar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}