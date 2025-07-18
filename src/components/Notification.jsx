import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const getTypeClass = () => {
    switch (type) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-danger';
      case 'warning': return 'bg-warning text-dark';
      case 'info': return 'bg-info text-dark';
      default: return 'bg-primary';
    }
  };

  return (
    <div 
      className={`toast show position-fixed top-0 end-0 m-3 ${getTypeClass()}`}
      style={{ zIndex: 1100 }}
    >
      <div className="toast-body d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button 
          type="button" 
          className="btn-close btn-close-white ms-3" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Notification;