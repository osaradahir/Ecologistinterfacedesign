from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

# Tabla intermedia para la relación many-to-many entre Ruta y Solicitud
ruta_solicitud = Table(
    'ruta_solicitud',
    Base.metadata,
    Column('ruta_id', String, ForeignKey('rutas.id')),
    Column('solicitud_id', String, ForeignKey('solicitudes.id')),
    Column('orden', Integer)  # Para mantener el orden de las paradas
)

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    tipo = Column(String, nullable=False)  # 'admin', 'recolector', 'cliente'
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    
    # Relaciones
    solicitudes = relationship("Solicitud", back_populates="cliente")

class TipoResiduo(Base):
    __tablename__ = "tipos_residuo"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    descripcion = Column(String, nullable=False)
    
    # Relaciones
    solicitudes = relationship("Solicitud", back_populates="tipo_residuo")

class Solicitud(Base):
    __tablename__ = "solicitudes"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    cliente_id = Column(String, ForeignKey("usuarios.id"), nullable=False)
    tipo_residuo_id = Column(Integer, ForeignKey("tipos_residuo.id"), nullable=False)
    direccion = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    fecha_solicitada = Column(DateTime, default=datetime.utcnow)
    estado = Column(String, default="pending")  # pending, approved, completed, cancelled
    
    # Relaciones
    cliente = relationship("Usuario", back_populates="solicitudes")
    tipo_residuo = relationship("TipoResiduo", back_populates="solicitudes")
    rutas = relationship("Ruta", secondary=ruta_solicitud, back_populates="solicitudes")

class Vehiculo(Base):
    __tablename__ = "vehiculos"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    placa = Column(String, unique=True, nullable=False)
    tipo = Column(String, nullable=False)  # 'Camión Grande', 'Camión Mediano', 'Camioneta'
    capacidad = Column(Integer, nullable=False)
    carga_actual = Column(Integer, default=0)  # en kg
    combustible = Column(Integer, default=100)  # porcentaje 0-100
    estado = Column(String, default="Disponible")  # 'Disponible', 'En ruta', 'Mantenimiento'
    conductor = Column(String, nullable=True)  # Nombre del conductor
    
    # Relaciones
    rutas = relationship("Ruta", back_populates="vehiculo")

class Ruta(Base):
    __tablename__ = "rutas"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    vehiculo_id = Column(String, ForeignKey("vehiculos.id"), nullable=False)
    distancia_total = Column(Float, nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    
    # Relaciones
    vehiculo = relationship("Vehiculo", back_populates="rutas")
    solicitudes = relationship("Solicitud", secondary=ruta_solicitud, back_populates="rutas")
