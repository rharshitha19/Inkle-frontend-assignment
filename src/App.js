import React, { useState, useEffect } from 'react';
import TaxTable from './components/TaxTable';
import EditModal from './components/EditModal';
import { api } from './services/api';
import './components/styles/App.css';

function App() {
  const [taxData, setTaxData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [taxesResponse, countriesResponse] = await Promise.all([
        api.getTaxes(),
        api.getCountries()
      ]);
      
      setTaxData(taxesResponse.data);
      setCountries(countriesResponse.data);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedCustomer) => {
    try {
      await api.updateTax(updatedCustomer.id, updatedCustomer);
      
      // Update local state
      setTaxData(prevData =>
        prevData.map(item =>
          item.id === updatedCustomer.id ? updatedCustomer : item
        )
      );
      
      // Reload data to ensure sync with server
      await loadData();
    } catch (err) {
      setError('Failed to update customer');
      console.error('Error updating customer:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <div className="error-message">{error}</div>
        <button onClick={loadData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tax Management</h1>
      </header>
      
      <main className="app-main">
        <TaxTable 
          data={taxData} 
          onEdit={handleEdit}
          countries={countries}
        />
      </main>

      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customer={editingCustomer}
        onSave={handleSave}
        countries={countries}
      />
    </div>
  );
}

export default App;