import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatListItem } from './ChatListItem'; 
import { ChatWindow } from './ChatWindow'; 

interface MessagesViewProps {
  isDarkMode: boolean;
  targetBoleta?: string | null;      
  onClearTarget?: () => void;        
}

export function MessagesView({ isDarkMode, targetBoleta, onClearTarget }: MessagesViewProps) {
  const location = useLocation();
  const [contactos, setContactos] = useState<any[]>([]);
  const [contactoSeleccionado, setContactoSeleccionado] = useState<any | null>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);

  const miBoleta = localStorage.getItem("boleta") || "";

  // 1. CARGAR SOLO CONTACTOS CON LOS QUE HE HABLADO
  useEffect(() => {
    fetch(`http://localhost:8000/api/mensajes/contactos/${miBoleta}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setContactos(data);
        }
      })
      .catch(err => console.error("Error cargando contactos:", err));
  }, [miBoleta]);

  // 2. MANEJAR CUANDO DAMOS CLIC A "CONTACTAR" A ALGUIEN NUEVO
  useEffect(() => {
    // Revisamos si traemos instrucción del Perfil o del Mercado
    const boletaBuscada = targetBoleta || location.state?.vendedorBoleta;

    const abrirChatRequerido = async () => {
      if (!boletaBuscada) return;

      // Primero, vemos si esa persona ya está en nuestra lista de chats activos
      const existe = contactos.find(c => String(c.boleta) === String(boletaBuscada));
      
      if (existe) {
        setContactoSeleccionado(existe);
      } else {
        // Si no está, es un CHAT NUEVO. Vamos por sus datos para agregarlo a la lista.
        try {
          const res = await fetch(`http://localhost:8000/api/usuarios/${boletaBuscada}`);
          const nuevoUsuario = await res.json();
          
          if (!nuevoUsuario.detail) {
            // Lo ponemos hasta arriba de la lista
            setContactos(prev => {
              // Evitar duplicados por si React corre esto dos veces rápido
              if (prev.find(c => String(c.boleta) === String(boletaBuscada))) return prev;
              return [nuevoUsuario, ...prev];
            });
            setContactoSeleccionado(nuevoUsuario);
          }
        } catch (error) {
          console.error("Error agregando nuevo chat:", error);
        }
      }

      // Limpiamos los "radares" para que no se quede trabado abriendo este chat
      if (onClearTarget && targetBoleta) onClearTarget();
      if (location.state?.vendedorBoleta) {
        window.history.replaceState({}, document.title);
      }
    };

    abrirChatRequerido();
  }, [targetBoleta, location.state]);

  // 3. EL RELOJ: Cargar mensajes con el contacto seleccionado cada 2 segundos
  useEffect(() => {
    let intervalo: ReturnType<typeof setInterval>;

    const cargarMensajes = async () => {
      if (!contactoSeleccionado) return;
      try {
        const res = await fetch(`http://localhost:8000/api/mensajes/${miBoleta}/${contactoSeleccionado.boleta}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const mensajesFormateados = data.map((msg: any) => ({
            id: msg.id,
            text: msg.texto,
            isMine: msg.remitente_boleta === miBoleta,
            time: msg.fecha
          }));
          setMensajes(mensajesFormateados);
        }
      } catch (error) {
        console.error("Error cargando el chat:", error);
      }
    };

    if (contactoSeleccionado) {
      cargarMensajes(); 
      intervalo = setInterval(cargarMensajes, 2000); 
    }

    return () => clearInterval(intervalo);
  }, [contactoSeleccionado, miBoleta]);

  // 4. FUNCIÓN PARA ENVIAR UN NUEVO MENSAJE
  const handleEnviarMensaje = async (texto: string) => {
    if (!contactoSeleccionado) return;

    try {
      await fetch("http://localhost:8000/api/mensajes/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          remitente_boleta: miBoleta,
          receptor_boleta: contactoSeleccionado.boleta,
          texto: texto
        })
      });
      // El reloj se encargará de mostrarlo automáticamente
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6 p-6">
      {/* Panel Izquierdo: Lista de Contactos */}
      <div className={`w-80 flex flex-col rounded-2xl overflow-hidden border ${
        isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
      }`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-[#2D0418]' : 'border-[#F0D0E0]'}`}>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333333]'}`}>
            Mensajes
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contactos.map((contacto) => (
            <ChatListItem
              key={contacto.boleta}
              name={`${contacto.nombre.split(' ')[0]} (${contacto.destino !== '---' ? contacto.destino : 'Sin destino'})`}
              avatar={contacto.foto_perfil ? `${contacto.foto_perfil}?t=${Date.now()}` : 'https://placehold.co/100x100/18020E/A0A0A0?text=U'}
              lastMessage="Toca para iniciar chat"
              time=""
              isOnline={true}
              isSelected={contactoSeleccionado?.boleta === contacto.boleta}
              onClick={() => setContactoSeleccionado(contacto)}
              isDarkMode={isDarkMode}
            />
          ))}
          {contactos.length === 0 && (
            <div className={`p-6 text-center text-sm flex flex-col items-center gap-3 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
              <div className="w-16 h-16 rounded-full bg-[#750946]/20 flex items-center justify-center mb-2">
                 <span className="text-2xl">💬</span>
              </div>
              Aún no tienes mensajes. Explora el mercado o el feed para conectar con otros viajeros.
            </div>
          )}
        </div>
      </div>

      {/* Panel Derecho: Ventana de Chat */}
      <div className="flex-1 h-full">
        {contactoSeleccionado ? (
          <ChatWindow
            contactName={contactoSeleccionado.nombre.split(' ')[0]}
            contactAvatar={contactoSeleccionado.foto_perfil ? `${contactoSeleccionado.foto_perfil}?t=${Date.now()}` : 'https://placehold.co/100x100/18020E/A0A0A0?text=U'}
            lastSeen="En línea"
            messages={mensajes}
            isDarkMode={isDarkMode}
            onSendMessage={handleEnviarMensaje}
          />
        ) : (
          <div className={`h-full flex items-center justify-center rounded-2xl border ${
            isDarkMode ? 'bg-[#18020E] border-[#2D0418]' : 'bg-white border-[#F0D0E0]'
          }`}>
            <p className={`${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
              Selecciona un chat de la lista para empezar a enviar mensajes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}