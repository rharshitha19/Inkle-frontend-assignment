import React, { useState, useEffect } from 'react';
import './styles/EditModal.css';

const EditModal = ({ isOpen, onClose, customer, onSave, countries }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        country: customer.country || ''
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.country) {
      onSave({
        ...customer,
        name: formData.name,
        country: formData.country
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Customer</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">
              Name +
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Country
            </label>
            <select
              className="form-select"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;