import api from './api';
import { Vehiculo, VehiculoCreate } from '../types';

export const vehiculosService = {
    async getVehiculos(): Promise<Vehiculo[]> {
        const response = await api.get<Vehiculo[]>('/vehiculos');
        return response.data;
    },

    async createVehiculo(data: VehiculoCreate): Promise<Vehiculo> {
        const response = await api.post<Vehiculo>('/vehiculos', data);
        return response.data;
    },

    async updateVehiculo(id: string, data: Partial<VehiculoCreate>): Promise<Vehiculo> {
        const response = await api.patch<Vehiculo>(`/vehiculos/${id}`, data);
        return response.data;
    },

    async deleteVehiculo(id: string): Promise<void> {
        await api.delete(`/vehiculos/${id}`);
    }
};
