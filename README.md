# Ecologist - Sistema de Gestión de Residuos

Sistema completo de gestión de residuos con optimización de rutas.

## 🚀 Inicio Rápido

### Backend (FastAPI)

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Crear base de datos y datos de prueba
python seed_data.py

# Iniciar servidor
uvicorn app.main:app --reload
```

El backend estará disponible en `http://localhost:8000`
- Documentación Swagger: `http://localhost:8000/docs`

### Frontend (React + Vite)

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 👤 Usuarios de Prueba

Después de ejecutar `seed_data.py`, puedes usar estos usuarios:

- **Admin**: admin@ecologist.com / admin123
- **Recolector**: recolector@ecologist.com / recolector123
- **Cliente 1**: cliente1@example.com / cliente123
- **Cliente 2**: cliente2@example.com / cliente123

## 📁 Estructura del Proyecto

```
Ecologistinterfacedesign/
├── backend/
│   ├── app/
│   │   ├── routers/        # Endpoints de la API
│   │   ├── models.py       # Modelos de base de datos
│   │   ├── schemas.py      # Schemas Pydantic
│   │   ├── auth.py         # Autenticación JWT
│   │   ├── database.py     # Configuración DB
│   │   └── main.py         # App principal
│   ├── requirements.txt
│   ├── seed_data.py        # Datos de prueba
│   └── .env
├── src/
│   ├── components/         # Componentes React
│   ├── services/           # Servicios API
│   ├── types/              # TypeScript types
│   └── App.tsx
└── package.json
```

## 🔑 Características

### Backend
- ✅ Autenticación con JWT
- ✅ CRUD completo de solicitudes
- ✅ Optimización de rutas (algoritmo nearest neighbor)
- ✅ Gestión de vehículos
- ✅ Reportes de eficiencia
- ✅ Base de datos SQLite
- ✅ Documentación automática con Swagger

### Frontend
- ✅ Interfaz web para administradores
- ✅ Interfaz móvil para clientes
- ✅ Autenticación y gestión de sesión
- ✅ Visualización de solicitudes
- ✅ Optimización de rutas
- ✅ Dashboard de reportes
- ✅ Gestión de vehículos

## 📡 Endpoints Principales

- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `GET /solicitudes` - Listar solicitudes
- `POST /solicitudes` - Crear solicitud
- `POST /rutas/optimizar` - Optimizar rutas
- `GET /rutas/{id}` - Obtener ruta
- `GET /vehiculos` - Listar vehículos
- `GET /reportes/eficiencia` - Reportes

## 🛠️ Tecnologías

**Backend:**
- FastAPI
- SQLAlchemy
- SQLite
- JWT (python-jose)
- Bcrypt

**Frontend:**
- React 18
- TypeScript
- Vite
- Axios
- Radix UI
- Tailwind CSS
- Recharts