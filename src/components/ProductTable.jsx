import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Inbox, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ProductModal from './ProductModal';

const imagenPorDefecto = "https://placehold.co/300x300/F7FFF7/1A535C?text=Foto+del+Producto";

const productosIniciales = [
  { id: 1, name: 'Dulce de Calafate (200g)', category: 'Mermeladas y Dulces', price: 1200, stock: 45, status: 'Activo', description: 'Exquisito dulce patagonico, ideal para desayunos.', imageUrl: imagenPorDefecto },
  { id: 2, name: 'Ahumado de Centolla', category: 'Pescados y Mariscos', price: 3500, stock: 0, status: 'Sin Stock', description: 'Centolla fueguina ahumada con madera de lenga.', imageUrl: imagenPorDefecto },
  { id: 3, name: 'Cerveza Artesanal Beagle (Rubia)', category: 'Bebidas', price: 800, stock: 80, status: 'Activo', description: 'Cerveza clasica de Ushuaia, sabor suave.', imageUrl: imagenPorDefecto },
  { id: 4, name: 'Alfajores de Pinon (x6)', category: 'Reposteria', price: 1100, stock: 25, status: 'Bajo Stock', description: 'Alfajores rellenos con dulce de leche y pinon.', imageUrl: imagenPorDefecto },
  { id: 5, name: 'Sal Marina Fueguina', category: 'Condimentos', price: 950, stock: 150, status: 'Activo', description: 'Sal recolectada en las costas del canal Beagle.', imageUrl: imagenPorDefecto },
  { id: 6, name: 'Escabeche de Cordero', category: 'Conservas', price: 1900, stock: 18, status: 'Bajo Stock', description: 'Cordero patagonico en suave escabeche.', imageUrl: imagenPorDefecto },
  { id: 7, name: 'Vino Espumante Fueguino', category: 'Bebidas', price: 2500, stock: 0, status: 'Descontinuado', description: 'Espumante edicion especial.', imageUrl: imagenPorDefecto },
  { id: 8, name: 'Chocolate con Frutos Rojos 100g', category: 'Reposteria', price: 1600, stock: 40, status: 'Activo', description: 'Chocolate artesanal con frutos del bosque.', imageUrl: imagenPorDefecto },
  { id: 9, name: 'Pate de Cordero al Romero', category: 'Conservas', price: 1950, stock: 15, status: 'Bajo Stock', description: 'Pate gourmet para untar.', imageUrl: imagenPorDefecto },
  { id: 10, name: 'Licor Artesanal de Calafate', category: 'Bebidas', price: 2700, stock: 22, status: 'Activo', description: 'Licor dulce elaborado con el fruto patagonico.', imageUrl: imagenPorDefecto },
];

