import React, { useState } from 'react';
import { ArrowLeft, Package, MapPin, Calendar, Check } from 'lucide-react';
import { solicitudesService } from '../../services/solicitudes.service';
import type { SolicitudCreate } from '../../types';

interface MobileCreateRequestProps {
  onNavigate: (view: string) => void;
}

const wasteTypes = [
  { id: 1, name: 'Plástico', icon: '♻️', color: 'blue' },
  { id: 2, name: 'Papel', icon: '📄', color: 'yellow' },
  { id: 3, name: 'Cartón', icon: '📦', color: 'orange' },
  { id: 4, name: 'Vidrio', icon: '🍾', color: 'green' },
  { id: 5, name: 'Orgánico', icon: '🌿', color: 'green' },
];

export function MobileCreateRequest({ onNavigate }: MobileCreateRequestProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(19.4326);
  const [lng, setLng] = useState(-99.1332);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedType || !address) return;

    setLoading(true);
    setError(null);

    const solicitud: SolicitudCreate = {
      tipo_residuo_id: selectedType,
      direccion: address,
      lat,
      lng
    };

    try {
      await solicitudesService.createSolicitud(solicitud);
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al crear la solicitud');
      setStep(2); // Volver al paso 2 para mostrar el error
    } finally {
      setLoading(false);
    }
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 border-blue-300 text-blue-700',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-700',
      orange: 'bg-orange-100 border-orange-300 text-orange-700',
      green: 'bg-green-100 border-green-300 text-green-700',
    };
    return colors[color] || colors.green;
  };

  const getSelectedColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500 border-blue-600 text-white',
      yellow: 'bg-yellow-500 border-yellow-600 text-white',
      orange: 'bg-orange-500 border-orange-600 text-white',
      green: 'bg-green-500 border-green-600 text-white',
    };
    return colors[color] || colors.green;
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
              className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-white' : 'bg-white/30'
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
                    className={`p-6 rounded-2xl border-2 transition-all ${isSelected
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

        {/* Step 2: Dirección */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Detalles de recolección</h3>
              <p className="text-gray-600 text-sm">Ingresa la dirección</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

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
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Latitud</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Longitud</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
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
                disabled={!address}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmar */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Confirma tu solicitud</h3>
              <p className="text-gray-600 text-sm">Verifica que los datos sean correctos</p>
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
                  <span className="text-gray-600">Coordenadas:</span>
                  <span className="text-gray-900 text-xs">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl"
                disabled={loading}
              >
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Confirmar'}
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
                onClick={() => onNavigate('home')}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg"
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
