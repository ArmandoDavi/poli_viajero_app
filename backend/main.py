import os
import shutil
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from datetime import datetime
import time

# Importamos la conexión y el modelo de la base de datos
import models
from database import engine, SessionLocal

# Crea automáticamente el archivo de la base de datos y las tablas si no existen
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CONFIGURACIÓN DE CARPETA ESTÁTICA PARA IMÁGENES ---
# Creamos la carpeta "uploads" si no existe en tu computadora
if not os.path.exists("uploads"):
    os.makedirs("uploads")

# Exponemos la carpeta "uploads" para que React pueda leer las fotos con URLs
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELOS DE PYDANTIC ---
class Usuario(BaseModel):
    nombre: str
    email: str
    boleta: str
    movilidad: str
    destino: str

class LoginRequest(BaseModel):
    boleta: str

class ActualizarPerfil(BaseModel):
    boleta: str
    nombre: str
    escuela_origen: str
    carrera: str
    semestre: str
    destino: str
    descripcion_corta: str
    biografia: str

class CompletarPerfil(BaseModel):
    email: str
    escuela_origen: str
    carrera: str
    semestre: str
    descripcion_corta: str
    biografia: str

class PostCreate(BaseModel):
    boleta_usuario: str
    username: str
    profile_image: str
    post_text: str
    post_image: str = ""

# --- MODELO PYDANTIC PARA PRODUCTOS ---
class ProductCreate(BaseModel):
    title: str
    location: str
    price: str
    category: str
    description: str
    image: str = ""
    seller_boleta: str
    seller_name: str
    seller_img: str

# --- MODELO PYDANTIC PARA EVENTOS ---
class EventoCreate(BaseModel):
    boleta_usuario: str
    tipo: str
    titulo: str
    detalle: str
    fecha: str


# --- DEPENDENCIA DE BD ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- 1. RUTA DE REGISTRO ---
@app.post("/api/auth/registro")
def registrar_usuario(usuario: Usuario, db: Session = Depends(get_db)):
    usuario_existente = db.query(models.UsuarioDB).filter(
        (models.UsuarioDB.email == usuario.email) | 
        (models.UsuarioDB.boleta == usuario.boleta)
    ).first()
    
    if usuario_existente:
        raise HTTPException(status_code=400, detail="La boleta o el correo electrónico ya se encuentran registrados.")

    nuevo_usuario = models.UsuarioDB(
        nombre=usuario.nombre,
        email=usuario.email,
        boleta=usuario.boleta,
        movilidad=usuario.movilidad,
        destino=usuario.destino
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"status": "success", "message": "¡Usuario registrado!", "usuario_id": nuevo_usuario.id}

# --- 2. RUTA DE LOGIN ---
@app.post("/api/auth/login")
def iniciar_sesion(request: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta == request.boleta).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado. Verifica tu número de boleta.")
    return {"status": "success", "message": "Inicio de sesión exitoso", "boleta": usuario.boleta}

# --- 3. RUTA PARA COMPLETAR DATOS DEL PERFIL ---
@app.post("/api/perfil/completar")
def completar_perfil(datos: CompletarPerfil, db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.email == datos.email).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    usuario.escuela_origen = datos.escuela_origen
    usuario.carrera = datos.carrera
    usuario.semestre = datos.semestre
    usuario.descripcion_corta = datos.descripcion_corta
    usuario.biografia = datos.biografia
    
    db.commit()
    return {"status": "success", "message": "Perfil completado exitosamente"}

# --- 4. RUTA PARA OBTENER PERFIL COMPLETO (Incluyendo fotos) ---
@app.get("/api/usuarios/{boleta}")
def obtener_perfil(boleta: str, db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta == boleta).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="El usuario no fue encontrado.")
    
    return {
        "nombre": usuario.nombre,
        "email": usuario.email,
        "boleta": usuario.boleta,
        "movilidad": usuario.movilidad,
        "destino": usuario.destino,
        "escuela_origen": usuario.escuela_origen,
        "carrera": usuario.carrera,
        "semestre": usuario.semestre,
        "descripcion_corta": usuario.descripcion_corta,
        "biografia": usuario.biografia,
        "foto_perfil": usuario.foto_perfil,
        "foto_portada": usuario.foto_portada
    }

