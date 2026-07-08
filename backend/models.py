from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class UsuarioDB(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    boleta = Column(String, unique=True, index=True)
    movilidad = Column(String)
    destino = Column(String)
    
    escuela_origen = Column(String, nullable=True)
    carrera = Column(String, nullable=True)
    semestre = Column(String, nullable=True)
    descripcion_corta = Column(String, nullable=True)
    biografia = Column(String, nullable=True)

    # NUEVO: Columnas para almacenar las URLs de las fotos
    foto_perfil = Column(String, default="https://placehold.co/200x200/18020E/A0A0A0?text=Añadir+Foto")
    foto_portada = Column(String, default="https://placehold.co/800x200/18020E/A0A0A0?text=Añadir+Portada")


# NUEVO: Tabla para almacenar las publicaciones permanentemente
class PostDB(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    boleta_usuario = Column(String, index=True)  # Relación con el creador del post
    username = Column(String)
    profile_image = Column(String)
    time_posted = Column(String)
    post_text = Column(String)
    post_image = Column(String, nullable=True)  # URL si la publicación lleva foto
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)


    # NUEVO: Tabla para el Mercado
class ProductDB(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    location = Column(String)
    price = Column(String)
    category = Column(String)
    description = Column(String)
    image = Column(String, nullable=True)
    
    # Datos del vendedor
    seller_boleta = Column(String)
    seller_name = Column(String)
    seller_img = Column(String)

# NUEVO: Tabla para los Eventos del Calendario Personal
class EventoDB(Base):
    __tablename__ = "eventos"

    id = Column(Integer, primary_key=True, index=True)
    boleta_usuario = Column(String, index=True)  # La clave para que sean privados
    tipo = Column(String)
    titulo = Column(String)
    detalle = Column(String)
    fecha = Column(String)


# NUEVO: Tabla para los Mensajes Privados
class MensajeDB(Base):
    __tablename__ = "mensajes"

    id = Column(Integer, primary_key=True, index=True)
    remitente_boleta = Column(String, index=True)
    receptor_boleta = Column(String, index=True)
    texto = Column(String)
    fecha = Column(String) # Guardaremos la fecha/hora en formato texto