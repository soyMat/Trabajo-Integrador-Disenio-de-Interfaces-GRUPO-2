import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Image as ImageIcon, Upload, Link as LinkIcon, AlertCircle, X } from 'lucide-react';
import Logo from './Logo';

const ProductModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    status: 'Activo',
    imageUrl: ''
  });
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
  const fileInputRef = useRef(null);
  const [errorPopup, setErrorPopup] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '', description: '', category: '', price: '', stock: '', status: 'Activo', imageUrl: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price' && Number(value) < 0) {
      setErrorPopup('El precio no puede ser negativo');
      setTimeout(() => setErrorPopup(null), 3000);
      return;
    }

    if (name === 'stock' && Number(value) < 0) {
      setErrorPopup('El stock no puede ser negativo');
      setTimeout(() => setErrorPopup(null), 3000);
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulamos la subida creando una URL local temporal
      const tempUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl: tempUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    onClose();
  };

  const handleClear = () => {
    setFormData({
      name: '', description: '', category: '', price: '', stock: '', status: 'Activo', imageUrl: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-indigo/40 backdrop-blur-sm">
      
      {/* Popup de Error */}
      {errorPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[60] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-lg animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="font-semibold text-sm">{errorPopup}</span>
          <button type="button" onClick={() => setErrorPopup(null)} className="ml-4 text-red-500 hover:text-red-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="glass-panel w-full max-w-2xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        
        <div className="w-full py-4 flex justify-center bg-white/50 border-b border-gray-100 sticky top-0 z-10">
           <Logo className="scale-75 origin-top mb-0" />
        </div>

        <div className="p-6">
          <button 
            type="button"
            onClick={onClose}
            className="flex items-center text-sm font-semibold text-brand-indigo hover:text-brand-teal transition-colors mb-6"
          >
            <ChevronLeft size={16} className="mr-1" /> Atras
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Columna Izquierda: Datos principales */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="font-bold text-sm text-brand-indigo mb-1">Nombre del Producto</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field bg-gray-100/50 rounded-full py-1.5 px-4" />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-sm text-brand-indigo mb-1">Descripción</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="input-field bg-gray-100/50 rounded-xl py-2 px-4 resize-none h-20"></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-sm text-brand-indigo mb-1">Categoría</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="input-field bg-gray-100/50 py-1.5 px-4 text-sm rounded-full cursor-pointer appearance-none">
                    <option value="" disabled>Seleccione una categoría</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Mermeladas y Dulces">Mermeladas y Dulces</option>
                    <option value="Pescados y Mariscos">Pescados y Mariscos</option>
                    <option value="Reposteria">Reposteria</option>
                    <option value="Conservas">Conservas</option>
                    <option value="Condimentos">Condimentos</option>
                  </select>
                </div>
              </div>

              {/* Columna Derecha: Imagen, Precio, Stock */}
              <div className="space-y-4">
                
                {/* Image Section */}
                <div className="flex flex-col p-3 border border-dashed border-brand-teal/30 rounded-xl bg-brand-mint/20">
                  <label className="font-bold text-sm text-brand-indigo mb-2 flex items-center justify-between">
                    <span>Imagen del Producto</span>
                    <div className="flex space-x-2 text-xs">
                      <button type="button" onClick={() => setImageMode('url')} className={`px-2 py-1 rounded flex items-center ${imageMode === 'url' ? 'bg-brand-teal text-white' : 'bg-white text-gray-500'}`}><LinkIcon size={12} className="mr-1"/> URL</button>
                      <button type="button" onClick={() => setImageMode('upload')} className={`px-2 py-1 rounded flex items-center ${imageMode === 'upload' ? 'bg-brand-teal text-white' : 'bg-white text-gray-500'}`}><Upload size={12} className="mr-1"/> Archivo</button>
                    </div>
                  </label>
                  
                  {imageMode === 'url' ? (
                    <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" className="input-field bg-white text-xs py-1.5 px-3 rounded" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current.click()} className="w-full py-1.5 text-xs bg-white border border-gray-200 rounded text-brand-indigo hover:bg-gray-50 flex items-center justify-center">
                        <Upload size={14} className="mr-2"/> Seleccionar de la PC
                      </button>
                    </div>
                  )}

                  {formData.imageUrl && (
                    <div className="mt-2 h-20 w-full rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                       <img src={formData.imageUrl} alt="Vista previa" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-bold text-sm text-brand-indigo mb-1">Precio ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="input-field bg-gray-100/50 rounded-full py-1.5 px-4" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-sm text-brand-indigo mb-1">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" step="1" className="input-field bg-gray-100/50 rounded-full py-1.5 px-4" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-2 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="status" value="Activo" checked={formData.status === 'Activo'} onChange={handleChange} className="text-brand-cyan focus:ring-brand-cyan" />
                    <span className="text-xs font-semibold text-brand-indigo">Activo</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="status" value="Sin Stock" checked={formData.status === 'Sin Stock'} onChange={handleChange} className="text-brand-teal focus:ring-brand-teal" />
                    <span className="text-xs font-semibold text-brand-indigo">Sin Stock</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="status" value="Bajo Stock" checked={formData.status === 'Bajo Stock'} onChange={handleChange} className="text-brand-coral focus:ring-brand-coral" />
                    <span className="text-xs font-semibold text-brand-indigo">Bajo Stock</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="status" value="Descontinuado" checked={formData.status === 'Descontinuado'} onChange={handleChange} className="text-brand-indigo focus:ring-brand-indigo" />
                    <span className="text-xs font-semibold text-brand-indigo">Descontinuado</span>
                  </label>
                </div>

              </div>
            </div>

            <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
              <button type="button" onClick={handleClear} className="btn-secondary w-32 py-1.5 text-sm">
                Limpiar
              </button>
              <button type="submit" className="btn-primary w-32 py-1.5 text-sm">
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
