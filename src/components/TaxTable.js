import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Edit2, User, Calendar, MapPin, Users, Filter, X, Search, Heart } from 'lucide-react';
import './styles/TaxTable.css';

const TaxTable = ({ data, onEdit, onAddNew, countries }) => {
  const [filters, setFilters] = useState({
    name: '',
    country: '',
    gender: '',
    date: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Jan 20, 2025';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Jan 20, 2025';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '15:30 PM';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return '15:30 PM';
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter(item => {
      const matchesName = !filters.name || 
        (item.name && item.name.toLowerCase().includes(filters.name.toLowerCase()));
      
      const matchesCountry = !filters.country || 
        (item.country && item.country.toLowerCase().includes(filters.country.toLowerCase()));
      
      const matchesGender = !filters.gender || 
        (item.gender && item.gender.toLowerCase() === filters.gender.toLowerCase());
      
      const matchesDate = !filters.date || 
        formatDate(item.createdAt).toLowerCase().includes(filters.date.toLowerCase());
      
      return matchesName && matchesCountry && matchesGender && matchesDate;
    });
  }, [data, filters]);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: () => (
        <div className="header-with-icon">
          <User size={16} />
          <span>NAME</span>
        </div>
      ),
      cell: info => (
        <div className="name-cell">
          <div className="name-primary">{info.getValue() || 'Unknown'}</div>
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: 'gender',
      header: () => (
        <div className="header-with-icon">
          <Heart size={16} />
          <span>GENDER</span>
        </div>
      ),
      cell: info => {
        const gender = info.getValue();
        let genderClass = 'other';
        if (gender && typeof gender === 'string') {
          if (gender.toLowerCase() === 'male') genderClass = 'male';
          else if (gender.toLowerCase() === 'female') genderClass = 'female';
        }
        
        return (
          <div className="gender-cell">
            <span className={`gender-tag ${genderClass}`}>
              {gender || 'Unknown'}
            </span>
          </div>
        );
      },
      size: 130,
    },
    {
      accessorKey: 'createdAt',
      header: () => (
        <div className="header-with-icon">
          <Calendar size={16} />
          <span>DATE</span>
        </div>
      ),
      cell: info => (
        <div className="date-cell">
          <div className="date-primary">{formatDate(info.getValue())}</div>
          <div className="date-secondary">{formatTime(info.getValue())}</div>
        </div>
      ),
      size: 160,
    },
    {
      accessorKey: 'country',
      header: () => (
        <div className="header-with-icon">
          <MapPin size={16} />
          <span>COUNTRY</span>
        </div>
      ),
      cell: info => (
        <div className="country-cell">
          <span className="country-tag">{info.getValue() || 'Unknown'}</span>
        </div>
      ),
      size: 180,
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => (
        <div className="actions-cell">
          <button
            className="edit-button"
            onClick={() => onEdit(row.original)}
            title="Edit customer"
          >
            <Edit2 size={14} />
            <span>Edit</span>
          </button>
        </div>
      ),
      size: 120,
    },
  ], [onEdit]);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      country: '',
      gender: '',
      date: ''
    });
  };

  const hasActiveFilters = filters.name || filters.country || filters.gender || filters.date;

  const uniqueCountries = [...new Set(data?.map(item => item.country).filter(Boolean) || [])];

  return (
    <div className="table-container">
      <div className="table-header-stats">
        <div className="stats-section">
          <div className="stats-card">
            <div className="stats-icon primary">
              <Users size={20} />
            </div>
            <div className="stats-content">
              <div className="stats-number">{filteredData.length}</div>
              <div className="stats-label">
                Total Records
                {filteredData.length !== data.length && (
                  <span className="filter-count"> (of {data.length})</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-actions">
          <button 
            className={`action-button ${showFilters ? 'active' : 'secondary'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>Filter</span>
            {hasActiveFilters && <span className="filter-indicator"></span>}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filter Records</h3>
            <div className="filter-actions">
              {hasActiveFilters && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  <X size={14} />
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          <div className="filter-fields">
            <div className="filter-group">
              <label className="filter-label">
                <Search size={14} />
                Name
              </label>
              <input
                type="text"
                className="filter-input"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                <Heart size={14} />
                Gender
              </label>
              <select
                className="filter-select"
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <MapPin size={14} />
                Country
              </label>
              <select
                className="filter-select"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <option value="">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="active-filters">
              <span className="active-filters-label">Active Filters:</span>
              {filters.name && (
                <span className="active-filter-tag">
                  Name: {filters.name}
                  <button onClick={() => handleFilterChange('name', '')}>×</button>
                </span>
              )}
              {filters.gender && (
                <span className="active-filter-tag">
                  Gender: {filters.gender}
                  <button onClick={() => handleFilterChange('gender', '')}>×</button>
                </span>
              )}
              {filters.country && (
                <span className="active-filter-tag">
                  Country: {filters.country}
                  <button onClick={() => handleFilterChange('country', '')}>×</button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="table-wrapper">
        <table className="tax-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="table-header" style={{ width: header.getSize() }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className="table-row" data-index={index}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="table-cell" style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="empty-state">
            {hasActiveFilters ? (
              <>
                <Filter size={48} />
                <h3>No matching records found</h3>
                <p>Try adjusting your filters or clear them to see all records</p>
                <button className="add-first-button" onClick={clearFilters}>
                  <X size={16} />
                  Clear Filters
                </button>
              </>
            ) : (
              <>
                <Users size={48} />
                <h3>No records found</h3>
                <p>There are no customer records to display</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxTable;