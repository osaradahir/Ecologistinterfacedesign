import { MapPin, Navigation, Clock, TrendingUp, Zap } from 'lucide-react';
import { WebSidebar } from './WebSidebar';

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
  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="routes" onNavigate={onNavigate} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Optimización de Rutas</h1>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg">
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
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#44AA55" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-routes)" />
                  </svg>
                </div>

                {/* Ruta 1 - Centro */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 100 200 Q 200 150, 300 180 T 500 200"
                    stroke="#0077CC"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
                <div className="absolute top-[200px] left-[100px]">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-lg">
                    1
                  </div>
                </div>
                <div className="absolute top-[180px] left-[300px]">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-lg">
                    2
                  </div>
                </div>

                {/* Ruta 2 - Norte */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 150 100 Q 300 80, 450 120 T 600 140"
                    stroke="#44AA55"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
                <div className="absolute top-[100px] left-[150px]">
                  <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-lg">
                    1
                  </div>
                </div>
                <div className="absolute top-[120px] left-[450px]">
                  <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-lg">
                    2
                  </div>
                </div>

                {/* Ruta 3 - Sur */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 120 350 Q 250 380, 380 360 T 520 380"
                    stroke="#9333ea"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
                <div className="absolute top-[350px] left-[120px]">
                  <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-lg">
                    1
                  </div>
                </div>

                {/* Centro de distribución */}
                <div className="absolute top-[250px] left-[50px]">
                  <div className="bg-red-500 rounded-lg p-3 shadow-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-900 text-xs mt-1 bg-white px-2 py-1 rounded shadow">Centro</p>
                </div>
              </div>

              {/* Indicadores */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-blue-600" />
                    <p className="text-blue-900 text-sm">Distancia Total</p>
                  </div>
                  <p className="text-blue-900">106.7 km</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <p className="text-green-900 text-sm">Tiempo Total</p>
                  </div>
                  <p className="text-green-900">10h 20min</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <p className="text-purple-900 text-sm">Eficiencia Promedio</p>
                  </div>
                  <p className="text-purple-900">88%</p>
                </div>
              </div>
            </div>

            {/* Lista de rutas */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-4">Rutas Generadas</h3>
                <div className="space-y-3">
                  {routes.map(route => (
                    <div
                      key={route.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-gray-900">{route.name}</h4>
                        <div className={`w-3 h-3 rounded-full bg-${route.color}-500`}></div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Paradas</span>
                          <span className="text-gray-900">{route.stops}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Distancia</span>
                          <span className="text-gray-900">{route.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tiempo</span>
                          <span className="text-gray-900">{route.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Eficiencia</span>
                          <span className={`px-2 py-1 rounded ${
                            route.efficiency >= 90 
                              ? 'bg-green-100 text-green-700'
                              : route.efficiency >= 80
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {route.efficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-gray-900 mb-3">Optimización IA</h4>
                <p className="text-gray-700 text-sm mb-4">
                  El sistema ha identificado oportunidades para reducir el tiempo de ruta en un 12% y el consumo de combustible en un 8%.
                </p>
                <button className="w-full px-4 py-2 bg-white text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors">
                  Ver Sugerencias
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
