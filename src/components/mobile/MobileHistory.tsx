import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Calendar, MapPin, TrendingUp, Filter } from 'lucide-react';
import { solicitudesService } from '../../services/solicitudes.service';
import type { Solicitud } from '../../types';

interface MobileHistoryProps {
  onNavigate: (view: string) => void;
}

const tipoIcons: Record<string, string> = {
  'Plástico': '♻️',
  'Papel': '📄',
  'Cartón': '📦',
  'Vidrio': '🍾',
  'Orgánico': '🌿',
};

export function MobileHistory({ onNavigate }: MobileHistoryProps) {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const loadSolicitudes = async () => {
    try {
      const data = await solicitudesService.getSolicitudes();
      setSolicitudes(data);
    } catch (error) {
      console.error('Error loading solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSolicitudes = selectedFilter === 'all'
    ? solicitudes
    : solicitudes.filter(s => s.tipo_residuo?.descripcion === selectedFilter);

  const completedCount = solicitudes.filter(s => s.estado === 'completed').length;
  const totalWeight = completedCount * 15; // Estimación: 15kg por recolección completada
  const totalCO2 = totalWeight * 0.28; // Estimación: 0.28kg CO2 por kg reciclado

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
            <p className="text-white">{solicitudes.length}</p>
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
                    className={`px-3 py-2 rounded-lg text-sm ${selectedFilter === filter
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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando historial...</p>
          </div>
        ) : filteredSolicitudes.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay solicitudes en el historial</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSolicitudes.map(item => {
              const tipoDesc = item.tipo_residuo?.descripcion || 'Residuo';
              const icon = tipoIcons[tipoDesc] || '📦';
              const estimatedWeight = item.estado === 'completed' ? 15 : 0;
              const estimatedCO2 = estimatedWeight * 0.28;

              return (
                <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-gray-900 mb-1">{tipoDesc}</h4>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.fecha_solicitada).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${item.estado === 'completed' ? 'bg-green-100 text-green-700' :
                            item.estado === 'approved' ? 'bg-blue-100 text-blue-700' :
                              item.estado === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                          }`}>
                          {item.estado === 'completed' ? 'Completado' :
                            item.estado === 'approved' ? 'Aprobado' :
                              item.estado === 'cancelled' ? 'Cancelado' :
                                'Pendiente'}
                        </span>
                      </div>

                      {item.estado === 'completed' && (
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-blue-700 text-xs mb-1">Peso estimado</p>
                            <p className="text-blue-900">{estimatedWeight} kg</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-green-700 text-xs mb-1">CO₂ evitado</p>
                            <p className="text-green-900">{estimatedCO2.toFixed(1)} kg</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{item.direccion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Impacto total */}
        {solicitudes.length > 0 && (
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
        )}

        {/* Mensaje motivacional */}
        {completedCount > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              🌱 ¡Excelente trabajo! Has reciclado {totalWeight} kg de materiales.
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Sigue así y ayuda a construir un futuro más sostenible.
            </p>
          </div>
        )}
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