const ProductTable = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState(productosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [productoExpandidoId, setProductoExpandidoId] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'Activo': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
      case 'Bajo Stock': return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]';
      case 'Sin Stock': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      case 'Descontinuado': return 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]';
      default: return 'bg-gray-400';
    }
  };

  const abrirModal = (producto = null) => {
    setProductoEnEdicion(producto);
    setModalAbierto(true);
  };

  const guardarProducto = (datosFormulario) => {
    if (datosFormulario.id) {
      // Actualiza el producto que ya existe.
      setProductos(productos.map(producto => producto.id === datosFormulario.id ? datosFormulario : producto));
      setMensajeExito('Producto actualizado correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
      return;
    }

    // Agrega el producto nuevo al principio.
    const productoNuevo = { ...datosFormulario, id: Date.now() };
    setProductos([productoNuevo, ...productos]);
    setMensajeExito('Producto guardado correctamente.');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  const eliminarProducto = (id) => {
    if (window.confirm('Seguro que deseas eliminar este producto?')) {
      setProductos(productos.filter(producto => producto.id !== id));
    }
  };

  const irAProductos = () => navigate('/productos');

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-60px)] p-4 pt-6">
      <div
        role="button"
        tabIndex={0}
        onClick={irAProductos}
        onKeyDown={(evento) => {
          if (evento.key === 'Enter' || evento.key === ' ') irAProductos();
        }}
        className="w-full py-0 cursor-pointer"
        aria-label="Ir a productos"
      >
        <Logo className="mb-6 scale-75 origin-top sm:scale-90" />
      </div>

      <div className="glass-panel w-full max-w-5xl flex flex-col p-4 min-h-[500px] relative sm:p-6">
        <div className="flex justify-between items-center gap-3 mb-6">
          <div className="flex min-w-0 items-center">
            <button
              onClick={() => navigate('/login')}
              className="mr-3 shrink-0 text-brand-indigo hover:text-brand-button transition-colors sm:mr-4"
              aria-label="Volver al login"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-title font-bold text-brand-indigo sm:text-2xl">Productos</h2>
          </div>

          <button
            onClick={() => abrirModal()}
            className="btn-primary flex shrink-0 items-center px-3 py-2 text-xs shadow sm:px-4 sm:text-sm"
          >
            <Plus size={16} className="mr-1 sm:mr-2" /> Añadir Producto
          </button>
        </div>

        {mensajeExito && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle size={18} />
            {mensajeExito}
          </div>
        )}

        {productos.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center text-brand-indigo/60">
            <Inbox size={96} strokeWidth={1} className="mb-4 text-gray-500 sm:size-20" />
            <p className="font-bold">No hay productos registrados.</p>
            <p className="text-xs sm:text-sm">Aun no has agregado productos al catalogo.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 md:hidden">
              {productos.map((producto) => (
                <article key={producto.id} className="rounded-lg border border-brand-separator bg-white/95 p-4 shadow-md shadow-brand-indigo/10">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-snug text-brand-teal">{producto.name}</h3>
                      <p className="mt-1 text-xs font-medium text-brand-indigo/60">{producto.category}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pt-1 text-xs font-semibold text-brand-indigo">
                      <span className={`h-3.5 w-3.5 rounded-full ${obtenerColorEstado(producto.status)}`} title={producto.status}></span>
                      <span>{producto.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-md bg-white/70 p-3 text-sm text-brand-indigo">
                    <div className="border-r border-brand-button/20 pr-3">
                      <p className="text-[0.65rem] font-bold uppercase text-brand-indigo/50">Precio</p>
                      <p className="font-bold">${Number(producto.price).toLocaleString()}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-[0.65rem] font-bold uppercase text-brand-indigo/50">Stock</p>
                      <p className="font-bold">{producto.stock}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-3 text-brand-indigo/60">
                    <button onClick={() => abrirModal(producto)} className="flex h-11 w-11 items-center justify-center rounded-md bg-white shadow-sm transition-colors hover:text-brand-button" title="Editar" aria-label={`Editar ${producto.name}`}>
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => eliminarProducto(producto.id)} className="flex h-11 w-11 items-center justify-center rounded-md bg-white/70 shadow-sm transition-colors hover:text-brand-coral" title="Eliminar" aria-label={`Eliminar ${producto.name}`}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto pb-4 md:block">
              <table className="w-full text-left text-sm text-brand-indigo border-separate border-spacing-y-2">
                <thead className="bg-brand-button text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-lg">Nombre</th>
                    <th className="px-4 py-3 font-semibold">Categoria</th>
                    <th className="px-4 py-3 font-semibold text-right">Precio</th>
                    <th className="px-4 py-3 font-semibold text-center">Stock</th>
                    <th className="px-4 py-3 font-semibold text-center">Estado</th>
                    <th className="px-4 py-3 font-semibold text-center rounded-tr-lg">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <React.Fragment key={producto.id}>
                      <tr className="bg-white/80 hover:bg-white transition-all duration-200 shadow-sm rounded-lg group">
                        <td className="px-4 py-4 font-semibold text-brand-teal rounded-l-lg">
                          <button
                            type="button"
                            onClick={() => setProductoExpandidoId(productoExpandidoId === producto.id ? null : producto.id)}
                            className="border-b border-dashed border-brand-button/50 text-left transition-colors hover:text-brand-indigo"
                            aria-expanded={productoExpandidoId === producto.id}
                          >
                            {producto.name}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm">{producto.category}</td>
                        <td className="px-4 py-4 font-medium text-right">${Number(producto.price).toLocaleString()}</td>
                        <td className="px-4 py-4 text-center">{producto.stock}</td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center items-center h-full">
                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-indigo">
                              <span className={`w-3 h-3 rounded-full ${obtenerColorEstado(producto.status)}`} title={producto.status}></span>
                              {producto.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 rounded-r-lg">
                          <div className="flex justify-center space-x-3 text-brand-indigo/60">
                            <button onClick={() => abrirModal(producto)} className="p-1 hover:text-brand-button transition-colors" title="Editar">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => eliminarProducto(producto.id)} className="p-1 hover:text-brand-coral transition-colors" title="Eliminar">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {productoExpandidoId === producto.id && (
                        <tr className="bg-white/90 shadow-sm">
                          <td colSpan="6" className="rounded-lg px-4 py-4">
                            <div className="flex gap-4">
                              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-surface">
                                <img src={producto.imageUrl} alt={producto.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="mb-1 font-bold text-brand-indigo">{producto.name}</h4>
                                <p className="mb-2 text-sm font-semibold text-brand-teal">${Number(producto.price).toLocaleString()}</p>
                                <p className="text-sm leading-relaxed text-brand-indigo/70">{producto.description || 'Sin descripcion disponible.'}</p>
                                <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-brand-indigo/60">
                                  <span>Categoria: {producto.category}</span>
                                  <span>Stock: {producto.stock}</span>
                                  <span className="flex items-center gap-1">
                                    Estado:
                                    <span className={`h-2.5 w-2.5 rounded-full ${obtenerColorEstado(producto.status)}`}></span>
                                    {producto.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <ProductModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSave={guardarProducto}
        initialData={productoEnEdicion}
      />
    </div>
  );
};

export default ProductTable;
