import api from './api';
import { Ruta, RutaOptimizarRequest } from '../types';

export const rutasService = {
    async optimizarRutas(solicitudesIds: string[]): Promise<Ruta> {
        const data: RutaOptimizarRequest = { solicitudes_ids: solicitudesIds };
        const response = await api.post<Ruta>('/rutas/optimizar', data);
        return response.data;
    },

    async getRutaById(id: string): Promise<Ruta> {
        const response = await api.get<Ruta>(`/rutas/${id}`);
        return response.data;
    },

    async getRutas(): Promise<Ruta[]> {
        const response = await api.get<Ruta[]>('/rutas');
        return response.data;
    }
};
