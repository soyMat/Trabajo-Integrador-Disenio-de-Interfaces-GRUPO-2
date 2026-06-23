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

  const [errores, setErrores] = useState({});

  const [mensajeError, setMensajeError] = useState(null);

  const referenciaArchivo = useRef(null);

  useEffect(() => {
    setDatosFormulario(initialData || datosVacios);
    setErrores({});
    setMensajeError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const mostrarErrorGeneral = (mensaje) => {
    setMensajeError(mensaje);
    setTimeout(() => setMensajeError(null), 3000);
  };

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario(datosPrevios => ({ ...datosPrevios, [name]: value }));
    setErrores(erroresPrevios => ({ ...erroresPrevios, [name]: '' }));
  };

  const cambiarArchivo = (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const urlTemporal = URL.createObjectURL(archivo);
    setDatosFormulario(datosPrevios => ({ ...datosPrevios, imageUrl: urlTemporal }));
  };

  const validarFormulario = () => {
    const erroresNuevos = {};
    const precio = Number(datosFormulario.price);
    const stock = Number(datosFormulario.stock);

    // errores por campo vacio
    if (!datosFormulario.name.trim()) erroresNuevos.name = 'Ingresá el nombre del producto.';
    if (!datosFormulario.description.trim()) erroresNuevos.description = 'Ingresá una descripción.';
    if (!datosFormulario.category) erroresNuevos.category = 'Seleccioná una categoría.';
    if (!datosFormulario.price) erroresNuevos.price = 'Ingresá el precio.';
    if (datosFormulario.price && (Number.isNaN(precio) || precio <= 0)) erroresNuevos.price = 'El precio debe ser mayor que cero.';
    if (datosFormulario.stock === '') erroresNuevos.stock = 'Ingresá el stock.';
    if (datosFormulario.stock !== '' && (Number.isNaN(stock) || stock < 0)) erroresNuevos.stock = 'El stock no puede ser negativo.';
    if (!datosFormulario.status) erroresNuevos.status = 'Seleccioná un estado.';

    setErrores(erroresNuevos);
    return Object.keys(erroresNuevos).length === 0;
  };

  const enviarFormulario = (evento) => {
    evento.preventDefault();

    if (!validarFormulario()) {
      mostrarErrorGeneral('Revisá los campos marcados antes de guardar.');
      return;
    }

    // confirmación de edición (pop-up)
    if (esEdicion) {
      const confirmaEdicion = window.confirm(`Seguro que queres guardar los cambios de "${datosFormulario.name}"?`);
      if (!confirmaEdicion) return;
    }

    if (onSave) onSave(datosFormulario);
    onClose();
  };

  const limpiarFormulario = () => {
    setDatosFormulario(datosVacios);
    setErrores({});
  };

  const irAProductos = () => {
    onClose();
    navigate('/productos');
  };

  const claseCampo = (nombreCampo) => `input-field ${errores[nombreCampo] ? 'input-error' : ''}`;

  const esEdicion = Boolean(initialData);

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

      <div
        className="glass-panel relative flex w-full max-w-2xl animate-in flex-col overflow-hidden duration-200 fade-in zoom-in max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={esEdicion ? 'Formulario de edicion de producto' : 'Formulario de producto nuevo'}
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex w-full justify-center border-b border-brand-separator bg-white py-1.5">
          <button
            type="button"
            onClick={irAProductos}
            className="transition-opacity hover:opacity-80"
            aria-label="Ir a productos"
          >
            <Logo className="scale-[0.38] origin-center -my-7" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="relative mb-6 flex min-h-[3.25rem] w-full items-start justify-center">
            <div className="absolute left-0 top-1 flex justify-start">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center text-sm font-semibold text-brand-button transition-colors hover:text-brand-indigo"
                aria-label="Volver"
              >
                <ChevronLeft size={16} className="mr-1" />
                Atrás
              </button>
            </div>
            <div className="flex max-w-[11rem] flex-col items-center justify-center gap-1 text-center sm:max-w-none">
              <span className={`rounded-full px-4 py-1 text-center text-[0.65rem] font-bold uppercase leading-tight tracking-wide ${esEdicion ? 'bg-brand-button text-white' : 'bg-white text-brand-button border border-brand-button/25'}`}>
                {esEdicion ? 'Modo edicion' : 'Producto nuevo'}
              </span>
              {esEdicion && (
                <p className="max-w-[12rem] truncate text-center text-xs font-semibold text-brand-indigo/60 sm:max-w-[18rem]">
                  {datosFormulario.name}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={enviarFormulario} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Datos principales del producto. */}
              <div className="flex flex-col gap-4">
                <h3 className="text-brand-indigo text-lg font-bold border-b border-brand-separator pb-1">
                  Información General
                </h3>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-brand-indigo text-xs font-bold sm:text-left">
                    Nombre del Producto <span className="text-brand-coral">*</span>
                  </label>
                  <input id="name" type="text" name="name" value={datosFormulario.name} onChange={cambiarCampo} className={claseCampo('name')} />
                  {errores.name && <p className="mt-1 text-xs font-semibold text-red-600">{errores.name}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="description" className="text-brand-indigo text-xs font-bold sm:text-left">
                    Descripción <span className="text-brand-coral">*</span>
                  </label>
                  <textarea id="description" name="description" value={datosFormulario.description} onChange={cambiarCampo} className={`${claseCampo('description')} h-20 resize-none`}></textarea>
                  {errores.description && <p className="mt-1 text-xs font-semibold text-red-600">{errores.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="text-brand-indigo text-xs font-bold sm:text-left">
                      Precio ($) <span className="text-brand-coral">*</span>
                    </label>
                    <input id="price" type="number" name="price" value={datosFormulario.price} onChange={cambiarCampo} min="0.01" step="0.01" className={claseCampo('price')} />
                    {errores.price && <p className="mt-1 text-xs font-semibold text-red-600">{errores.price}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="stock" className="text-brand-indigo text-xs font-bold sm:text-left">
                      Stock (#) <span className="text-brand-coral">*</span>
                    </label>
                    <input id="stock" type="number" name="stock" value={datosFormulario.stock} onChange={cambiarCampo} min="0" step="1" className={claseCampo('stock')} />
                    {errores.stock && <p className="mt-1 text-xs font-semibold text-red-600">{errores.stock}</p>}
                  </div>
                </div>
              </div>

              {/* Categoria, estado e imagen del producto. */}
              <div className="flex flex-col gap-4">
                <h3 className="text-brand-indigo text-lg font-bold border-b border-brand-separator pb-1">
                  Estado y Categoría
                </h3>

                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-brand-indigo text-xs font-bold sm:text-left">
                    Categoría <span className="text-brand-coral">*</span>
                  </label>
                  <select id="category" name="category" value={datosFormulario.category} onChange={cambiarCampo} className={claseCampo('category')}>
                    <option value="" disabled>Seleccione una categoria</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Mermeladas y Dulces">Mermeladas y Dulces</option>
                    <option value="Pescados y Mariscos">Pescados y Mariscos</option>
                    <option value="Reposteria">Reposteria</option>
                    <option value="Conservas">Conservas</option>
                    <option value="Condimentos">Condimentos</option>
                  </select>
                  {errores.category && <p className="mt-1 text-xs font-semibold text-red-600">{errores.category}</p>}
                </div>

                <fieldset className="flex flex-col gap-1">
                  <legend className="text-xs font-bold text-brand-indigo">Estado <span className="text-brand-coral">*</span></legend>
                  <div className={`rounded-xl border p-3 flex flex-col gap-2 ${errores.status ? 'border-red-400 bg-red-50' : 'border-brand-separator bg-white/45'}`}>
                    {['Activo', 'Sin Stock', 'Descontinuado', 'Bajo Stock'].map((estado) => (
                      <label key={estado} className="flex cursor-pointer items-center gap-2">
                        <input type="radio" name="status" value={estado} checked={datosFormulario.status === estado} onChange={cambiarCampo} className="text-brand-button focus:ring-brand-button" />
                        <span className="text-xs font-semibold text-brand-indigo">{estado}</span>
                      </label>
                    ))}
                  </div>
                  {errores.status && <p className="mt-2 text-xs font-semibold text-red-600">{errores.status}</p>}
                </fieldset>

                <div className="flex flex-col rounded-xl border border-dashed border-brand-button/30 bg-white/45 p-3 gap-2">
                  <label className="flex items-center justify-between text-xs font-bold text-brand-indigo">
                    <span>Imagen del Producto</span>
                    <div className="flex space-x-2 text-xs">
                      <button type="button" onClick={() => setModoImagen('url')} className={`flex items-center rounded px-2 py-0.5 ${modoImagen === 'url' ? 'bg-brand-button text-white' : 'bg-white text-gray-500'}`}>
                        <LinkIcon size={12} className="mr-1" /> URL
                      </button>
                      <button type="button" onClick={() => setModoImagen('upload')} className={`flex items-center rounded px-2 py-0.5 ${modoImagen === 'upload' ? 'bg-brand-button text-white' : 'bg-white text-gray-500'}`}>
                        <Upload size={12} className="mr-1" /> Archivo
                      </button>
                    </div>
                  </label>

                  {modoImagen === 'url' ? (
                    <input type="url" name="imageUrl" value={datosFormulario.imageUrl} onChange={cambiarCampo} placeholder="https://ejemplo.com/imagen.jpg" className="input-field px-3 py-1.5 text-xs" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <input type="file" accept="image/*" ref={referenciaArchivo} onChange={cambiarArchivo} className="hidden" />
                      <button type="button" onClick={() => referenciaArchivo.current.click()} className="flex w-full items-center justify-center rounded border border-brand-separator bg-white py-1.5 text-xs text-brand-indigo hover:bg-brand-separator">
                        <Upload size={14} className="mr-2" /> Seleccionar de la PC
                      </button>
                    </div>
                  )}

                  {datosFormulario.imageUrl && (
                    <div className="mt-2 flex h-20 w-full items-center justify-center overflow-hidden rounded-lg border border-brand-separator bg-gray-50">
                      <img src={datosFormulario.imageUrl} alt="Vista previa" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Acciones del formulario. */}
            <div className="flex justify-center space-x-4 border-t border-brand-separator pt-4">
              <button type="button" onClick={limpiarFormulario} className="btn-secondary w-28 py-1.5 text-sm sm:w-32">
                Limpiar
              </button>
              <button type="submit" className="btn-primary w-28 py-1.5 text-sm sm:w-32">
                {esEdicion ? 'Guardar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
