from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import math

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/rutas", tags=["Rutas"])

def calcular_distancia(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calcular distancia entre dos puntos usando la fórmula de Haversine"""
    R = 6371  # Radio de la Tierra en km
    
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    
    a = (math.sin(dlat / 2) ** 2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlng / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c

def optimizar_ruta_nearest_neighbor(solicitudes: List[models.Solicitud]) -> tuple[List[models.Solicitud], float]:
    """Algoritmo Nearest Neighbor para optimizar el orden de las solicitudes"""
    if not solicitudes:
        return [], 0.0
    
    # Punto de inicio (podría ser la ubicación del depósito)
    # Por ahora usamos la primera solicitud como inicio
    ruta_optimizada = [solicitudes[0]]
    solicitudes_restantes = solicitudes[1:]
    distancia_total = 0.0
    
    while solicitudes_restantes:
        ultima = ruta_optimizada[-1]
        # Encontrar la solicitud más cercana
        mas_cercana = min(
            solicitudes_restantes,
            key=lambda s: calcular_distancia(ultima.lat, ultima.lng, s.lat, s.lng)
        )
        distancia = calcular_distancia(ultima.lat, ultima.lng, mas_cercana.lat, mas_cercana.lng)
        distancia_total += distancia
        
        ruta_optimizada.append(mas_cercana)
        solicitudes_restantes.remove(mas_cercana)
    
    return ruta_optimizada, distancia_total

@router.post("/optimizar", response_model=schemas.RutaResponse, status_code=status.HTTP_201_CREATED)
def optimizar_ruta(
    request: schemas.RutaOptimizarRequest,
    db: Session = Depends(get_db)
):
    # Obtener las solicitudes
    solicitudes = db.query(models.Solicitud).filter(
        models.Solicitud.id.in_(request.solicitudes_ids),
        models.Solicitud.estado == "pending"
    ).all()
    
    if len(solicitudes) != len(request.solicitudes_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Algunas solicitudes no existen o no están pendientes"
        )
    
    # Buscar un vehículo disponible
    vehiculo = db.query(models.Vehiculo).first()
    if not vehiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay vehículos disponibles"
        )
    
    # Optimizar la ruta
    solicitudes_optimizadas, distancia_total = optimizar_ruta_nearest_neighbor(solicitudes)
    
    # Crear la ruta en la base de datos
    db_ruta = models.Ruta(
        vehiculo_id=vehiculo.id,
        distancia_total=distancia_total
    )
    db.add(db_ruta)
    db.flush()  # Para obtener el ID de la ruta
    
    # Asociar solicitudes con la ruta en el orden optimizado
    for orden, solicitud in enumerate(solicitudes_optimizadas, start=1):
        # Actualizar estado de la solicitud
        solicitud.estado = "approved"
        # Insertar en la tabla intermedia con el orden
        db.execute(
            models.ruta_solicitud.insert().values(
                ruta_id=db_ruta.id,
                solicitud_id=solicitud.id,
                orden=orden
            )
        )
    
    db.commit()
    db.refresh(db_ruta)
    
    return db_ruta

@router.get("/{ruta_id}", response_model=schemas.RutaResponse)
def get_ruta(
    ruta_id: str,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    ruta = db.query(models.Ruta).filter(models.Ruta.id == ruta_id).first()
    if not ruta:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ruta no encontrada"
        )
    
    return ruta

@router.get("", response_model=List[schemas.RutaResponse])
def get_rutas(
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    rutas = db.query(models.Ruta).order_by(models.Ruta.fecha_creacion.desc()).all()
    return rutas
