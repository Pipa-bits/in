import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import ProductTable from './components/ProductTable';
import Stats from './components/Stats';
import Notification from './components/Notification';
import { useAuth } from './auth/AuthContext';
import './App.css';

function InventoryApp({ customLogout }) {
  const { user, logout } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [currentView, setCurrentView] = useState('cards');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  // Carga inicial
  useEffect(() => {
    const savedData = localStorage.getItem(`inventory_${user?.id}`) || localStorage.getItem('inventory_app_data');
    if (savedData) {
      setInventory(JSON.parse(savedData));
    } else {
      const sampleData = [
        { id: 1, name: 'Smartphone X', category: 'electronica', price: 599.99, quantity: 15, location: 'Zona A, Estante 2', barcode: '7222380' },
        { id: 2, name: 'Camiseta deportiva', category: 'ropa', price: 24.99, quantity: 30, location: 'Zona B, Estante 3', barcode: '7212480' }
      ];
      setInventory(sampleData);
      localStorage.setItem('inventory_app_data', JSON.stringify(sampleData));
    }

    const darkModePref = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModePref);
  }, [user]);

  useEffect(() => {
    if (user && inventory.length > 0) {
      localStorage.setItem(`inventory_${user.id}`, JSON.stringify(inventory));
    }
  }, [inventory, user]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem('darkMode', mode);
  };

  const handleLogout = () => {
    logout();
    if (customLogout) customLogout();
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    const product = inventory.find(p => p.id === productId);
    if (window.confirm(`¿Está seguro de eliminar "${product?.name}"?`)) {
      setInventory(inventory.filter(p => p.id !== productId));
      showNotification('Producto eliminado', 'warning');
    }
  };

  const handleFormSubmit = (product) => {
    if (editingProduct) {
      setInventory(inventory.map(p => p.id === product.id ? product : p));
      showNotification('Producto actualizado', 'success');
    } else {
      const newProduct = { ...product, id: Date.now() };
      setInventory([...inventory, newProduct]);
      showNotification('Producto agregado', 'success');
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const filtered = inventory.filter(product => {
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'quantity-asc': return a.quantity - b.quantity;
      case 'quantity-desc': return b.quantity - a.quantity;
      default: return 0;
    }
  });

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* HEADER */}
      <header className="app-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-boxes"></i> Gestión de Inventario
          </h1>

          <div className="header-controls">
            {user && <span className="user-greeting">Hola, {user.name}</span>}

            <button onClick={handleLogout} className="btn btn-control">
              <i className="fas fa-sign-out-alt"></i> Salir
            </button>
            <button onClick={toggleDarkMode} className="btn btn-control">
              <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i> {darkMode ? 'Claro' : 'Oscuro'}
            </button>
            <button onClick={() => setCurrentView(currentView === 'cards' ? 'table' : 'cards')} className="btn btn-control">
              <i className={`fas fa-${currentView === 'cards' ? 'table' : 'th-large'}`}></i> {currentView === 'cards' ? 'Tabla' : 'Tarjetas'}
            </button>
            <button onClick={handleAddProduct} className="btn btn-control">
              <i className="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="main-content">
        {/* FILTROS */}
        <div className="search-filters">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">Todas las categorías</option>
              <option value="electronica">Electrónica</option>
              <option value="ropa">Ropa</option>
              <option value="alimentos">Alimentos</option>
              <option value="hogar">Hogar</option>
            </select>

            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="price-asc">Precio (Menor a Mayor)</option>
              <option value="price-desc">Precio (Mayor a Menor)</option>
              <option value="quantity-asc">Cantidad (Menor a Mayor)</option>
              <option value="quantity-desc">Cantidad (Mayor a Menor)</option>
            </select>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <Stats inventory={inventory} />

        {/* FORMULARIO */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}

        {/* VISTA */}
        {inventory.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <p>No hay productos en el inventario</p>
            <button onClick={handleAddProduct} className="btn btn-primary">
              <i className="fas fa-plus"></i> Agregar producto
            </button>
          </div>
        ) : sorted.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <p>No se encontraron productos</p>
          </div>
        ) : currentView === 'cards' ? (
          <div className="products-grid">
            {sorted.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={sorted}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      </main>

      {/* NOTIFICACIONES */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default InventoryApp;
