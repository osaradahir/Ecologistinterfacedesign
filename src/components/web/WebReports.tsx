import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Package, Truck, X } from 'lucide-react';
import { WebSidebar } from './WebSidebar';
import { reportesService } from '../../services/reportes.service';

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
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  const handleExport = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await reportesService.getEficiencia();

      let content: string;
      let filename: string;
      let mimeType: string;

      if (exportFormat === 'json') {
        content = JSON.stringify(data, null, 2);
        filename = `reporte_eficiencia_${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      } else {
        // CSV format
        const headers = Object.keys(data).join(',');
        const values = Object.values(data).join(',');
        content = `${headers}\n${values}`;
        filename = `reporte_eficiencia_${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      }

      // Create download link
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setTimeout(() => {
        setShowExportDialog(false);
      }, 500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al exportar el reporte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <WebSidebar currentView="reports" onNavigate={onNavigate} />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Reportes y Análisis</h1>
            <button
              onClick={() => setShowExportDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Exportar Reporte
            </button>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Total Recolecciones</p>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-900 text-3xl font-bold">1,723</p>
              <p className="text-green-600 text-sm mt-2">↑ 12% vs mes anterior</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Kilos Recolectados</p>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-900 text-3xl font-bold">47,900</p>
              <p className="text-green-600 text-sm mt-2">↑ 8% vs mes anterior</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Vehículos Activos</p>
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-gray-900 text-3xl font-bold">6</p>
              <p className="text-gray-600 text-sm mt-2">100% operativos</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Eficiencia Promedio</p>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-gray-900 text-3xl font-bold">89%</p>
              <p className="text-green-600 text-sm mt-2">↑ 3% vs mes anterior</p>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Gráfico de barras - Recolecciones mensuales */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Recolecciones Mensuales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="recolecciones" fill="#44AA55" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de líneas - Kilos recolectados */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Kilos Recolectados</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="kilos" stroke="#0077CC" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de pastel - Tipos de residuo */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Distribución por Tipo de Residuo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
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

            {/* Gráfico de eficiencia */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Eficiencia Semanal</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="eficiencia" stroke="#FB923C" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog para exportar reporte */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Exportar Reporte</h2>
              <button
                onClick={() => {
                  setShowExportDialog(false);
                  setError(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Exportación
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                    style={{
                      borderColor: exportFormat === 'json' ? '#44AA55' : '#E5E7EB',
                      backgroundColor: exportFormat === 'json' ? '#F0FDF4' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">JSON</p>
                      <p className="text-sm text-gray-600">Formato estructurado para procesamiento</p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                    style={{
                      borderColor: exportFormat === 'csv' ? '#44AA55' : '#E5E7EB',
                      backgroundColor: exportFormat === 'csv' ? '#F0FDF4' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">CSV</p>
                      <p className="text-sm text-gray-600">Compatible con Excel y hojas de cálculo</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Nota:</strong> El reporte incluirá estadísticas de eficiencia del sistema.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowExportDialog(false);
                    setError(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExport}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Exportando...' : 'Exportar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
