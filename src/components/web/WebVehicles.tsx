import React, { useState } from 'react';
import { Plus, Search, Truck, X, Battery, Gauge, Package } from 'lucide-react';
import { WebSidebar } from './WebSidebar';
import { vehiculosService } from '../../services/vehiculos.service';
import type { VehiculoCreate } from '../../types';

interface WebVehiclesProps {
  onNavigate: (view: string) => void;
}

const vehicles = [
  {
    id: 'VEH-001',
    plate: 'ABC-123',
    type: 'Camión Grande',
    capacity: '2500 kg',
    currentLoad: '1800 kg',
    status: 'En ruta',
    fuel: 75,
    location: 'Zona Centro',
    driver: 'Carlos Méndez',
  },
  {
    id: 'VEH-002',
    plate: 'DEF-456',
    type: 'Camión Mediano',
    capacity: '1500 kg',
    currentLoad: '1200 kg',
    status: 'En ruta',
    fuel: 60,
    location: 'Zona Norte',
    driver: 'Ana Torres',
  },
  {
    id: 'VEH-003',
    plate: 'GHI-789',
    type: 'Camión Grande',
    capacity: '2500 kg',
    currentLoad: '0 kg',
    status: 'Disponible',
    fuel: 90,
    location: 'Base',
    driver: 'Luis Ramírez',
  },
  {
    id: 'VEH-004',
    plate: 'JKL-012',
    type: 'Camioneta',
    capacity: '800 kg',
    currentLoad: '450 kg',
    status: 'En ruta',
    fuel: 45,
    location: 'Zona Sur',
    driver: 'Patricia García',
  },
  {
    id: 'VEH-005',
    plate: 'MNO-345',
    type: 'Camión Mediano',
    capacity: '1500 kg',
    currentLoad: '0 kg',
    status: 'Mantenimiento',
    fuel: 30,
    location: 'Taller',
    driver: 'Sin asignar',
  },
  {
    id: 'VEH-006',
    plate: 'PQR-678',
    type: 'Camión Grande',
    capacity: '2500 kg',
    currentLoad: '2100 kg',
    status: 'En ruta',
    fuel: 55,
    location: 'Zona Este',
    driver: 'Roberto Sánchez',
  },
];

export function WebVehicles({ onNavigate }: WebVehiclesProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState<VehiculoCreate>({
    placa: '',
    tipo: 'Camión Grande',
    capacidad: 0,
    conductor: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await vehiculosService.createVehiculo(formData);
      setSuccess(true);
      setTimeout(() => {
        setShowAddDialog(false);
        setSuccess(false);
        setFormData({ placa: '', tipo: 'Camión Grande', capacidad: 0, conductor: '' });
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al crear el vehículo');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En ruta':
        return 'bg-blue-100 text-blue-700';
      case 'Disponible':
        return 'bg-green-100 text-green-700';
      case 'Mantenimiento':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getFuelColor = (fuel: number) => {
    if (fuel >= 70) return 'text-green-600';
    if (fuel >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateLoadPercentage = (current: string, capacity: string) => {
    const currentNum = parseFloat(current);
    const capacityNum = parseFloat(capacity);
    return Math.round((currentNum / capacityNum) * 100);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="vehicles" onNavigate={onNavigate} />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Gestión de Vehículos</h1>
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Agregar Vehículo
            </button>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Vehículos</p>
                  <p className="text-gray-900">6</p>
                </div>
                <Truck className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 mb-1">En Ruta</p>
                  <p className="text-green-900">4</p>
                </div>
                <Truck className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 mb-1">Disponibles</p>
                  <p className="text-blue-900">1</p>
                </div>
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-700 mb-1">Mantenimiento</p>
                  <p className="text-yellow-900">1</p>
                </div>
                <Truck className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Tabla de vehículos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-700">ID</th>
                    <th className="text-left px-6 py-4 text-gray-700">Placa</th>
                    <th className="text-left px-6 py-4 text-gray-700">Tipo</th>
                    <th className="text-left px-6 py-4 text-gray-700">Capacidad</th>
                    <th className="text-left px-6 py-4 text-gray-700">Carga Actual</th>
                    <th className="text-left px-6 py-4 text-gray-700">Combustible</th>
                    <th className="text-left px-6 py-4 text-gray-700">Estado</th>
                    <th className="text-left px-6 py-4 text-gray-700">Conductor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vehicles.map(vehicle => {
                    const loadPercentage = calculateLoadPercentage(vehicle.currentLoad, vehicle.capacity);
                    return (
                      <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-900">{vehicle.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-900">{vehicle.plate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{vehicle.type}</td>
                        <td className="px-6 py-4 text-gray-900">{vehicle.capacity}</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Package className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-900 text-sm">{vehicle.currentLoad}</span>
                            </div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${loadPercentage >= 80
                                  ? 'bg-red-500'
                                  : loadPercentage >= 60
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                  }`}
                                style={{ width: `${loadPercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Battery className={`w-4 h-4 ${getFuelColor(vehicle.fuel)}`} />
                            <span className={`text-sm ${getFuelColor(vehicle.fuel)}`}>{vehicle.fuel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{vehicle.driver}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estadísticas adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <Gauge className="w-10 h-10 text-blue-600" />
                <div>
                  <p className="text-gray-600 text-sm">Promedio de Combustible</p>
                  <p className="text-gray-900 text-xl">60%</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <Package className="w-10 h-10 text-green-600" />
                <div>
                  <p className="text-gray-600 text-sm">Capacidad Total</p>
                  <p className="text-gray-900 text-xl">11,300 kg</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <Truck className="w-10 h-10 text-purple-600" />
                <div>
                  <p className="text-gray-600 text-sm">Carga Actual Total</p>
                  <p className="text-gray-900 text-xl">5,550 kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog para agregar vehículo */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Agregar Nuevo Vehículo</h2>
              <button
                onClick={() => {
                  setShowAddDialog(false);
                  setError(null);
                  setSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">✓ Vehículo agregado exitosamente</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placa del Vehículo
                </label>
                <input
                  type="text"
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  placeholder="Ej: ABC-123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  pattern="[A-Z]{3}-[0-9]{3}"
                  title="Formato: ABC-123"
                />
                <p className="text-xs text-gray-500 mt-1">Formato: 3 letras - 3 números (Ej: ABC-123)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Vehículo
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Camión Grande">Camión Grande</option>
                  <option value="Camión Mediano">Camión Mediano</option>
                  <option value="Camioneta">Camioneta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidad (kg)
                </label>
                <input
                  type="number"
                  value={formData.capacidad || ''}
                  onChange={(e) => setFormData({ ...formData, capacidad: parseInt(e.target.value) || 0 })}
                  placeholder="Ej: 2500"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Capacidad máxima de carga en kilogramos</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conductor (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.conductor || ''}
                  onChange={(e) => setFormData({ ...formData, conductor: e.target.value })}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Nombre del conductor asignado</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddDialog(false);
                    setError(null);
                    setSuccess(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Agregando...' : 'Agregar Vehículo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
