from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/vehiculos", tags=["Vehiculos"])

@router.get("", response_model=List[schemas.VehiculoResponse])
def get_vehiculos(
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.get_current_user)
):
    vehiculos = db.query(models.Vehiculo).all()
    return vehiculos

@router.post("", response_model=schemas.VehiculoResponse, status_code=status.HTTP_201_CREATED)
def create_vehiculo(
    vehiculo: schemas.VehiculoCreate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.require_admin)
):
    # Verificar que la placa no exista
    existing = db.query(models.Vehiculo).filter(models.Vehiculo.placa == vehiculo.placa).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un vehículo con esta placa"
        )
    
    db_vehiculo = models.Vehiculo(
        placa=vehiculo.placa,
        capacidad=vehiculo.capacidad
    )
    db.add(db_vehiculo)
    db.commit()
    db.refresh(db_vehiculo)
    
    return db_vehiculo

@router.patch("/{vehiculo_id}", response_model=schemas.VehiculoResponse)
def update_vehiculo(
    vehiculo_id: str,
    update_data: schemas.VehiculoUpdate,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.require_admin)
):
    vehiculo = db.query(models.Vehiculo).filter(models.Vehiculo.id == vehiculo_id).first()
    if not vehiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehículo no encontrado"
        )
    
    if update_data.placa is not None:
        # Verificar que la nueva placa no exista
        existing = db.query(models.Vehiculo).filter(
            models.Vehiculo.placa == update_data.placa,
            models.Vehiculo.id != vehiculo_id
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ya existe un vehículo con esta placa"
            )
        vehiculo.placa = update_data.placa
    
    if update_data.capacidad is not None:
        vehiculo.capacidad = update_data.capacidad
    
    db.commit()
    db.refresh(vehiculo)
    
    return vehiculo

@router.delete("/{vehiculo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehiculo(
    vehiculo_id: str,
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(auth.require_admin)
):
    vehiculo = db.query(models.Vehiculo).filter(models.Vehiculo.id == vehiculo_id).first()
    if not vehiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehículo no encontrado"
        )
    
    # Verificar que no tenga rutas asignadas
    if vehiculo.rutas:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se puede eliminar un vehículo con rutas asignadas"
        )
    
    db.delete(vehiculo)
    db.commit()
    
    return None
