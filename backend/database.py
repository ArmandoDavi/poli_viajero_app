from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Esto creará un archivo llamado "poli_viajero.db" en tu carpeta backend
SQLALCHEMY_DATABASE_URL = "sqlite:///./poli_viajero.db"

# engine es el motor de la base de datos
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()