from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# ============ Usuario Schemas ============
class UsuarioBase(BaseModel):
    email: EmailStr
    nombre: str
    tipo: str  # 'admin', 'recolector', 'cliente'

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioResponse(UsuarioBase):
    id: str
    
    class Config:
        from_attributes = True

# ============ Auth Schemas ============
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UsuarioResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ============ TipoResiduo Schemas ============
class TipoResiduoBase(BaseModel):
    descripcion: str

class TipoResiduoResponse(TipoResiduoBase):
    id: int
    
    class Config:
        from_attributes = True

# ============ Solicitud Schemas ============
class SolicitudBase(BaseModel):
    tipo_residuo_id: int
    direccion: str
    lat: float
    lng: float
    fecha_solicitada: Optional[datetime] = None

class SolicitudCreate(SolicitudBase):
    pass

class SolicitudUpdate(BaseModel):
    estado: str  # pending, approved, completed, cancelled

class SolicitudResponse(SolicitudBase):
    id: str
    cliente_id: str
    estado: str
    fecha_solicitada: datetime
    cliente: Optional[UsuarioResponse] = None
    tipo_residuo: Optional[TipoResiduoResponse] = None
    
    class Config:
        from_attributes = True

# ============ Vehiculo Schemas ============
class VehiculoBase(BaseModel):
    placa: str
    tipo: str  # 'Camión Grande', 'Camión Mediano', 'Camioneta'
    capacidad: int
    carga_actual: Optional[int] = 0
    combustible: Optional[int] = 100
    estado: Optional[str] = "Disponible"
    conductor: Optional[str] = None

class VehiculoCreate(BaseModel):
    placa: str
    tipo: str
    capacidad: int
    conductor: Optional[str] = None

class VehiculoUpdate(BaseModel):
    placa: Optional[str] = None
    tipo: Optional[str] = None
    capacidad: Optional[int] = None
    carga_actual: Optional[int] = None
    combustible: Optional[int] = None
    estado: Optional[str] = None
    conductor: Optional[str] = None

class VehiculoResponse(VehiculoBase):
    id: str
    
    class Config:
        from_attributes = True

# ============ Ruta Schemas ============
class RutaOptimizarRequest(BaseModel):
    solicitudes_ids: List[str]

class RutaSolicitud(BaseModel):
    solicitud: SolicitudResponse
    orden: int

class RutaResponse(BaseModel):
    id: str
    vehiculo_id: str
    distancia_total: float
    fecha_creacion: datetime
    vehiculo: Optional[VehiculoResponse] = None
    solicitudes: List[SolicitudResponse] = []
    
    class Config:
        from_attributes = True

# ============ Reportes Schemas ============
class ReporteEficiencia(BaseModel):
    total_solicitudes: int
    solicitudes_pending: int
    solicitudes_approved: int
    solicitudes_completed: int
    solicitudes_cancelled: int
    total_rutas: int
    distancia_total: float
    promedio_solicitudes_por_ruta: float
