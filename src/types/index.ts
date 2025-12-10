export interface Usuario {
    id: string;
    tipo: 'admin' | 'recolector' | 'cliente';
    nombre: string;
    email: string;
}

export interface TipoResiduo {
    id: number;
    descripcion: string;
}

export interface Solicitud {
    id: string;
    cliente_id: string;
    tipo_residuo_id: number;
    direccion: string;
    lat: number;
    lng: number;
    fecha_solicitada: string;
    estado: 'pending' | 'approved' | 'completed' | 'cancelled';
    cliente?: Usuario;
    tipo_residuo?: TipoResiduo;
}

export interface Vehiculo {
    id: string;
    placa: string;
    capacidad: number;
}

export interface Ruta {
    id: string;
    vehiculo_id: string;
    distancia_total: number;
    fecha_creacion: string;
    vehiculo?: Vehiculo;
    solicitudes: Solicitud[];
}

export interface ReporteEficiencia {
    total_solicitudes: number;
    solicitudes_pending: number;
    solicitudes_approved: number;
    solicitudes_completed: number;
    solicitudes_cancelled: number;
    total_rutas: number;
    distancia_total: number;
    promedio_solicitudes_por_ruta: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    nombre: string;
    tipo: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: Usuario;
}

export interface SolicitudCreate {
    tipo_residuo_id: number;
    direccion: string;
    lat: number;
    lng: number;
    fecha_solicitada?: string;
}

export interface VehiculoCreate {
    placa: string;
    tipo: string;
    capacidad: number;
    conductor?: string;
}

export interface RutaOptimizarRequest {
    solicitudes_ids: string[];
}
