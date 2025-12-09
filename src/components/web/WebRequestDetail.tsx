import { ArrowLeft, MapPin, Package, Calendar, User, Truck } from 'lucide-react';
import { WebSidebar } from './WebSidebar';

interface WebRequestDetailProps {
  requestId: string | null;
  onNavigate: (view: string) => void;
}

const mockRequestData = {
  '1': {
    id: '1',
    client: 'Café Central',
    contactName: 'María González',
    phone: '+52 55 1234 5678',
    type: 'Plástico',
    address: 'Av. Principal 123, Centro',
    coordinates: '19.4326, -99.1332',
    date: '2025-12-09',
    time: '10:30 AM',
    status: 'En ruta',
    estimatedWeight: '45 kg',
    notes: 'Botellas PET limpias y separadas. Entrada por puerta lateral.',
    assignedRoute: 'Ruta 2',
    assignedVehicle: 'VEH-003',
  },
  '2': {
    id: '2',
    client: 'Supermercado Norte',
    contactName: 'Juan Pérez',
    phone: '+52 55 9876 5432',
    type: 'Cartón',
    address: 'Calle Norte 456, Zona Norte',
    coordinates: '19.5000, -99.1500',
    date: '2025-12-09',
    time: '2:00 PM',
    status: 'Pendiente',
    estimatedWeight: '120 kg',
    notes: 'Cajas de cartón plegadas en área de descarga.',
    assignedRoute: 'Sin asignar',
    assignedVehicle: 'Sin asignar',
  },
};

export function WebRequestDetail({ requestId, onNavigate }: WebRequestDetailProps) {
  const request = requestId ? mockRequestData[requestId as keyof typeof mockRequestData] : mockRequestData['1'];

  if (!request) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <WebSidebar currentView="requests" onNavigate={onNavigate} />
        <div className="flex-1 p-8">
          <p>Solicitud no encontrada</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="requests" onNavigate={onNavigate} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('requests')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a solicitudes
          </button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 mb-2">Solicitud #{request.id.padStart(4, '0')}</h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg">
              <Truck className="w-5 h-5" />
              Asignar a Ruta
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información del cliente */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  Información del Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Cliente</p>
                    <p className="text-gray-900">{request.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Contacto</p>
                    <p className="text-gray-900">{request.contactName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Teléfono</p>
                    <p className="text-gray-900">{request.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Tipo de Residuo</p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      {request.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Ubicación
                </h3>
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1">Dirección</p>
                  <p className="text-gray-900">{request.address}</p>
                  <p className="text-gray-500 text-sm mt-1">{request.coordinates}</p>
                </div>
                
                {/* Mapa simulado */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl h-64 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid-detail" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#44AA55" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-detail)" />
                    </svg>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-red-500 rounded-full p-3 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles adicionales */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4">Detalles Adicionales</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Peso Estimado</p>
                    <p className="text-gray-900">{request.estimatedWeight}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Notas</p>
                    <p className="text-gray-900">{request.notes}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="space-y-6">
              {/* Programación */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Programación
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Fecha</p>
                    <p className="text-gray-900">{request.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Hora</p>
                    <p className="text-gray-900">{request.time}</p>
                  </div>
                </div>
              </div>

              {/* Asignación */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  Asignación
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Ruta</p>
                    <p className="text-gray-900">{request.assignedRoute}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Vehículo</p>
                    <p className="text-gray-900">{request.assignedVehicle}</p>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Editar Solicitud
                  </button>
                  <button className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Contactar Cliente
                  </button>
                  <button className="w-full px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                    Cancelar Solicitud
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
