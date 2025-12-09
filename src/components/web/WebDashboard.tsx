import { Package, TrendingUp, Truck, MapPin, ArrowRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WebSidebar } from './WebSidebar';

interface WebDashboardProps {
  onNavigate: (view: string) => void;
}

const weeklyData = [
  { day: 'Lun', kilos: 450 },
  { day: 'Mar', kilos: 520 },
  { day: 'Mié', kilos: 380 },
  { day: 'Jue', kilos: 610 },
  { day: 'Vie', kilos: 490 },
  { day: 'Sáb', kilos: 340 },
  { day: 'Dom', kilos: 280 },
];

const routeData = [
  { name: 'Ruta 1', efficiency: 92 },
  { name: 'Ruta 2', efficiency: 87 },
  { name: 'Ruta 3', efficiency: 95 },
  { name: 'Ruta 4', efficiency: 78 },
];

const recentRequests = [
  { id: '1', client: 'Café Central', type: 'Plástico', status: 'En ruta' },
  { id: '2', client: 'Supermercado Norte', type: 'Cartón', status: 'Pendiente' },
  { id: '3', client: 'Oficinas Tech', type: 'Papel', status: 'Completado' },
];

export function WebDashboard({ onNavigate }: WebDashboardProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="dashboard" onNavigate={onNavigate} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 mb-8">Dashboard</h1>

          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 text-sm">+12%</span>
              </div>
              <p className="text-gray-600 mb-1">Recolecciones Hoy</p>
              <p className="text-gray-900">24</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-blue-600 text-sm">+8%</span>
              </div>
              <p className="text-gray-600 mb-1">Kilos Recolectados</p>
              <p className="text-gray-900">3,070 kg</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 text-sm">100%</span>
              </div>
              <p className="text-gray-600 mb-1">Vehículos Activos</p>
              <p className="text-gray-900">8/8</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-blue-600 text-sm">92%</span>
              </div>
              <p className="text-gray-600 mb-1">Eficiencia Rutas</p>
              <p className="text-gray-900">Óptima</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Gráfica de recolecciones semanales */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Recolecciones Semanales</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="kilos" stroke="#44AA55" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfica de eficiencia de rutas */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Eficiencia por Ruta</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={routeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#0077CC" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mapa y solicitudes recientes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mapa simulado */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Unidades en Tiempo Real</h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl h-80 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#44AA55" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* Vehículos simulados */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 rounded-full p-2 shadow-lg animate-pulse">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-green-600 rounded-full p-2 shadow-lg animate-pulse">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 rounded-full p-2 shadow-lg animate-pulse">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Solicitudes recientes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Solicitudes Recientes</h3>
                <button 
                  onClick={() => onNavigate('requests')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {recentRequests.map(request => (
                  <div key={request.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 text-sm mb-1">{request.client}</p>
                    <p className="text-gray-600 text-sm mb-2">{request.type}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      request.status === 'Completado' 
                        ? 'bg-green-100 text-green-700'
                        : request.status === 'En ruta'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
