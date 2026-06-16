import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, Link as LinkIcon, AlertCircle, X } from 'lucide-react';
import Logo from './Logo';

const datosVacios = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  status: 'Activo',
  imageUrl: ''
};

const ProductModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState(datosVacios);
  const [modoImagen, setModoImagen] = useState('url');
  const referenciaArchivo = useRef(null);
  const [mensajeError, setMensajeError] = useState(null);

  useEffect(() => {
    setDatosFormulario(initialData || datosVacios);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const mostrarError = (mensaje) => {
    setMensajeError(mensaje);
    setTimeout(() => setMensajeError(null), 3000);
  };

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

    if (name === 'price' && Number(value) < 0) {
      mostrarError('El precio no puede ser negativo');
      return;
    }

    if (name === 'stock' && Number(value) < 0) {
      mostrarError('El stock no puede ser negativo');
      return;
    }

    setDatosFormulario(datosPrevios => ({ ...datosPrevios, [name]: value }));
  };

  const cambiarArchivo = (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const urlTemporal = URL.createObjectURL(archivo);
    setDatosFormulario(datosPrevios => ({ ...datosPrevios, imageUrl: urlTemporal }));
  };

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    if (onSave) onSave(datosFormulario);
    onClose();
  };

  const limpiarFormulario = () => {
    setDatosFormulario(datosVacios);
  };

  const irAProductos = () => {
    onClose();
    navigate('/productos');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-indigo/40 p-5 pt-8 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      {mensajeError && (
        <div className="fixed left-1/2 top-6 z-[60] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-red-700 shadow-lg animate-in fade-in slide-in-from-top-4 sm:top-10" onClick={(evento) => evento.stopPropagation()}>
          <AlertCircle className="mr-2 h-5 w-5 shrink-0" />
          <span className="text-sm font-semibold">{mensajeError}</span>
          <button type="button" onClick={() => setMensajeError(null)} className="ml-4 text-red-500 transition-colors hover:text-red-700" aria-label="Cerrar error">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="glass-panel relative flex w-full max-w-2xl animate-in flex-col overflow-hidden duration-200 fade-in zoom-in max-h-[90vh] overflow-y-auto" onClick={(evento) => evento.stopPropagation()}>
        <div className="sticky top-0 z-10 flex w-full justify-center border-b border-gray-100/70 bg-white/50 py-2 sm:py-3">
          <div
            role="button"
            tabIndex={0}
            onClick={irAProductos}
            onKeyDown={(evento) => {
              if (evento.key === 'Enter' || evento.key === ' ') irAProductos();
            }}
            className="cursor-pointer"
            aria-label="Ir a productos"
          >
            <Logo className="origin-top scale-[0.55] sm:scale-[0.65]" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="mb-5 flex items-center text-sm font-semibold text-brand-indigo transition-colors hover:text-brand-teal sm:mb-6"
            aria-label="Volver"
          >
            <ChevronLeft size={16} className="mr-1" />
            Atras
          </button>

          <form onSubmit={enviarFormulario} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-center text-sm font-bold text-brand-indigo sm:text-left">Nombre del Producto</label>
                  <input type="text" name="name" value={datosFormulario.name} onChange={cambiarCampo} required className="input-field rounded-full bg-gray-200/80 px-4 py-1.5" />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-center text-sm font-bold text-brand-indigo sm:text-left">Descripcion</label>
                  <textarea name="description" value={datosFormulario.description} onChange={cambiarCampo} className="input-field h-16 resize-none rounded-xl bg-gray-200/80 px-4 py-2 sm:h-20"></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-center text-sm font-bold text-brand-indigo sm:text-left">Categorias</label>
                  <select name="category" value={datosFormulario.category} onChange={cambiarCampo} required className="input-field cursor-pointer appearance-none rounded-full bg-gray-200/80 px-4 py-1.5 text-sm">
                    <option value="" disabled>Seleccione una categoria</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Mermeladas y Dulces">Mermeladas y Dulces</option>
                    <option value="Pescados y Mariscos">Pescados y Mariscos</option>
                    <option value="Reposteria">Reposteria</option>
                    <option value="Conservas">Conservas</option>
                    <option value="Condimentos">Condimentos</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col rounded-xl border border-dashed border-brand-teal/30 bg-brand-mint/20 p-3">
                  <label className="mb-2 flex items-center justify-between text-sm font-bold text-brand-indigo">
                    <span>Imagen del Producto</span>
                    <div className="flex space-x-2 text-xs">
                      <button type="button" onClick={() => setModoImagen('url')} className={`flex items-center rounded px-2 py-1 ${modoImagen === 'url' ? 'bg-brand-teal text-white' : 'bg-white text-gray-500'}`}>
                        <LinkIcon size={12} className="mr-1" /> URL
                      </button>
                      <button type="button" onClick={() => setModoImagen('upload')} className={`flex items-center rounded px-2 py-1 ${modoImagen === 'upload' ? 'bg-brand-teal text-white' : 'bg-white text-gray-500'}`}>
                        <Upload size={12} className="mr-1" /> Archivo
                      </button>
                    </div>
                  </label>

                  {modoImagen === 'url' ? (
                    <input type="url" name="imageUrl" value={datosFormulario.imageUrl} onChange={cambiarCampo} placeholder="https://ejemplo.com/imagen.jpg" className="input-field rounded bg-white px-3 py-1.5 text-xs" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <input type="file" accept="image/*" ref={referenciaArchivo} onChange={cambiarArchivo} className="hidden" />
                      <button type="button" onClick={() => referenciaArchivo.current.click()} className="flex w-full items-center justify-center rounded border border-gray-200 bg-white py-1.5 text-xs text-brand-indigo hover:bg-gray-50">
                        <Upload size={14} className="mr-2" /> Seleccionar de la PC
                      </button>
                    </div>
                  )}

                  {datosFormulario.imageUrl && (
                    <div className="mt-2 flex h-20 w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <img src={datosFormulario.imageUrl} alt="Vista previa" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-center text-sm font-bold text-brand-indigo sm:text-left">Precio</label>
                    <input type="number" name="price" value={datosFormulario.price} onChange={cambiarCampo} required min="0" step="0.01" className="input-field rounded-full bg-gray-200/80 px-4 py-1.5" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-center text-sm font-bold text-brand-indigo sm:text-left">Stock</label>
                    <input type="number" name="stock" value={datosFormulario.stock} onChange={cambiarCampo} required min="0" step="1" className="input-field rounded-full bg-gray-200/80 px-4 py-1.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2 gap-y-3 pt-2">
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input type="radio" name="status" value="Activo" checked={datosFormulario.status === 'Activo'} onChange={cambiarCampo} className="text-emerald-500 focus:ring-emerald-500" />
                    <span className="text-xs font-semibold text-brand-indigo">Activo</span>
                  </label>
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input type="radio" name="status" value="Sin Stock" checked={datosFormulario.status === 'Sin Stock'} onChange={cambiarCampo} className="text-red-500 focus:ring-red-500" />
                    <span className="text-xs font-semibold text-brand-indigo">Sin Stock</span>
                  </label>
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input type="radio" name="status" value="Descontinuado" checked={datosFormulario.status === 'Descontinuado'} onChange={cambiarCampo} className="text-gray-500 focus:ring-gray-500" />
                    <span className="text-xs font-semibold text-brand-indigo">Descontinuado</span>
                  </label>
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input type="radio" name="status" value="Bajo Stock" checked={datosFormulario.status === 'Bajo Stock'} onChange={cambiarCampo} className="text-amber-400 focus:ring-amber-400" />
                    <span className="text-xs font-semibold text-brand-indigo">Bajo Stock</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 border-t border-gray-100 pt-4">
              <button type="button" onClick={limpiarFormulario} className="btn-secondary w-28 py-1.5 text-sm sm:w-32">
                Limpiar
              </button>
              <button type="submit" className="btn-primary w-28 py-1.5 text-sm sm:w-32">
                Aplicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
