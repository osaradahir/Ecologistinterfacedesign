# 🌱 Ecologist - Sistema de Gestión de Residuos

Sistema completo de gestión de residuos con aplicación web, móvil y API REST. Optimiza rutas de recolección, gestiona vehículos y genera reportes de eficiencia.

![Status](https://img.shields.io/badge/status-production%20ready-success)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-FastAPI-green)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Inicio Rápido](#-inicio-rápido)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [Capturas de Pantalla](#-capturas-de-pantalla)

## ✨ Características

### 🖥️ Aplicación Web
- **Dashboard Interactivo**: Estadísticas en tiempo real, gráficos de eficiencia
- **Gestión de Solicitudes**: CRUD completo con filtros y búsqueda
- **Optimización de Rutas**: Algoritmo que optimiza rutas de recolección
- **Gestión de Vehículos**: Control de flota con todos los detalles
- **Reportes**: Exportación en JSON y CSV
- **Acciones Rápidas**: Editar, contactar cliente, cancelar solicitudes

### 📱 Aplicación Móvil
- **Autenticación**: Login seguro con JWT
- **Dashboard**: Estadísticas personalizadas del usuario
- **Crear Solicitudes**: Formulario intuitivo de 3 pasos
- **Historial**: Visualización completa con filtros por tipo
- **Impacto Ambiental**: Cálculo de CO₂ evitado y equivalencias

### 🔧 Backend API
- **FastAPI**: API REST rápida y moderna
- **SQLite**: Base de datos ligera y eficiente
- **Autenticación JWT**: Seguridad con tokens
- **Documentación Automática**: Swagger UI en `/docs`
- **CORS Configurado**: Listo para desarrollo

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** - Build tool ultrarrápido
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos modernos
- **Recharts** - Gráficos interactivos

### Backend
- **FastAPI** - Framework web moderno
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validación de datos
- **JWT** - Autenticación segura
- **SQLite** - Base de datos

## 🚀 Inicio Rápido

### Prerequisitos
- Python 3.8+
- Node.js 16+
- npm o yarn

### Instalación

#### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd Ecologistinterfacedesign
```

#### 2. Configurar Backend
```bash
cd backend

# Crear entorno virtual (opcional pero recomendado)
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Poblar base de datos con datos de ejemplo
python seed.py

# Iniciar servidor
uvicorn app.main:app --reload
```

El backend estará disponible en: `http://localhost:8000`

#### 3. Configurar Frontend
```bash
# En otra terminal, desde la raíz del proyecto
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 📁 Estructura del Proyecto

```
Ecologistinterfacedesign/
├── backend/
│   ├── app/
│   │   ├── routers/          # Endpoints de la API
│   │   │   ├── auth.py       # Autenticación
│   │   │   ├── solicitudes.py
│   │   │   ├── rutas.py
│   │   │   ├── vehiculos.py
│   │   │   └── reportes.py
│   │   ├── models.py         # Modelos SQLAlchemy
│   │   ├── schemas.py        # Schemas Pydantic
│   │   ├── auth.py           # Lógica de autenticación
│   │   ├── database.py       # Configuración de BD
│   │   └── main.py           # Aplicación FastAPI
│   ├── seed.py               # Script para poblar BD
│   ├── requirements.txt      # Dependencias Python
│   └── ecologist.db          # Base de datos SQLite
├── src/
│   ├── components/
│   │   ├── web/              # Componentes web
│   │   │   ├── WebDashboard.tsx
│   │   │   ├── WebRequests.tsx
│   │   │   ├── WebRoutes.tsx
│   │   │   ├── WebVehicles.tsx
│   │   │   └── WebReports.tsx
│   │   └── mobile/           # Componentes móviles
│   │       ├── MobileLogin.tsx
│   │       ├── MobileHome.tsx
│   │       ├── MobileCreateRequest.tsx
│   │       └── MobileHistory.tsx
│   ├── services/             # Servicios API
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── solicitudes.service.ts
│   │   ├── vehiculos.service.ts
│   │   ├── rutas.service.ts
│   │   └── reportes.service.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── App.tsx               # Componente principal
│   └── main.tsx              # Punto de entrada
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/me` - Obtener usuario actual

### Solicitudes
- `GET /solicitudes` - Listar solicitudes
- `POST /solicitudes` - Crear solicitud
- `GET /solicitudes/{id}` - Obtener solicitud
- `PATCH /solicitudes/{id}` - Actualizar estado

### Vehículos
- `GET /vehiculos` - Listar vehículos
- `POST /vehiculos` - Crear vehículo
- `PUT /vehiculos/{id}` - Actualizar vehículo
- `DELETE /vehiculos/{id}` - Eliminar vehículo

### Rutas
- `POST /rutas/optimizar` - Optimizar ruta
- `GET /rutas` - Listar rutas
- `GET /rutas/{id}` - Obtener ruta

### Reportes
- `GET /reportes/eficiencia` - Reporte de eficiencia

**Documentación completa**: `http://localhost:8000/docs`

## 🔑 Credenciales de Prueba

El script `seed.py` crea usuarios de ejemplo:

| Tipo | Email | Password |
|------|-------|----------|
| Administrador | admin@ecologist.com | admin123 |
| Recolector | recolector1@ecologist.com | recolector123 |
| Cliente | cliente1@test.com | cliente123 |

## 📊 Datos de Ejemplo

El script de seed crea:
- ✅ 6 usuarios (admin, recolectores, clientes)
- ✅ 5 tipos de residuo (Plástico, Papel, Cartón, Vidrio, Orgánico)
- ✅ 4 vehículos con información completa
- ✅ 20 solicitudes distribuidas en 30 días
- ✅ 2 rutas optimizadas

## 🎯 Funcionalidades Destacadas

### Optimización de Rutas
El sistema utiliza un algoritmo de optimización que:
- Calcula distancias entre puntos
- Minimiza la distancia total recorrida
- Agrupa solicitudes eficientemente
- Asigna vehículos según capacidad

### Gestión de Vehículos
Control completo de la flota:
- Placa, tipo, capacidad
- Conductor asignado
- Carga actual y combustible
- Estado (Disponible, En ruta, Mantenimiento)

### Reportes de Eficiencia
Exporta datos en múltiples formatos:
- Solicitudes completadas
- Distancia total recorrida
- Eficiencia de recolección
- Formato JSON o CSV

## 🌐 URLs del Sistema

- **Frontend Web**: http://localhost:5173
- **API Backend**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

## 🧪 Testing

```bash
# Backend tests (si están configurados)
cd backend
pytest

# Frontend tests
npm test
```

## 📝 Notas de Desarrollo

### Autenticación
Para facilitar el desarrollo, algunos endpoints no requieren autenticación. En producción, habilitar autenticación en todos los endpoints sensibles.

### Base de Datos
SQLite es ideal para desarrollo. Para producción, considerar PostgreSQL o MySQL.

### CORS
Configurado para `localhost:5173` y `localhost:3000`. Actualizar en producción.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autores

- **Equipo Ecologist** - Desarrollo inicial

## 🙏 Agradecimientos

- FastAPI por el excelente framework
- React team por la librería
- Lucide por los iconos
- Comunidad open source

---

**¿Preguntas?** Abre un issue en el repositorio.

**Estado del Proyecto**: ✅ Producción Ready

Hecho con 💚 para un planeta más limpio