from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/solicitudes", tags=["Solicitudes"])

@router.get("", response_model=List[schemas.SolicitudResponse])
def get_solicitudes(
    estado: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    query = db.query(models.Solicitud)
    
    # Si es cliente, solo ver sus propias solicitudes
    if current_user.tipo == "cliente":
        query = query.filter(models.Solicitud.cliente_id == current_user.id)
    
    # Filtrar por estado si se proporciona
    if estado:
        query = query.filter(models.Solicitud.estado == estado)
    
    solicitudes = query.all()
    return solicitudes

@router.post("", response_model=schemas.SolicitudResponse, status_code=status.HTTP_201_CREATED)
def create_solicitud(
    solicitud: schemas.SolicitudCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    # Verificar que el tipo de residuo existe
    tipo_residuo = db.query(models.TipoResiduo).filter(
        models.TipoResiduo.id == solicitud.tipo_residuo_id
    ).first()
    if not tipo_residuo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tipo de residuo no encontrado"
        )
    
    # Crear solicitud
    db_solicitud = models.Solicitud(
        cliente_id=current_user.id,
        tipo_residuo_id=solicitud.tipo_residuo_id,
        direccion=solicitud.direccion,
        lat=solicitud.lat,
        lng=solicitud.lng,
        fecha_solicitada=solicitud.fecha_solicitada
    )
    db.add(db_solicitud)
    db.commit()
    db.refresh(db_solicitud)
    
    return db_solicitud

@router.get("/{solicitud_id}", response_model=schemas.SolicitudResponse)
def get_solicitud(
    solicitud_id: str,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    solicitud = db.query(models.Solicitud).filter(models.Solicitud.id == solicitud_id).first()
    if not solicitud:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Solicitud no encontrada"
        )
    
    # Si es cliente, solo puede ver sus propias solicitudes
    if current_user.tipo == "cliente" and solicitud.cliente_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permiso para ver esta solicitud"
        )
    
    return solicitud

@router.patch("/{solicitud_id}", response_model=schemas.SolicitudResponse)
def update_solicitud_estado(
    solicitud_id: str,
    update_data: schemas.SolicitudUpdate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.require_admin)
):
    solicitud = db.query(models.Solicitud).filter(models.Solicitud.id == solicitud_id).first()
    if not solicitud:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Solicitud no encontrada"
        )
    
    solicitud.estado = update_data.estado
    db.commit()
    db.refresh(solicitud)
    
    return solicitud
