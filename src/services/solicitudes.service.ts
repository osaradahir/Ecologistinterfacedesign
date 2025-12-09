import api from './api';
import { Solicitud, SolicitudCreate } from '../types';

export const solicitudesService = {
    async getSolicitudes(estado?: string): Promise<Solicitud[]> {
        const params = estado ? { estado } : {};
        const response = await api.get<Solicitud[]>('/solicitudes', { params });
        return response.data;
    },

    async createSolicitud(data: SolicitudCreate): Promise<Solicitud> {
        const response = await api.post<Solicitud>('/solicitudes', data);
        return response.data;
    },

    async getSolicitudById(id: string): Promise<Solicitud> {
        const response = await api.get<Solicitud>(`/solicitudes/${id}`);
        return response.data;
    },

    async updateEstado(id: string, estado: string): Promise<Solicitud> {
        const response = await api.patch<Solicitud>(`/solicitudes/${id}`, { estado });
        return response.data;
    }
};
