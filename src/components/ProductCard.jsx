import React from 'react';

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h3>{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-card-body">
        <div className="product-detail">
          <span className="detail-label">Precio:</span>
          <span className="detail-value">${product.price.toFixed(2)}</span>
        </div>
        <div className="product-detail">
          <span className="detail-label">Cantidad:</span>
          <span className="detail-value">{product.quantity}</span>
        </div>
        <div className="product-detail">
          <span className="detail-label">Ubicación:</span>
          <span className="detail-value">{product.location}</span>
        </div>
        <div className="product-detail">
          <span className="detail-label">Código:</span>
          <span className="detail-value">{product.barcode}</span>
        </div>
      </div>

      <div className="product-card-footer">
        <button onClick={() => onEdit(product)} className="btn btn-control btn-success">
          <i className="fas fa-edit"></i> Editar
        </button>
        <button onClick={() => onDelete(product.id)} className="btn btn-control btn-danger">
          <i className="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