# --- 5. RUTA PARA SUBIR IMÁGENES (Perfil/Portada) ---
@app.post("/api/perfil/upload-image/{tipo}/{boleta}")
def subir_imagen_perfil(tipo: str, boleta: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta == boleta).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if tipo not in ["perfil", "portada"]:
        raise HTTPException(status_code=400, detail="Tipo de imagen inválido")

    extension = os.path.splitext(file.filename)[1]
    nombre_archivo = f"{tipo}_{boleta}{extension}"
    ruta_archivo = os.path.join("uploads", nombre_archivo)
    
    with open(ruta_archivo, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    url_publica = f"http://localhost:8000/uploads/{nombre_archivo}"
    
    if tipo == "perfil":
        usuario.foto_perfil = url_publica
    else:
        usuario.foto_portada = url_publica
        
    db.commit()
    return {"status": "success", "url": url_publica}

# --- 5B. RUTA PARA SUBIR IMÁGENES DE PUBLICACIONES ---
@app.post("/api/posts/upload-image")
def subir_imagen_post(file: UploadFile = File(...)):
    extension = os.path.splitext(file.filename)[1]
    nombre_archivo = f"post_{int(time.time())}{extension}"
    ruta_archivo = os.path.join("uploads", nombre_archivo)
    
    with open(ruta_archivo, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    url_publica = f"http://localhost:8000/uploads/{nombre_archivo}"
    
    return {"status": "success", "url": url_publica}

# --- 6. RUTA PARA CREAR PUBLICACIÓN ---
@app.post("/api/posts/crear")
def crear_publicacion(post: PostCreate, db: Session = Depends(get_db)):
    nuevo_post = models.PostDB(
        boleta_usuario=post.boleta_usuario,
        username=post.username,
        profile_image=post.profile_image,
        time_posted="Hace un momento",
        post_text=post.post_text,
        post_image=post.post_image,
        likes=0,
        comments=0
    )
    db.add(nuevo_post)
    db.commit()
    db.refresh(nuevo_post)
    return {"status": "success", "message": "Publicación guardada"}

# --- 7. RUTA PARA OBTENER LAS PUBLICACIONES DEL USUARIO ---
# --- 7. RUTA PARA OBTENER LAS PUBLICACIONES DEL USUARIO ---
@app.get("/api/posts/{boleta}")
def obtener_publicaciones(boleta: str, db: Session = Depends(get_db)):
    posts = db.query(models.PostDB).filter(models.PostDB.boleta_usuario == boleta).order_by(models.PostDB.id.desc()).all()
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta == boleta).first()
    
    resultado = []
    for post in posts:
        post_con_destino = {
            "id": post.id,
            "boleta_usuario": post.boleta_usuario,
            "username": post.username,
            "profile_image": post.profile_image,
            "time_posted": post.time_posted,
            "post_text": post.post_text,
            "post_image": post.post_image,
            "likes": post.likes,
            "comments": post.comments,
            "destino": usuario.destino if usuario else "---" 
        }
        resultado.append(post_con_destino)
        
    return resultado

# --- 8. RUTA PARA ACTUALIZAR TEXTOS DEL PERFIL ---
@app.put("/api/perfil/actualizar")
def actualizar_perfil(datos: ActualizarPerfil, db: Session = Depends(get_db)):
    usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta == datos.boleta).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    usuario.nombre = datos.nombre
    usuario.escuela_origen = datos.escuela_origen
    usuario.carrera = datos.carrera
    usuario.semestre = datos.semestre
    usuario.destino = datos.destino
    usuario.descripcion_corta = datos.descripcion_corta
    usuario.biografia = datos.biografia
    
    db.commit() 
    return {"status": "success", "message": "Textos actualizados exitosamente"}

# --- RUTA PARA OBTENER TODOS LOS USUARIOS (PARA LA LISTA DE CHAT) ---
@app.get("/api/usuarios")
def obtener_todos_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(models.UsuarioDB).all()
    return usuarios

# --- 9. RUTA PARA ELIMINAR PUBLICACIÓN ---
@app.delete("/api/posts/{post_id}")
def eliminar_publicacion(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.PostDB).filter(models.PostDB.id == post_id).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    
    db.delete(post)
    db.commit()
    
    return {"status": "success", "message": "Publicación eliminada exitosamente"}

# --- 10. RUTA PARA OBTENER EL FEED GLOBAL (Todos los usuarios) ---
# --- 10. RUTA PARA OBTENER EL FEED GLOBAL (Todos los usuarios) ---
@app.get("/api/feed")
def obtener_feed_global(db: Session = Depends(get_db)):
    # Traemos todos los posts sin filtrar
    posts = db.query(models.PostDB).order_by(models.PostDB.id.desc()).all()
    
    resultado = []
    for post in posts:
        # Buscamos al dueño de este post en la tabla de usuarios
        usuario = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta == post.boleta_usuario).first()
        
        # Armamos un diccionario combinando los datos del post con el destino del usuario
        post_con_destino = {
            "id": post.id,
            "boleta_usuario": post.boleta_usuario,
            "username": post.username,
            "profile_image": post.profile_image,
            "time_posted": post.time_posted,
            "post_text": post.post_text,
            "post_image": post.post_image,
            "likes": post.likes,
            "comments": post.comments,
            # ¡AQUÍ ESTÁ LA MAGIA! Le pegamos el destino del usuario
            "destino": usuario.destino if usuario else "---" 
        }
        resultado.append(post_con_destino)
        
    return resultado
