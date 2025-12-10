# 🌱 Script de Seed - Base de Datos

Este script llena la base de datos con datos de ejemplo para probar la aplicación.

## 📊 Datos Creados

### Tipos de Residuo (5)
- Plástico
- Papel
- Cartón
- Vidrio
- Orgánico

### Usuarios (6)
- **Admin**: admin@ecologist.com / admin123
- **Recolectores**: 
  - recolector1@ecologist.com / recolector123
  - recolector2@ecologist.com / recolector123
- **Clientes**:
  - cliente1@test.com / cliente123
  - cliente2@test.com / cliente123
  - cliente3@test.com / cliente123

### Vehículos (4)
- ABC-123 - Camión Grande (2500 kg) - Carlos Méndez
- DEF-456 - Camión Mediano (1500 kg) - Ana Torres
- GHI-789 - Camioneta (800 kg) - Luis Ramírez
- JKL-012 - Camión Grande (3000 kg) - En mantenimiento

### Solicitudes (20)
- Distribuidas entre los últimos 30 días
- Diferentes estados: pending, approved, completed
- Ubicaciones variadas en la ciudad
- Asignadas a diferentes clientes

### Rutas (2)
- Con solicitudes completadas
- Distancias calculadas
- Asignadas a vehículos

## 🚀 Uso

### Ejecutar el script:
```bash
cd backend
python seed.py
```

### Resetear y volver a llenar:
```bash
# Eliminar base de datos actual
rm ecologist.db

# Recrear tablas
python -c "from app.database import Base, engine; from app import models; Base.metadata.create_all(bind=engine)"

# Llenar con datos
python seed.py
```

## 📝 Notas

- El script es **idempotente**: puedes ejecutarlo múltiples veces sin duplicar datos
- Las solicitudes tienen fechas aleatorias de los últimos 30 días
- Las coordenadas son variaciones de ubicaciones reales en CDMX
- Los estados de las solicitudes están distribuidos para simular un sistema en uso

## 🔑 Credenciales de Prueba

Para probar la aplicación, usa cualquiera de estas credenciales:

**Administrador** (acceso completo):
- Email: admin@ecologist.com
- Password: admin123

**Cliente** (crear solicitudes):
- Email: cliente1@test.com
- Password: cliente123

**Recolector** (ver rutas):
- Email: recolector1@ecologist.com
- Password: recolector123
