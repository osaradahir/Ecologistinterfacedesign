from app.database import SessionLocal
from app import models, auth
from datetime import datetime, timedelta
import random

def seed_database():
    db = SessionLocal()
    
    try:
        print("🌱 Iniciando seed de la base de datos...")
        
        # 1. Crear tipos de residuo
        print("\n📦 Creando tipos de residuo...")
        tipos_residuo = [
            models.TipoResiduo(id=1, descripcion="Plástico"),
            models.TipoResiduo(id=2, descripcion="Papel"),
            models.TipoResiduo(id=3, descripcion="Cartón"),
            models.TipoResiduo(id=4, descripcion="Vidrio"),
            models.TipoResiduo(id=5, descripcion="Orgánico"),
        ]
        
        for tipo in tipos_residuo:
            existing = db.query(models.TipoResiduo).filter(models.TipoResiduo.id == tipo.id).first()
            if not existing:
                db.add(tipo)
        db.commit()
        print(f"   ✓ {len(tipos_residuo)} tipos de residuo creados")
        
        # 2. Crear usuarios
        print("\n👥 Creando usuarios...")
        usuarios_data = [
            {"email": "admin@ecologist.com", "nombre": "Administrador", "tipo": "admin", "password": "admin123"},
            {"email": "recolector1@ecologist.com", "nombre": "Carlos Méndez", "tipo": "recolector", "password": "recolector123"},
            {"email": "recolector2@ecologist.com", "nombre": "Ana Torres", "tipo": "recolector", "password": "recolector123"},
            {"email": "cliente1@test.com", "nombre": "Juan Pérez", "tipo": "cliente", "password": "cliente123"},
            {"email": "cliente2@test.com", "nombre": "María González", "tipo": "cliente", "password": "cliente123"},
            {"email": "cliente3@test.com", "nombre": "Pedro Ramírez", "tipo": "cliente", "password": "cliente123"},
        ]
        
        usuarios = []
        for user_data in usuarios_data:
            existing = db.query(models.Usuario).filter(models.Usuario.email == user_data["email"]).first()
            if not existing:
                usuario = models.Usuario(
                    email=user_data["email"],
                    nombre=user_data["nombre"],
                    tipo=user_data["tipo"],
                    hashed_password=auth.get_password_hash(user_data["password"])
                )
                db.add(usuario)
                db.flush()
                usuarios.append(usuario)
            else:
                usuarios.append(existing)
        db.commit()
        print(f"   ✓ {len(usuarios_data)} usuarios creados")
        
        # 3. Crear vehículos
        print("\n🚛 Creando vehículos...")
        vehiculos_data = [
            {
                "placa": "ABC-123",
                "tipo": "Camión Grande",
                "capacidad": 2500,
                "carga_actual": 0,
                "combustible": 85,
                "estado": "Disponible",
                "conductor": "Carlos Méndez"
            },
            {
                "placa": "DEF-456",
                "tipo": "Camión Mediano",
                "capacidad": 1500,
                "carga_actual": 0,
                "combustible": 90,
                "estado": "Disponible",
                "conductor": "Ana Torres"
            },
            {
                "placa": "GHI-789",
                "tipo": "Camioneta",
                "capacidad": 800,
                "carga_actual": 0,
                "combustible": 75,
                "estado": "Disponible",
                "conductor": "Luis Ramírez"
            },
            {
                "placa": "JKL-012",
                "tipo": "Camión Grande",
                "capacidad": 3000,
                "carga_actual": 0,
                "combustible": 95,
                "estado": "Mantenimiento",
                "conductor": None
            }
        ]
        
        vehiculos = []
        for veh_data in vehiculos_data:
            existing = db.query(models.Vehiculo).filter(models.Vehiculo.placa == veh_data["placa"]).first()
            if not existing:
                vehiculo = models.Vehiculo(**veh_data)
                db.add(vehiculo)
                db.flush()
                vehiculos.append(vehiculo)
            else:
                vehiculos.append(existing)
        db.commit()
        print(f"   ✓ {len(vehiculos_data)} vehículos creados")
        
        # 4. Crear solicitudes
        print("\n📋 Creando solicitudes...")
        direcciones = [
            {"dir": "Av. Principal 123, Centro", "lat": 19.4326, "lng": -99.1332},
            {"dir": "Calle Norte 456, Zona Norte", "lat": 19.4500, "lng": -99.1400},
            {"dir": "Plaza Central, Local 12", "lat": 19.4200, "lng": -99.1250},
            {"dir": "Torre Empresarial, Piso 5", "lat": 19.4400, "lng": -99.1500},
            {"dir": "Residencial Sur 789", "lat": 19.4100, "lng": -99.1200},
            {"dir": "Av. Reforma 321", "lat": 19.4350, "lng": -99.1380},
            {"dir": "Colonia Este 654", "lat": 19.4450, "lng": -99.1150},
            {"dir": "Boulevard Oeste 987", "lat": 19.4250, "lng": -99.1450},
        ]
        
        estados = ["pending", "approved", "completed", "completed", "completed"]
        clientes = [u for u in usuarios if u.tipo == "cliente"]
        
        solicitudes = []
        for i in range(20):
            dias_atras = random.randint(0, 30)
            fecha = datetime.now() - timedelta(days=dias_atras)
            direccion = random.choice(direcciones)
            
            solicitud = models.Solicitud(
                cliente_id=random.choice(clientes).id,
                tipo_residuo_id=random.randint(1, 5),
                direccion=direccion["dir"],
                lat=direccion["lat"] + random.uniform(-0.01, 0.01),
                lng=direccion["lng"] + random.uniform(-0.01, 0.01),
                estado=random.choice(estados),
                fecha_solicitada=fecha
            )
            db.add(solicitud)
            db.flush()
            solicitudes.append(solicitud)
        
        db.commit()
        print(f"   ✓ {len(solicitudes)} solicitudes creadas")
        
        # 5. Crear rutas con solicitudes
        print("\n🗺️  Creando rutas optimizadas...")
        solicitudes_approved = [s for s in solicitudes if s.estado == "approved"]
        solicitudes_completed = [s for s in solicitudes if s.estado == "completed"]
        
        rutas_count = 0
        if len(solicitudes_completed) >= 3:
            # Crear 2 rutas con solicitudes completadas
            for i in range(2):
                vehiculo = vehiculos[i % len(vehiculos)]
                ruta = models.Ruta(
                    vehiculo_id=vehiculo.id,
                    distancia_total=round(random.uniform(15.5, 45.8), 2),
                    fecha_creacion=datetime.now() - timedelta(days=random.randint(1, 15))
                )
                db.add(ruta)
                db.flush()
                
                # Asignar 3-5 solicitudes a cada ruta
                num_solicitudes = min(random.randint(3, 5), len(solicitudes_completed))
                for orden, solicitud in enumerate(solicitudes_completed[:num_solicitudes], start=1):
                    db.execute(
                        models.ruta_solicitud.insert().values(
                            ruta_id=ruta.id,
                            solicitud_id=solicitud.id,
                            orden=orden
                        )
                    )
                    solicitudes_completed.remove(solicitud)
                
                rutas_count += 1
        
        db.commit()
        print(f"   ✓ {rutas_count} rutas creadas")
        
        # Resumen final
        print("\n" + "="*50)
        print("✅ Base de datos poblada exitosamente!")
        print("="*50)
        print(f"\n📊 Resumen:")
        print(f"   • {len(tipos_residuo)} tipos de residuo")
        print(f"   • {len(usuarios_data)} usuarios")
        print(f"   • {len(vehiculos_data)} vehículos")
        print(f"   • {len(solicitudes)} solicitudes")
        print(f"   • {rutas_count} rutas")
        
        print(f"\n🔑 Credenciales de acceso:")
        print(f"   Admin:      admin@ecologist.com / admin123")
        print(f"   Recolector: recolector1@ecologist.com / recolector123")
        print(f"   Cliente:    cliente1@test.com / cliente123")
        
    except Exception as e:
        print(f"\n❌ Error al poblar la base de datos: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
