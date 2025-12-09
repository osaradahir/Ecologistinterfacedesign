from app.database import SessionLocal, engine, Base
from app.models import Usuario, TipoResiduo, Vehiculo, Solicitud
from app.auth import get_password_hash
from datetime import datetime

# Crear las tablas
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    try:
        # Verificar si ya hay datos
        if db.query(Usuario).first():
            print("La base de datos ya tiene datos. Saltando seed.")
            return
        
        print("Iniciando seed de la base de datos...")
        
        # Crear tipos de residuo
        tipos_residuo = [
            TipoResiduo(descripcion="Orgánico"),
            TipoResiduo(descripcion="Plástico"),
            TipoResiduo(descripcion="Papel y Cartón"),
            TipoResiduo(descripcion="Vidrio"),
            TipoResiduo(descripcion="Metal"),
            TipoResiduo(descripcion="Electrónico"),
        ]
        db.add_all(tipos_residuo)
        db.flush()
        
        print("✓ Tipos de residuo creados")
        
        # Crear usuarios
        admin = Usuario(
            email="admin@ecologist.com",
            nombre="Administrador",
            tipo="admin",
            hashed_password=get_password_hash("admin123")
        )
        
        recolector = Usuario(
            email="recolector@ecologist.com",
            nombre="Juan Pérez",
            tipo="recolector",
            hashed_password=get_password_hash("recolector123")
        )
        
        cliente1 = Usuario(
            email="cliente1@example.com",
            nombre="María García",
            tipo="cliente",
            hashed_password=get_password_hash("cliente123")
        )
        
        cliente2 = Usuario(
            email="cliente2@example.com",
            nombre="Carlos López",
            tipo="cliente",
            hashed_password=get_password_hash("cliente123")
        )
        
        db.add_all([admin, recolector, cliente1, cliente2])
        db.flush()
        
        print("✓ Usuarios creados")
        print("  - admin@ecologist.com / admin123")
        print("  - recolector@ecologist.com / recolector123")
        print("  - cliente1@example.com / cliente123")
        print("  - cliente2@example.com / cliente123")
        
        # Crear vehículos
        vehiculos = [
            Vehiculo(placa="ABC-123", capacidad=1000),
            Vehiculo(placa="XYZ-789", capacidad=1500),
            Vehiculo(placa="DEF-456", capacidad=800),
        ]
        db.add_all(vehiculos)
        db.flush()
        
        print("✓ Vehículos creados")
        
        # Crear solicitudes de ejemplo
        solicitudes = [
            Solicitud(
                cliente_id=cliente1.id,
                tipo_residuo_id=1,
                direccion="Calle 123, Ciudad",
                lat=19.4326,
                lng=-99.1332,
                estado="pending"
            ),
            Solicitud(
                cliente_id=cliente1.id,
                tipo_residuo_id=2,
                direccion="Avenida Principal 456",
                lat=19.4350,
                lng=-99.1400,
                estado="pending"
            ),
            Solicitud(
                cliente_id=cliente2.id,
                tipo_residuo_id=3,
                direccion="Boulevard Central 789",
                lat=19.4280,
                lng=-99.1280,
                estado="pending"
            ),
            Solicitud(
                cliente_id=cliente2.id,
                tipo_residuo_id=4,
                direccion="Plaza Mayor 321",
                lat=19.4400,
                lng=-99.1450,
                estado="completed"
            ),
        ]
        db.add_all(solicitudes)
        
        print("✓ Solicitudes de ejemplo creadas")
        
        db.commit()
        print("\n✅ Seed completado exitosamente!")
        
    except Exception as e:
        print(f"\n❌ Error durante el seed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
