import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from './Logo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/productos');
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-5 py-8 sm:p-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate('/productos')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/productos');
        }}
        className="cursor-pointer"
        aria-label="Ir a productos"
      >
        <Logo className="mb-8 scale-75 sm:scale-100" />
      </div>
      
      <div className="glass-panel w-full max-w-sm p-6 pt-7 relative mt-2 sm:max-w-md sm:p-8 sm:pt-10 sm:mt-4">
        <h2 className="text-xl font-title font-bold text-center text-brand-indigo mb-7 sm:text-2xl sm:mb-8">
          Inicio de Sesión
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-center font-bold text-brand-indigo mb-2 text-base sm:text-lg">
              Email
            </label>
            <input 
              type="email" 
              placeholder="ejemploadmin@gmail.com" 
              className="input-field text-center py-2.5 sm:py-3"
              required
            />
          </div>
          
          <div>
            <label className="block text-center font-bold text-brand-indigo mb-2 text-base sm:text-lg">
              Contraseña
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="***************" 
                className="input-field text-center py-2.5 pr-11 tracking-widest font-bold sm:py-3"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-gray-300 bg-white p-1 text-gray-400 hover:text-brand-indigo transition-colors"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-center pt-1 pb-5 sm:pt-2 sm:pb-4">
            <button type="submit" className="btn-primary w-28 py-2 text-sm sm:w-40 sm:text-lg">
              Iniciar
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-5 text-sm font-medium sm:flex-row sm:justify-between sm:gap-0">
            <a href="#" className="text-brand-teal hover:text-brand-cyan underline transition-colors">
              ¿Olvidó su Contraseña?
            </a>
            <a href="#" className="text-brand-teal hover:text-brand-cyan underline transition-colors">
              Registrarse
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
