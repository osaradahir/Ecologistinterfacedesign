from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from datetime import datetime

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/reportes", tags=["Reportes"])

@router.get("/eficiencia", response_model=schemas.ReporteEficiencia)
def get_reporte_eficiencia(
    fecha_inicio: Optional[datetime] = Query(None),
    fecha_fin: Optional[datetime] = Query(None),
    db: Session = Depends(get_db)
):
    # Query base para solicitudes
    solicitudes_query = db.query(models.Solicitud)
    rutas_query = db.query(models.Ruta)
    
    # Aplicar filtros de fecha si se proporcionan
    if fecha_inicio:
        solicitudes_query = solicitudes_query.filter(models.Solicitud.fecha_solicitada >= fecha_inicio)
        rutas_query = rutas_query.filter(models.Ruta.fecha_creacion >= fecha_inicio)
    
    if fecha_fin:
        solicitudes_query = solicitudes_query.filter(models.Solicitud.fecha_solicitada <= fecha_fin)
        rutas_query = rutas_query.filter(models.Ruta.fecha_creacion <= fecha_fin)
    
    # Contar solicitudes por estado
    total_solicitudes = solicitudes_query.count()
    solicitudes_pending = solicitudes_query.filter(models.Solicitud.estado == "pending").count()
    solicitudes_approved = solicitudes_query.filter(models.Solicitud.estado == "approved").count()
    solicitudes_completed = solicitudes_query.filter(models.Solicitud.estado == "completed").count()
    solicitudes_cancelled = solicitudes_query.filter(models.Solicitud.estado == "cancelled").count()
    
    # Contar rutas y calcular distancia total
    total_rutas = rutas_query.count()
    distancia_total = rutas_query.with_entities(
        func.sum(models.Ruta.distancia_total)
    ).scalar() or 0.0
    
    # Calcular promedio de solicitudes por ruta
    promedio_solicitudes_por_ruta = 0.0
    if total_rutas > 0:
        # Contar solicitudes en rutas
        total_solicitudes_en_rutas = db.query(func.count(models.ruta_solicitud.c.solicitud_id)).scalar() or 0
        promedio_solicitudes_por_ruta = total_solicitudes_en_rutas / total_rutas
    
    return schemas.ReporteEficiencia(
        total_solicitudes=total_solicitudes,
        solicitudes_pending=solicitudes_pending,
        solicitudes_approved=solicitudes_approved,
        solicitudes_completed=solicitudes_completed,
        solicitudes_cancelled=solicitudes_cancelled,
        total_rutas=total_rutas,
        distancia_total=distancia_total,
        promedio_solicitudes_por_ruta=promedio_solicitudes_por_ruta
    )
