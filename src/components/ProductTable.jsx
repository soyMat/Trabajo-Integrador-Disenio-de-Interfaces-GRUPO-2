import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ProductModal from './ProductModal';

const defaultImg = "https://placehold.co/300x300/F7FFF7/1A535C?text=Foto+del+Producto";

const initialProducts = [
  { id: 1, name: 'Dulce de Calafate (200g)', category: 'Mermeladas y Dulces', price: 1200, stock: 45, status: 'Activo', description: 'Exquisito dulce patagónico, ideal para desayunos.', imageUrl: defaultImg },
  { id: 2, name: 'Ahumado de Centolla', category: 'Pescados y Mariscos', price: 3500, stock: 0, status: 'Sin Stock', description: 'Centolla fueguina ahumada con madera de lenga.', imageUrl: defaultImg },
  { id: 3, name: 'Cerveza Artesanal Beagle (Rubia)', category: 'Bebidas', price: 800, stock: 80, status: 'Activo', description: 'Cerveza clásica de Ushuaia, sabor suave.', imageUrl: defaultImg },
  { id: 4, name: 'Alfajores de Piñón (x6)', category: 'Reposteria', price: 1100, stock: 25, status: 'Bajo Stock', description: 'Alfajores rellenos con dulce de leche y piñón.', imageUrl: defaultImg },
  { id: 5, name: 'Sal Marina Fueguina', category: 'Condimentos', price: 950, stock: 150, status: 'Activo', description: 'Sal recolectada en las costas del canal Beagle.', imageUrl: defaultImg },
  { id: 6, name: 'Escabeche de Cordero', category: 'Conservas', price: 1900, stock: 18, status: 'Bajo Stock', description: 'Cordero patagónico en suave escabeche.', imageUrl: defaultImg },
  { id: 7, name: 'Vino Espumante Fueguino', category: 'Bebidas', price: 2500, stock: 0, status: 'Descontinuado', description: 'Espumante edición especial.', imageUrl: defaultImg },
  { id: 8, name: 'Chocolate con Frutos Rojos 100g', category: 'Reposteria', price: 1600, stock: 40, status: 'Activo', description: 'Chocolate artesanal con frutos del bosque.', imageUrl: defaultImg },
  { id: 9, name: 'Paté de Cordero al Romero', category: 'Conservas', price: 1950, stock: 15, status: 'Bajo Stock', description: 'Paté gourmet para untar.', imageUrl: defaultImg },
  { id: 10, name: 'Licor Artesanal de Calafate', category: 'Bebidas', price: 2700, stock: 22, status: 'Activo', description: 'Licor dulce elaborado con el fruto patagónico.', imageUrl: defaultImg },
];

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return 'bg-brand-cyan shadow-[0_0_8px_rgba(78,205,196,0.6)]';
      case 'Bajo Stock': return 'bg-brand-coral shadow-[0_0_8px_rgba(247,142,105,0.6)]';
      case 'Sin Stock': return 'bg-brand-teal shadow-[0_0_8px_rgba(26,83,92,0.6)]';
      case 'Descontinuado': return 'bg-brand-indigo shadow-[0_0_8px_rgba(43,43,62,0.6)]';
      default: return 'bg-gray-400';
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (formData.id) {
      // Edit
      setProducts(products.map(p => p.id === formData.id ? formData : p));
    } else {
      // Create new
      const newProduct = { ...formData, id: Date.now() };
      setProducts([newProduct, ...products]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleMouseEnter = (e, product) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Posicionar la tarjeta a la derecha de la celda
    setHoverInfo({
      product,
      top: rect.top,
      left: rect.right + 20
    });
  };

  const handleMouseLeave = () => {
    setHoverInfo(null);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-60px)] pt-6">
      <Logo className="mb-6 scale-90 origin-top" />
      
      <div className="glass-panel w-full max-w-5xl flex flex-col p-6 min-h-[500px] relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/login')}
              className="mr-4 text-brand-indigo hover:text-brand-teal transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-2xl font-title font-bold text-brand-indigo">Productos</h2>
          </div>
          
          <button 
             onClick={() => handleOpenModal()}
             className="btn-primary flex items-center shadow"
          >
            <Plus size={16} className="mr-2" /> Añadir Producto
          </button>
        </div>

        {products.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-brand-indigo/60">
            <Inbox size={80} strokeWidth={1} className="mb-4 text-gray-400" />
            <p className="font-bold">No hay productos registrados.</p>
            <p className="text-sm">Aún no has agregado productos al catálogo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left text-sm text-brand-indigo border-separate border-spacing-y-2">
              <thead className="bg-brand-teal text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Nombre</th>
                  <th className="px-4 py-3 font-semibold">Categoría</th>
                  <th className="px-4 py-3 font-semibold text-right">Precio</th>
                  <th className="px-4 py-3 font-semibold text-center">Stock</th>
                  <th className="px-4 py-3 font-semibold text-center">Estado</th>
                  <th className="px-4 py-3 font-semibold text-center rounded-tr-lg">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white/40 hover:bg-white/80 transition-all duration-200 shadow-sm rounded-lg group">
                    <td 
                      className="px-4 py-4 font-semibold text-brand-teal cursor-help group-hover:text-brand-cyan transition-colors rounded-l-lg"
                      onMouseEnter={(e) => handleMouseEnter(e, product)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span className="border-b border-dashed border-brand-teal/50">{product.name}</span>
                    </td>
                    <td className="px-4 py-4 text-sm">{product.category}</td>
                    <td className="px-4 py-4 font-medium text-right">${Number(product.price).toLocaleString()}</td>
                    <td className="px-4 py-4 text-center">{product.stock}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center items-center h-full">
                        <div 
                          className={`w-3.5 h-3.5 rounded-full ${getStatusColor(product.status)}`}
                          title={product.status}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 rounded-r-lg">
                      <div className="flex justify-center space-x-3 text-brand-indigo/60">
                        <button onClick={() => handleOpenModal(product)} className="p-1 hover:text-brand-teal transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1 hover:text-brand-coral transition-colors" title="Eliminar">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Hover Card */}
        {hoverInfo && (
          <div 
            className="fixed z-50 p-4 w-64 glass-panel bg-white/95 shadow-2xl pointer-events-none animate-in fade-in zoom-in duration-150"
            style={{ top: hoverInfo.top - 20, left: hoverInfo.left }}
          >
            {hoverInfo.product.imageUrl && (
              <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-brand-mint/30 flex items-center justify-center">
                <img src={hoverInfo.product.imageUrl} alt={hoverInfo.product.name} className="object-cover w-full h-full" />
              </div>
            )}
            <h4 className="font-bold text-brand-indigo mb-1 leading-tight">{hoverInfo.product.name}</h4>
            <p className="text-brand-teal font-semibold text-sm mb-2">${Number(hoverInfo.product.price).toLocaleString()}</p>
            <p className="text-xs text-brand-indigo/70 leading-relaxed">{hoverInfo.product.description || 'Sin descripción disponible.'}</p>
            <div className="mt-3 flex justify-between items-center text-xs font-semibold">
              <span className="text-brand-indigo/60">Stock: {hoverInfo.product.stock}</span>
              <span className="flex items-center gap-1">
                 Estado: 
                 <div className={`w-2 h-2 rounded-full ${getStatusColor(hoverInfo.product.status)}`}></div>
              </span>
            </div>
          </div>
        )}
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </div>
  );
};

export default ProductTable;
