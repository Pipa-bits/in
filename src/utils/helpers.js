export const getCategoryName = (key) => {
  const categories = {
    'electronica': 'Electrónica',
    'ropa': 'Ropa',
    'alimentos': 'Alimentos',
    'hogar': 'Hogar'
  };
  return categories[key] || key;
};

export const filterAndSortProducts = (products, searchTerm, categoryFilter, sortOption) => {
  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return [...filtered].sort((a, b) => {
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
};

export const calculateStats = (inventory) => {
  return {
    totalProducts: inventory.reduce((sum, p) => sum + p.quantity, 0),
    totalValue: inventory.reduce((sum, p) => sum + p.price * p.quantity, 0),
    totalCategories: [...new Set(inventory.map(p => p.category))].length
  };
};