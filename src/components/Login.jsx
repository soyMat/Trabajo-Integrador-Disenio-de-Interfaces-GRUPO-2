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
    <div className="flex-grow flex flex-col items-center justify-center p-4 min-h-[calc(100vh-60px)]">
      <Logo className="mb-8" />
      
      <div className="glass-panel w-full max-w-md p-8 pt-10 relative mt-4">
        <h2 className="text-2xl font-title font-bold text-center text-brand-indigo mb-8">
          Ingrese a su Cuenta
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-center font-bold text-brand-indigo mb-2 text-lg">
              Email
            </label>
            <input 
              type="email" 
              placeholder="ejemploadmin@gmail.com" 
              className="input-field text-center py-3"
              required
            />
          </div>
          
          <div>
            <label className="block text-center font-bold text-brand-indigo mb-2 text-lg">
              Contraseña
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="***************" 
                className="input-field text-center py-3 tracking-widest font-bold"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-indigo transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-center pt-2 pb-4">
            <button type="submit" className="btn-primary w-40 text-lg py-2">
              Iniciar Sesión
            </button>
          </div>
          
          <div className="flex justify-between items-center text-sm font-medium mt-4">
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
