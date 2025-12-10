import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, TrendingUp, Zap, X, CheckSquare, Square } from 'lucide-react';
import { WebSidebar } from './WebSidebar';
import { rutasService } from '../../services/rutas.service';
import { solicitudesService } from '../../services/solicitudes.service';
import type { Solicitud } from '../../types';

interface WebRoutesProps {
  onNavigate: (view: string) => void;
}

const routes = [
  { id: 1, name: 'Ruta Centro', stops: 8, distance: '24.5 km', time: '2h 15min', efficiency: 92, color: 'blue' },
  { id: 2, name: 'Ruta Norte', stops: 12, distance: '35.2 km', time: '3h 30min', efficiency: 87, color: 'green' },
  { id: 3, name: 'Ruta Sur', stops: 6, distance: '18.3 km', time: '1h 45min', efficiency: 95, color: 'purple' },
  { id: 4, name: 'Ruta Este', stops: 10, distance: '28.7 km', time: '2h 50min', efficiency: 78, color: 'orange' },
];

export function WebRoutes({ onNavigate }: WebRoutesProps) {
  const [showOptimizeDialog, setShowOptimizeDialog] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
  const [pendingRequests, setPendingRequests] = useState<Solicitud[]>([]);

  useEffect(() => {
    if (showOptimizeDialog) {
      loadPendingRequests();
    }
  }, [showOptimizeDialog]);

  const loadPendingRequests = async () => {
    setLoadingRequests(true);
    try {
      const solicitudes = await solicitudesService.getSolicitudes('pending');
      setPendingRequests(solicitudes);
    } catch (err) {
      console.error('Error loading pending requests:', err);
      setError('Error al cargar solicitudes pendientes');
    } finally {
      setLoadingRequests(false);
    }
  };

  const toggleRequest = (id: string) => {
    setSelectedRequests(prev =>
      prev.includes(id) ? prev.filter(reqId => reqId !== id) : [...prev, id]
    );
  };

  const handleOptimize = async () => {
    if (selectedRequests.length < 2) {
      setError('Selecciona al menos 2 solicitudes para optimizar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await rutasService.optimizarRutas(selectedRequests);
      setOptimizedRoute(result);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al optimizar las rutas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="routes" onNavigate={onNavigate} />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Optimización de Rutas</h1>
            <button
              onClick={() => setShowOptimizeDialog(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Optimizar Rutas
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mapa principal */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Mapa de Rutas</h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-routes" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#44AA55" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-routes)" />
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">Vista del mapa de rutas optimizadas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral de estadísticas */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4">Estadísticas del Día</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Rutas Activas</span>
                      <span className="text-gray-900 font-semibold">4</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Paradas Completadas</span>
                      <span className="text-gray-900 font-semibold">24/36</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Eficiencia Promedio</span>
                      <span className="text-gray-900 font-semibold">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <p className="text-white/80 text-sm">Distancia Total Hoy</p>
                    <p className="text-2xl font-bold">106.7 km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8" />
                  <div>
                    <p className="text-white/80 text-sm">Tiempo Total</p>
                    <p className="text-2xl font-bold">10h 20min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rutas activas */}
          <div className="mt-8">
            <h2 className="text-gray-900 mb-4">Rutas Activas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {routes.map(route => (
                <div key={route.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">{route.name}</h3>
                    <div className={`w-3 h-3 rounded-full bg-${route.color}-500`} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{route.stops} paradas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{route.time}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Eficiencia</span>
                        <span className="text-xs font-semibold text-gray-900">{route.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`bg-${route.color}-600 h-1.5 rounded-full`}
                          style={{ width: `${route.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog para optimizar rutas */}
      {showOptimizeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Optimizar Rutas</h2>
              <button
                onClick={() => {
                  setShowOptimizeDialog(false);
                  setError(null);
                  setSuccess(false);
                  setOptimizedRoute(null);
                  setSelectedRequests([]);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {success && optimizedRoute && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold mb-2">✓ Ruta optimizada exitosamente</p>
                <p className="text-sm text-green-600">Distancia total: {optimizedRoute.distancia_total?.toFixed(2)} km</p>
                <p className="text-sm text-green-600">Solicitudes en ruta: {optimizedRoute.solicitudes?.length || selectedRequests.length}</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {!success && (
              <>
                {loadingRequests ? (
                  <p className="text-gray-600 mb-4 text-center">Cargando solicitudes pendientes...</p>
                ) : pendingRequests.length === 0 ? (
                  <p className="text-gray-600 mb-4 text-center">No hay solicitudes pendientes para optimizar</p>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">
                      Selecciona las solicitudes pendientes que deseas incluir en la ruta optimizada:
                    </p>

                    <div className="space-y-2 mb-6">
                      {pendingRequests.map(request => (
                        <div
                          key={request.id}
                          onClick={() => toggleRequest(request.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedRequests.includes(request.id)
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {selectedRequests.includes(request.id) ? (
                                <CheckSquare className="w-5 h-5 text-green-600" />
                              ) : (
                                <Square className="w-5 h-5 text-gray-400" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{request.cliente?.nombre || 'Cliente'}</p>
                                <p className="text-sm text-gray-600">{request.direccion}</p>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{request.tipo_residuo?.descripcion || 'Residuo'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOptimizeDialog(false);
                      setSelectedRequests([]);
                      setError(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleOptimize}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || selectedRequests.length < 2}
                  >
                    {loading ? 'Optimizando...' : `Optimizar (${selectedRequests.length} seleccionadas)`}
                  </button>
                </div>
              </>
            )}

            {success && (
              <button
                onClick={() => {
                  setShowOptimizeDialog(false);
                  setSuccess(false);
                  setOptimizedRoute(null);
                  setSelectedRequests([]);
                  window.location.reload();
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
