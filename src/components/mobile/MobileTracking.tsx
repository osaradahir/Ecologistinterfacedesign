import { ArrowLeft, MapPin, Truck, Package, Phone, Navigation } from 'lucide-react';

interface MobileTrackingProps {
  onNavigate: (view: string) => void;
}

export function MobileTracking({ onNavigate }: MobileTrackingProps) {
  const status = 'en-camino'; // pendiente, en-camino, recolectado

  const getStatusInfo = () => {
    switch (status) {
      case 'pendiente':
        return {
          title: 'Solicitud Pendiente',
          description: 'Tu solicitud está en cola. Te notificaremos cuando sea asignada a una ruta.',
          color: 'yellow',
          step: 1,
        };
      case 'en-camino':
        return {
          title: 'Vehículo en Camino',
          description: 'El vehículo se dirige a tu ubicación. Tiempo estimado: 15 minutos.',
          color: 'blue',
          step: 2,
        };
      case 'recolectado':
        return {
          title: 'Recolección Completada',
          description: '¡Gracias por reciclar! Tu contribución ayuda al planeta.',
          color: 'green',
          step: 3,
        };
      default:
        return {
          title: 'Estado Desconocido',
          description: '',
          color: 'gray',
          step: 1,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-blue-500 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Seguimiento</h2>
        </div>
      </div>

      {/* Mapa */}
      <div className="relative -mt-4">
        <div className="mx-6 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 h-80 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-tracking" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#44AA55" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-tracking)" />
              </svg>
            </div>

            {/* Ruta simulada */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 100 250 Q 150 200, 200 180 T 280 160"
                stroke="#0077CC"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
              />
            </svg>

            {/* Tu ubicación */}
            <div className="absolute top-[250px] left-[100px]">
              <div className="bg-red-500 rounded-full p-3 shadow-2xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                <p className="text-gray-900 text-xs">Tu ubicación</p>
              </div>
            </div>

            {/* Vehículo */}
            <div className="absolute top-[160px] left-[280px]">
              <div className="bg-green-600 rounded-full p-3 shadow-2xl animate-pulse">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                <p className="text-gray-900 text-xs">Vehículo VEH-003</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Estado */}
        <div className={`bg-${statusInfo.color}-50 border border-${statusInfo.color}-200 rounded-2xl p-5 mb-6`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 bg-${statusInfo.color}-500 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className={`text-${statusInfo.color}-900 mb-1`}>{statusInfo.title}</h3>
              <p className={`text-${statusInfo.color}-700 text-sm`}>{statusInfo.description}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 flex items-center justify-between">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= statusInfo.step 
                    ? `bg-${statusInfo.color}-500 text-white` 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step}
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  {step === 1 ? 'Pendiente' : step === 2 ? 'En camino' : 'Completado'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detalles de la solicitud */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 mb-6">
          <h4 className="text-gray-900 mb-4">Detalles de la Recolección</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-600 text-sm">Tipo de residuo</p>
                <p className="text-gray-900">Cartón y Papel</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-600 text-sm">Dirección</p>
                <p className="text-gray-900">Av. Principal 123, Centro</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-600 text-sm">Distancia aproximada</p>
                <p className="text-gray-900">2.3 km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información del conductor */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 mb-6">
          <h4 className="text-gray-900 mb-4">Conductor Asignado</h4>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              <span className="text-lg">LR</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900">Luis Ramírez</p>
              <p className="text-gray-600 text-sm">Vehículo: VEH-003</p>
              <p className="text-gray-600 text-sm">Placa: GHI-789</p>
            </div>
          </div>
          <button className="w-full py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Contactar Conductor
          </button>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <button className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg flex items-center justify-center gap-2">
            <Navigation className="w-5 h-5" />
            Abrir en Maps
          </button>
          <button className="w-full py-4 bg-gray-200 text-gray-700 rounded-2xl">
            Cancelar Recolección
          </button>
        </div>
      </div>
    </div>
  );
}
