import { useState } from 'react';
import { ArrowLeft, Package, MapPin, Calendar, Check } from 'lucide-react';

interface MobileCreateRequestProps {
  onNavigate: (view: string) => void;
}

const wasteTypes = [
  { id: 'plastic', name: 'Plástico', icon: '♻️', color: 'blue' },
  { id: 'paper', name: 'Papel', icon: '📄', color: 'yellow' },
  { id: 'cardboard', name: 'Cartón', icon: '📦', color: 'orange' },
  { id: 'glass', name: 'Vidrio', icon: '🍾', color: 'green' },
  { id: 'organic', name: 'Orgánico', icon: '🌿', color: 'green' },
  { id: 'metal', name: 'Metal', icon: '🔩', color: 'gray' },
];

export function MobileCreateRequest({ onNavigate }: MobileCreateRequestProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    setStep(4);
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 border-blue-300 text-blue-700',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-700',
      orange: 'bg-orange-100 border-orange-300 text-orange-700',
      green: 'bg-green-100 border-green-300 text-green-700',
      gray: 'bg-gray-100 border-gray-300 text-gray-700',
    };
    return colors[color] || colors.gray;
  };

  const getSelectedColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500 border-blue-600 text-white',
      yellow: 'bg-yellow-500 border-yellow-600 text-white',
      orange: 'bg-orange-500 border-orange-600 text-white',
      green: 'bg-green-500 border-green-600 text-white',
      gray: 'bg-gray-500 border-gray-600 text-white',
    };
    return colors[color] || colors.gray;
  };

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
          <h2 className="text-white">Nueva Solicitud</h2>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Tipo de residuo */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Selecciona el tipo de residuo</h3>
              <p className="text-gray-600 text-sm">Elige el material que deseas reciclar</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {wasteTypes.map(type => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      isSelected 
                        ? getSelectedColorClass(type.color)
                        : getColorClass(type.color)
                    }`}
                  >
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <p className={`${isSelected ? 'text-white' : ''}`}>{type.name}</p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedType}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 2: Dirección y fecha */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Detalles de recolección</h3>
              <p className="text-gray-600 text-sm">Ingresa la dirección y fecha</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Dirección</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ingresa tu dirección"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Fecha preferida</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Notas adicionales (opcional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Material en bolsas verdes, entrada por puerta lateral..."
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!address || !date}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmar ubicación */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Confirma la ubicación</h3>
              <p className="text-gray-600 text-sm">Verifica que el marcador esté en el lugar correcto</p>
            </div>

            {/* Mapa simulado */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl h-80 relative overflow-hidden mb-6 border border-gray-200">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-mobile" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#44AA55" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-mobile)" />
                </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 rounded-full p-4 shadow-2xl animate-bounce">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 mb-6">
              <h4 className="text-gray-900 mb-3">Resumen de tu solicitud</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de residuo:</span>
                  <span className="text-gray-900">
                    {wasteTypes.find(t => t.id === selectedType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dirección:</span>
                  <span className="text-gray-900 text-right max-w-[60%]">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="text-gray-900">{date}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl"
              >
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmación */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-3">¡Solicitud Creada!</h3>
            <p className="text-gray-600 mb-8">
              Tu recolección ha sido programada. Te notificaremos cuando el vehículo esté en camino.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('tracking')}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg"
              >
                Ver Seguimiento
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full py-4 bg-gray-200 text-gray-700 rounded-2xl"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
