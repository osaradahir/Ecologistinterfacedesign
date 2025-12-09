import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Package, Truck } from 'lucide-react';
import { WebSidebar } from './WebSidebar';

interface WebReportsProps {
  onNavigate: (view: string) => void;
}

const monthlyData = [
  { month: 'Ene', recolecciones: 245, kilos: 6800 },
  { month: 'Feb', recolecciones: 268, kilos: 7200 },
  { month: 'Mar', recolecciones: 290, kilos: 7900 },
  { month: 'Abr', recolecciones: 310, kilos: 8400 },
  { month: 'May', recolecciones: 285, kilos: 7800 },
  { month: 'Jun', recolecciones: 325, kilos: 8900 },
];

const wasteTypeData = [
  { name: 'Plástico', value: 3500, color: '#0077CC' },
  { name: 'Papel', value: 2800, color: '#FCD34D' },
  { name: 'Cartón', value: 2200, color: '#FB923C' },
  { name: 'Vidrio', value: 1800, color: '#44AA55' },
  { name: 'Orgánico', value: 1200, color: '#86EFAC' },
];

const efficiencyData = [
  { week: 'Sem 1', eficiencia: 85 },
  { week: 'Sem 2', eficiencia: 88 },
  { week: 'Sem 3', eficiencia: 92 },
  { week: 'Sem 4', eficiencia: 90 },
];

export function WebReports({ onNavigate }: WebReportsProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="reports" onNavigate={onNavigate} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Reportes y Análisis</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg">
              <Download className="w-5 h-5" />
              Exportar Reporte
            </button>
          </div>

          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Package className="w-8 h-8" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="mb-1 opacity-90">Total Recolecciones</p>
              <p className="text-3xl">1,723</p>
              <p className="text-sm mt-2 opacity-75">+15% vs mes anterior</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="mb-1 opacity-90">Kilos Totales</p>
              <p className="text-3xl">47,100 kg</p>
              <p className="text-sm mt-2 opacity-75">+12% vs mes anterior</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Truck className="w-8 h-8" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="mb-1 opacity-90">Eficiencia Promedio</p>
              <p className="text-3xl">89%</p>
              <p className="text-sm mt-2 opacity-75">+3% vs mes anterior</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Package className="w-8 h-8" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="mb-1 opacity-90">Clientes Activos</p>
              <p className="text-3xl">342</p>
              <p className="text-sm mt-2 opacity-75">+8% vs mes anterior</p>
            </div>
          </div>

          {/* Gráficas principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recolecciones mensuales */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-6">Recolecciones y Kilos por Mes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="recolecciones" fill="#0077CC" radius={[8, 8, 0, 0]} name="Recolecciones" />
                  <Bar dataKey="kilos" fill="#44AA55" radius={[8, 8, 0, 0]} name="Kilos (x10)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución por tipo de residuo */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-6">Distribución por Tipo de Residuo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Eficiencia y tendencias */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tendencia de eficiencia */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-6">Eficiencia de Rutas (Último Mes)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis domain={[0, 100]} stroke="#9ca3af" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="eficiencia" 
                    stroke="#44AA55" 
                    strokeWidth={3}
                    dot={{ fill: '#44AA55', r: 6 }}
                    name="Eficiencia %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de top clientes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Top 5 Clientes del Mes</h3>
              <div className="space-y-3">
                {[
                  { name: 'Supermercado Norte', kilos: 1250, requests: 24 },
                  { name: 'Hotel Plaza', kilos: 980, requests: 18 },
                  { name: 'Oficinas Tech', kilos: 850, requests: 22 },
                  { name: 'Restaurant La Esquina', kilos: 720, requests: 16 },
                  { name: 'Café Central', kilos: 650, requests: 20 },
                ].map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-900">{client.name}</p>
                        <p className="text-gray-600 text-sm">{client.requests} solicitudes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">{client.kilos} kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen ejecutivo */}
          <div className="mt-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-gray-900 mb-4">Resumen Ejecutivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Reducción de Emisiones</p>
                <p className="text-gray-900">~8.5 toneladas CO₂</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Ahorro de Recursos</p>
                <p className="text-gray-900">Equivalente a 230 árboles</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Satisfacción del Cliente</p>
                <p className="text-gray-900">4.8/5.0 ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
