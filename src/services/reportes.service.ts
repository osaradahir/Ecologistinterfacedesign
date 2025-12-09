import api from './api';
import { ReporteEficiencia } from '../types';

export const reportesService = {
    async getEficiencia(params?: { fecha_inicio?: string; fecha_fin?: string }): Promise<ReporteEficiencia> {
        const response = await api.get<ReporteEficiencia>('/reportes/eficiencia', { params });
        return response.data;
    }
};
