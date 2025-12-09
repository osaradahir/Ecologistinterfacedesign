import { ArrowLeft, Package, Calendar, MapPin, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';

interface MobileHistoryProps {
  onNavigate: (view: string) => void;
}

const historyData = [
  {
    id: '1',
    type: 'Plástico',
    icon: '♻️',
    date: '2025-12-09',
    time: '10:30 AM',
    address: 'Av. Principal 123',
    weight: '15 kg',
    status: 'Completado',
    co2Saved: '4.2 kg',
  },
  {
    id: '2',
    type: 'Papel',
    icon: '📄',
    date: '2025-12-08',
    time: '2:15 PM',
    address: 'Av. Principal 123',
    weight: '8 kg',
    status: 'Completado',
    co2Saved: '2.8 kg',
  },
  {
    id: '3',
    type: 'Cartón',
    icon: '📦',
    date: '2025-12-06',
    time: '11:00 AM',
    address: 'Av. Principal 123',
    weight: '22 kg',
    status: 'Completado',
    co2Saved: '6.5 kg',
  },
  {
    id: '4',
    type: 'Vidrio',
    icon: '🍾',
    date: '2025-12-04',
    time: '3:45 PM',
    address: 'Av. Principal 123',
    weight: '12 kg',
    status: 'Completado',
    co2Saved: '3.1 kg',
  },
  {
    id: '5',
    type: 'Plástico',
    icon: '♻️',
    date: '2025-12-02',
    time: '9:20 AM',
    address: 'Av. Principal 123',
    weight: '18 kg',
    status: 'Completado',
    co2Saved: '5.0 kg',
  },
  {
    id: '6',
    type: 'Papel',
    icon: '📄',
    date: '2025-11-30',
    time: '1:30 PM',
    address: 'Av. Principal 123',
    weight: '10 kg',
    status: 'Completado',
    co2Saved: '3.5 kg',
  },
];

export function MobileHistory({ onNavigate }: MobileHistoryProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const totalWeight = historyData.reduce((sum, item) => sum + parseFloat(item.weight), 0);
  const totalCO2 = historyData.reduce((sum, item) => sum + parseFloat(item.co2Saved), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-blue-500 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Historial</h2>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <Package className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Recolecciones</p>
            <p className="text-white">{historyData.length}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Total Kilos</p>
            <p className="text-white">{totalWeight} kg</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-white text-sm">CO₂ Evitado</p>
            <p className="text-white">{totalCO2.toFixed(1)} kg</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filtros */}
        <div className="mb-6">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Filtrar</span>
          </button>

          {filterOpen && (
            <div className="mt-3 bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid grid-cols-3 gap-2">
                {['all', 'Plástico', 'Papel', 'Cartón', 'Vidrio', 'Orgánico'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setFilterOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedFilter === filter
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {filter === 'all' ? 'Todos' : filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lista de recolecciones */}
        <div className="space-y-4">
          {historyData
            .filter(item => selectedFilter === 'all' || item.type === selectedFilter)
            .map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{item.type}</h4>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date} • {item.time}</span>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-700 text-xs mb-1">Peso recolectado</p>
                        <p className="text-blue-900">{item.weight}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-green-700 text-xs mb-1">CO₂ evitado</p>
                        <p className="text-green-900">{item.co2Saved}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{item.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Impacto total */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <h4 className="text-gray-900 mb-4">Tu Impacto Ambiental</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total reciclado</span>
              <span className="text-gray-900">{totalWeight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">CO₂ evitado</span>
              <span className="text-green-700">{totalCO2.toFixed(1)} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Equivalente a</span>
              <span className="text-blue-700">{Math.round(totalCO2 / 22)} árboles plantados</span>
            </div>
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            🌱 ¡Excelente trabajo! Has reciclado {totalWeight} kg de materiales.
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Sigue así y ayuda a construir un futuro más sostenible.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xs">Inicio</span>
          </button>
          <button
            onClick={() => onNavigate('create-request')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xs">Nueva</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-600">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs">Historial</span>
          </button>
        </div>
      </div>
    </div>
  );
}
