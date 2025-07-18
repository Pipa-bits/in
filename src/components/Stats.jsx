import React from 'react';

function Stats({ inventory }) {
  const total = inventory.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const categories = [...new Set(inventory.map(item => item.category))];

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-value">{inventory.length}</div>
        <div className="stat-label">Productos totales</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">${total.toFixed(2)}</div>
        <div className="stat-label">Valor total</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{categories.length}</div>
        <div className="stat-label">Categorías</div>
      </div>
    </div>
  );
}

export default Stats;
