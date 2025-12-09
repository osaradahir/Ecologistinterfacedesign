import { Truck, Plus, Battery, Gauge, Package } from 'lucide-react';
import { WebSidebar } from './WebSidebar';

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
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg">
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
                                className={`h-full ${
                                  loadPercentage >= 80 
                                    ? 'bg-red-500' 
                                    : loadPercentage >= 60 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                                }`}
                                style={{ width: `${loadPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Battery className={`w-4 h-4 ${getFuelColor(vehicle.fuel)}`} />
                            <span className={`${getFuelColor(vehicle.fuel)}`}>{vehicle.fuel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{vehicle.driver}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alertas */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="text-yellow-900 mb-2">Combustible Bajo</h4>
                  <p className="text-yellow-700 text-sm">
                    El vehículo VEH-005 requiere reabastecimiento de combustible (30%)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="text-red-900 mb-2">Capacidad Crítica</h4>
                  <p className="text-red-700 text-sm">
                    El vehículo VEH-006 está al 84% de su capacidad máxima
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
