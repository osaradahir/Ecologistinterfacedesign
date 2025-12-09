import { useState } from 'react';
import { Mail, Lock, Recycle, Leaf } from 'lucide-react';

interface MobileLoginProps {
  onLogin: () => void;
}

export function MobileLogin({ onLogin }: MobileLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-6 shadow-2xl">
            <Recycle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-white mb-2">Ecologist</h1>
          <p className="text-green-100">Juntos por un planeta más limpio</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-green-600 text-sm">¿Olvidaste tu contraseña?</a>
          </div>
        </div>

        {/* Ilustración decorativa */}
        <div className="mt-8 flex justify-center gap-4 text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2 backdrop-blur">
              <Recycle className="w-8 h-8" />
            </div>
            <p className="text-sm">Recicla</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-2 backdrop-blur">
              <Leaf className="w-8 h-8" />
            </div>
            <p className="text-sm">Cuida</p>
          </div>
        </div>

        <p className="text-center text-white/80 mt-8 text-sm">
          Demo - Use cualquier credencial
        </p>
      </div>
    </div>
  );
}
