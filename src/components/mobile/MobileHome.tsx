import { Plus, Package, Clock, History, MapPin, TrendingUp, Recycle } from 'lucide-react';

interface MobileHomeProps {
  onNavigate: (view: string) => void;
}

const recentRequests = [
  { id: '1', type: 'Plástico', date: '2025-12-09', status: 'Completado' },
  { id: '2', type: 'Papel', date: '2025-12-08', status: 'Completado' },
  { id: '3', type: 'Cartón', date: '2025-12-06', status: 'Completado' },
];

export function MobileHome({ onNavigate }: MobileHomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-blue-500 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-green-100 text-sm">Bienvenido de vuelta</p>
            <h2 className="text-white">Juan Pérez</h2>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Recycle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <Package className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Recolecciones</p>
            <p className="text-white">24</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Kilos</p>
            <p className="text-white">156 kg</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <Recycle className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">CO₂ Evitado</p>
            <p className="text-white">42 kg</p>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-4">
        {/* Botón principal */}
        <button
          onClick={() => onNavigate('create-request')}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mb-6"
        >
          <Plus className="w-7 h-7" />
          <span className="text-lg">Solicitar Recolección</span>
        </button>

        {/* Próxima recolección */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-gray-900">Próxima Recolección</h3>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-blue-900 mb-1">Cartón y Papel</p>
                <p className="text-blue-700 text-sm">Miércoles, 11 Diciembre</p>
              </div>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                Programado
              </span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Av. Principal 123, Centro</span>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver en Mapa
            </button>
          </div>
        </div>

        {/* Historial reciente */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <History className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900">Historial Reciente</h3>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="text-green-600 text-sm"
            >
              Ver todo
            </button>
          </div>
          <div className="space-y-3">
            {recentRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{request.type}</p>
                    <p className="text-gray-600 text-sm">{request.date}</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-green-600">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xs">Inicio</span>
          </button>
          <button
            onClick={() => onNavigate('create-request')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs">Nueva</span>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <span className="text-xs">Historial</span>
          </button>
        </div>
      </div>
    </div>
  );
}
