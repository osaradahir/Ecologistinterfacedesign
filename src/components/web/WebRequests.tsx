import { Plus, Search, Filter, Package } from 'lucide-react';
import { WebSidebar } from './WebSidebar';
import { useState } from 'react';

interface WebRequestsProps {
  onNavigate: (view: string) => void;
  onViewDetail: (id: string) => void;
}

const mockRequests = [
  {
    id: '1',
    client: 'Café Central',
    type: 'Plástico',
    address: 'Av. Principal 123, Centro',
    status: 'En ruta',
    date: '2025-12-09',
  },
  {
    id: '2',
    client: 'Supermercado Norte',
    type: 'Cartón',
    address: 'Calle Norte 456, Zona Norte',
    status: 'Pendiente',
    date: '2025-12-09',
  },
  {
    id: '3',
    client: 'Oficinas Tech',
    type: 'Papel',
    address: 'Torre Empresarial, Piso 5',
    status: 'Completado',
    date: '2025-12-08',
  },
  {
    id: '4',
    client: 'Restaurant La Esquina',
    type: 'Orgánico',
    address: 'Plaza Central, Local 12',
    status: 'Pendiente',
    date: '2025-12-09',
  },
  {
    id: '5',
    client: 'Hotel Plaza',
    type: 'Vidrio',
    address: 'Av. Turística 789',
    status: 'En ruta',
    date: '2025-12-09',
  },
  {
    id: '6',
    client: 'Escuela Primavera',
    type: 'Papel',
    address: 'Barrio Sur, Manzana 5',
    status: 'Completado',
    date: '2025-12-08',
  },
];

export function WebRequests({ onNavigate, onViewDetail }: WebRequestsProps) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = mockRequests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = req.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-700';
      case 'En ruta':
        return 'bg-blue-100 text-blue-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Plástico':
        return 'text-blue-600';
      case 'Papel':
        return 'text-yellow-600';
      case 'Cartón':
        return 'text-orange-600';
      case 'Vidrio':
        return 'text-green-600';
      case 'Orgánico':
        return 'text-green-700';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="requests" onNavigate={onNavigate} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Gestión de Solicitudes</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg">
              <Plus className="w-5 h-5" />
              Crear Solicitud
            </button>
          </div>

          {/* Filtros y búsqueda */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por cliente o tipo de residuo..."
                  className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <Filter className="w-5 h-5 text-gray-400 my-auto" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">Todos los estados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En ruta">En ruta</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de solicitudes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-700">ID</th>
                    <th className="text-left px-6 py-4 text-gray-700">Cliente</th>
                    <th className="text-left px-6 py-4 text-gray-700">Tipo de Residuo</th>
                    <th className="text-left px-6 py-4 text-gray-700">Dirección</th>
                    <th className="text-left px-6 py-4 text-gray-700">Fecha</th>
                    <th className="text-left px-6 py-4 text-gray-700">Estado</th>
                    <th className="text-left px-6 py-4 text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-600">#{request.id.padStart(4, '0')}</td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{request.client}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package className={`w-4 h-4 ${getTypeColor(request.type)}`} />
                          <span className="text-gray-900">{request.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{request.address}</td>
                      <td className="px-6 py-4 text-gray-600">{request.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onViewDetail(request.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl mt-6">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron solicitudes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
