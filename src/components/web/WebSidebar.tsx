import { LayoutDashboard, Package, MapPin, Truck, BarChart3, Recycle } from 'lucide-react';

interface WebSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function WebSidebar({ currentView, onNavigate }: WebSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Solicitudes', icon: Package },
    { id: 'routes', label: 'Rutas', icon: MapPin },
    { id: 'vehicles', label: 'Vehículos', icon: Truck },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Ecologist</h2>
            <p className="text-gray-500 text-sm">Admin</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
