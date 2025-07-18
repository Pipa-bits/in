import React, { useState, useEffect } from 'react';

function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    location: '',
    barcode: ''
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };
    onSubmit(parsed);
  };

  return (
    <div className="product-form-container">
      <h3>{product ? 'Editar producto' : 'Agregar nuevo producto'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select className="form-control" name="category" value={form.category} onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="alimentos">Alimentos</option>
            <option value="hogar">Hogar</option>
          </select>
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input className="form-control" type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input className="form-control" type="number" name="quantity" value={form.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input className="form-control" name="location" value={form.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Código de barras</label>
          <input className="form-control" name="barcode" value={form.barcode} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            <i className="fas fa-check"></i> Guardar
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
