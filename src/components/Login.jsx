import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Logo from './Logo';

const correoDemo = 'admin@australmarket.com';
const contrasenaDemo = 'admin123';

const Login = () => {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [datosLogin, setDatosLogin] = useState({ email: '', contrasena: '' });
  const [errores, setErrores] = useState({});
  const [mensajeSecundario, setMensajeSecundario] = useState('');
  const navigate = useNavigate();

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatosLogin(datosPrevios => ({ ...datosPrevios, [name]: value }));
    setErrores(erroresPrevios => ({ ...erroresPrevios, [name]: '', credenciales: '' }));
    setMensajeSecundario('');
  };

  const validarLogin = () => {
    const erroresNuevos = {};

    if (!datosLogin.email.trim()) {
      erroresNuevos.email = 'Ingresá tu email.';
    } else if (!validarEmail(datosLogin.email)) {
      erroresNuevos.email = 'El email no tiene un formato válido.';
    }

    if (!datosLogin.contrasena.trim()) {
      erroresNuevos.contrasena = 'Ingresá tu contraseña.';
    }

    if (Object.keys(erroresNuevos).length === 0 && (datosLogin.email !== correoDemo || datosLogin.contrasena !== contrasenaDemo)) {
      erroresNuevos.credenciales = 'Email o contraseña incorrectos.';
    }

    setErrores(erroresNuevos);
    return Object.keys(erroresNuevos).length === 0;
  };

  const ingresar = (evento) => {
    evento.preventDefault();
    if (validarLogin()) navigate('/productos');
  };

  const mostrarAccionSecundaria = (mensaje) => {
    setMensajeSecundario(mensaje);
    setTimeout(() => setMensajeSecundario(''), 3500);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-5 py-8 sm:p-4">
      <Logo className="mb-8 scale-75 sm:scale-100" />

      <div className="glass-panel w-full max-w-sm p-6 pt-7 relative mt-2 sm:max-w-md sm:p-8 sm:pt-10 sm:mt-4">
        <h2 className="text-xl font-title font-bold text-center text-brand-indigo mb-7 sm:text-2xl sm:mb-8">
          Inicio de Sesión
        </h2>

        <form onSubmit={ingresar} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-center font-bold text-brand-indigo mb-2 text-base sm:text-lg">
              Email <span className="text-brand-coral">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={datosLogin.email}
              onChange={cambiarCampo}
              placeholder="admin@australmarket.com"
              className={`input-field bg-white text-center py-2.5 sm:py-3 ${errores.email || errores.credenciales ? 'border-red-500 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-300' : ''}`}
              aria-invalid={Boolean(errores.email)}
              aria-describedby={errores.email ? 'email-error' : undefined}
            />
            {errores.email && <p id="email-error" className="mt-2 text-center text-xs font-semibold text-red-600">{errores.email}</p>}
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-center font-bold text-brand-indigo mb-2 text-base sm:text-lg">
              Contraseña <span className="text-brand-coral">*</span>
            </label>
            <div className="relative">
              <input
                id="contrasena"
                name="contrasena"
                type={mostrarContrasena ? 'text' : 'password'}
                value={datosLogin.contrasena}
                onChange={cambiarCampo}
                placeholder="********"
                className={`input-field bg-white text-center py-2.5 pr-11 tracking-widest font-bold sm:py-3 ${errores.contrasena || errores.credenciales ? 'border-red-500 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-300' : ''}`}
                aria-invalid={Boolean(errores.contrasena)}
                aria-describedby={errores.contrasena ? 'contrasena-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-button hover:text-brand-indigo transition-colors"
                aria-label={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {mostrarContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errores.contrasena && <p id="contrasena-error" className="mt-2 text-center text-xs font-semibold text-red-600">{errores.contrasena}</p>}
          </div>

          {errores.credenciales && (
            <div className="flex items-center justify-center gap-2 rounded-md border border-brand-separator bg-white px-3 py-2 text-sm font-semibold text-brand-indigo shadow-sm">
              <AlertCircle size={16} className="text-red-600" />
              {errores.credenciales}
            </div>
          )}

          {mensajeSecundario && (
            <div className="rounded-md border border-brand-button/20 bg-white px-3 py-2 text-center text-xs font-semibold text-brand-indigo sm:text-sm">
              {mensajeSecundario}
            </div>
          )}

          <div className="flex justify-center pt-1 pb-4">
            <button type="submit" className="btn-primary w-32 py-2 text-sm sm:w-40 sm:text-lg">
              Iniciar
            </button>
          </div>

          <div className="flex flex-col items-center gap-5 text-sm font-medium sm:flex-row sm:justify-between sm:gap-0">
            <button type="button" onClick={() => mostrarAccionSecundaria('Te enviaremos las instrucciones para recuperar tu contrasena.')} className="text-brand-button hover:text-brand-indigo underline transition-colors">
              ¿Olvidó su Contraseña?
            </button>
            <button type="button" onClick={() => mostrarAccionSecundaria('Tu solicitud de acceso quedo registrada para revision.')} className="text-brand-button hover:text-brand-indigo underline transition-colors">
              Solicitar acceso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
