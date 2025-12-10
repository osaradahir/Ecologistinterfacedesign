import React, { useState } from 'react';
import { Plus, Search, Filter, Package, X } from 'lucide-react';
import { WebSidebar } from './WebSidebar';
import { solicitudesService } from '../../services/solicitudes.service';
import type { SolicitudCreate } from '../../types';

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
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState<SolicitudCreate>({
    tipo_residuo_id: 1,
    direccion: '',
    lat: 0,
    lng: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await solicitudesService.createSolicitud(formData);
      setSuccess(true);
      setTimeout(() => {
        setShowCreateDialog(false);
        setSuccess(false);
        setFormData({ tipo_residuo_id: 1, direccion: '', lat: 0, lng: 0 });
        // Reload page to show new request
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al crear la solicitud');
    } finally {
      setLoading(false);
    }
  };

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
            <button
              onClick={() => setShowCreateDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
            >
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

      {/* Dialog para crear solicitud */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Crear Nueva Solicitud</h2>
              <button
                onClick={() => {
                  setShowCreateDialog(false);
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
                <p className="text-green-700">✓ Solicitud creada exitosamente</p>
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
                  Tipo de Residuo
                </label>
                <select
                  value={formData.tipo_residuo_id}
                  onChange={(e) => setFormData({ ...formData, tipo_residuo_id: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value={1}>Plástico</option>
                  <option value={2}>Papel</option>
                  <option value={3}>Cartón</option>
                  <option value={4}>Vidrio</option>
                  <option value={5}>Orgánico</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  placeholder="Ej: Av. Principal 123, Centro"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitud
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                    placeholder="19.4326"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitud
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                    placeholder="-99.1332"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateDialog(false);
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
                  {loading ? 'Creando...' : 'Crear Solicitud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
