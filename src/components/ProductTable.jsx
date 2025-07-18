import React from 'react';

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Ubicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.quantity}</td>
            <td>{product.location}</td>
            <td className="actions-cell">
              <button onClick={() => onEdit(product)} className="btn btn-success">
                <i className="fas fa-edit"></i> Editar
              </button>
              <button onClick={() => onDelete(product.id)} className="btn btn-danger">
                <i className="fas fa-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