# --- 11. RUTA PARA SUBIR FOTO DEL MERCADO ---
@app.post("/api/market/upload-image")
def subir_imagen_mercado(file: UploadFile = File(...)):
    import time
    extension = os.path.splitext(file.filename)[1]
    nombre_archivo = f"market_{int(time.time())}{extension}"
    ruta_archivo = os.path.join("uploads", nombre_archivo)
    
    with open(ruta_archivo, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    url_publica = f"http://localhost:8000/uploads/{nombre_archivo}"
    return {"status": "success", "url": url_publica}

# --- 12. RUTA PARA CREAR PRODUCTO ---
@app.post("/api/market/crear")
def crear_producto(producto: ProductCreate, db: Session = Depends(get_db)):
    nuevo_producto = models.ProductDB(
        title=producto.title,
        location=producto.location,
        price=producto.price,
        category=producto.category,
        description=producto.description,
        image=producto.image,
        seller_boleta=producto.seller_boleta,
        seller_name=producto.seller_name,
        seller_img=producto.seller_img
    )
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)
    return {"status": "success", "message": "Producto publicado"}

# --- 13. RUTA PARA OBTENER EL MERCADO GLOBAL ---
@app.get("/api/market/todos")
def obtener_mercado(db: Session = Depends(get_db)):
    productos = db.query(models.ProductDB).order_by(models.ProductDB.id.desc()).all()
    return productos

# --- 14. RUTA PARA GUARDAR UN EVENTO NUEVO ---
@app.post("/api/eventos/crear")
def crear_evento(evento: EventoCreate, db: Session = Depends(get_db)):
    nuevo_evento = models.EventoDB(
        boleta_usuario=evento.boleta_usuario,
        tipo=evento.tipo,
        titulo=evento.titulo,
        detalle=evento.detalle,
        fecha=evento.fecha
    )
    db.add(nuevo_evento)
    db.commit()
    db.refresh(nuevo_evento)
    return {"status": "success", "id": nuevo_evento.id}

# --- 15. RUTA PARA OBTENER EL CALENDARIO DEL USUARIO ---
@app.get("/api/eventos/{boleta}")
def obtener_eventos(boleta: str, db: Session = Depends(get_db)):
    eventos = db.query(models.EventoDB).filter(models.EventoDB.boleta_usuario == boleta).all()
    return eventos

# --- 16. RUTA PARA OBTENER SOLO CONTACTOS CON CHATS ACTIVOS ---
@app.get("/api/mensajes/contactos/{boleta}")
def obtener_contactos_activos(boleta: str, db: Session = Depends(get_db)):
    # 1. Buscamos todos los mensajes donde el usuario mandó o recibió
    mensajes = db.query(models.MensajeDB).filter(
        (models.MensajeDB.remitente_boleta == boleta) | 
        (models.MensajeDB.receptor_boleta == boleta)
    ).all()
    
    # 2. Extraemos las boletas únicas de esas conversaciones
    boletas_unicas = set()
    for msg in mensajes:
        if msg.remitente_boleta != boleta:
            boletas_unicas.add(msg.remitente_boleta)
        if msg.receptor_boleta != boleta:
            boletas_unicas.add(msg.receptor_boleta)
            
    # 3. Traemos la información de esos usuarios específicos
    if not boletas_unicas:
        return [] # Si no hay chats, devolvemos una lista vacía
        
    contactos = db.query(models.UsuarioDB).filter(models.UsuarioDB.boleta.in_(boletas_unicas)).all()
    return contactos

# --- 17. RUTA PARA ENVIAR UN MENSAJE ---
@app.post("/api/mensajes/enviar")
def enviar_mensaje(mensaje: dict, db: Session = Depends(get_db)):
    nuevo_mensaje = models.MensajeDB(
        remitente_boleta=mensaje["remitente_boleta"],
        receptor_boleta=mensaje["receptor_boleta"],
        texto=mensaje["texto"],
        fecha=datetime.now().strftime("%H:%M") # Hora actual, ej: "10:30"
    )
    db.add(nuevo_mensaje)
    db.commit()
    db.refresh(nuevo_mensaje)
    return {"status": "success", "id": nuevo_mensaje.id}

# --- 18. RUTA PARA OBTENER LOS MENSAJES ENTRE DOS PERSONAS ---
@app.get("/api/mensajes/{mi_boleta}/{contacto_boleta}")
def obtener_mensajes(mi_boleta: str, contacto_boleta: str, db: Session = Depends(get_db)):
    mensajes = db.query(models.MensajeDB).filter(
        or_(
            and_(models.MensajeDB.remitente_boleta == mi_boleta, models.MensajeDB.receptor_boleta == contacto_boleta),
            and_(models.MensajeDB.remitente_boleta == contacto_boleta, models.MensajeDB.receptor_boleta == mi_boleta)
        )
    ).order_by(models.MensajeDB.id.asc()).all()
    
    return mensajes