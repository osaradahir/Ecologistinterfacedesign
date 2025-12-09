import { Monitor, Smartphone } from 'lucide-react';

interface ViewSelectorProps {
  platform: 'web' | 'mobile';
  onPlatformChange: (platform: 'web' | 'mobile') => void;
  webView: string;
  mobileView: string;
  onWebViewChange: (view: any) => void;
  onMobileViewChange: (view: any) => void;
  isWebAuthenticated: boolean;
  isMobileAuthenticated: boolean;
}

export function ViewSelector({
  platform,
  onPlatformChange,
  webView,
  mobileView,
  onWebViewChange,
  onMobileViewChange,
  isWebAuthenticated,
  isMobileAuthenticated,
}: ViewSelectorProps) {
  const webViews = [
    { id: 'login', label: 'Login' },
    { id: 'dashboard', label: 'Dashboard', auth: true },
    { id: 'requests', label: 'Solicitudes', auth: true },
    { id: 'request-detail', label: 'Detalle', auth: true },
    { id: 'routes', label: 'Rutas', auth: true },
    { id: 'vehicles', label: 'Vehículos', auth: true },
    { id: 'reports', label: 'Reportes', auth: true },
  ];

  const mobileViews = [
    { id: 'login', label: 'Login' },
    { id: 'home', label: 'Home', auth: true },
    { id: 'create-request', label: 'Crear Solicitud', auth: true },
    { id: 'tracking', label: 'Seguimiento', auth: true },
    { id: 'history', label: 'Historial', auth: true },
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Ecologist - Sistema de Demostración</h2>
          <div className="flex gap-2">
            <button
              onClick={() => onPlatformChange('web')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                platform === 'web'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Web Admin
            </button>
            <button
              onClick={() => onPlatformChange('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                platform === 'mobile'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              App Móvil
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {platform === 'web'
            ? webViews
                .filter(view => !view.auth || isWebAuthenticated)
                .map(view => (
                  <button
                    key={view.id}
                    onClick={() => onWebViewChange(view.id)}
                    className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
                      webView === view.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {view.label}
                  </button>
                ))
            : mobileViews
                .filter(view => !view.auth || isMobileAuthenticated)
                .map(view => (
                  <button
                    key={view.id}
                    onClick={() => onMobileViewChange(view.id)}
                    className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
                      mobileView === view.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
        </div>
      </div>
    </div>
  );
}
