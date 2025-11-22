import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Edit2 } from 'lucide-react';
import './styles/TaxTable.css';

const TaxTable = ({ data, onEdit, countries }) => {
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => (
        <div className="name-cell">
          <div className="name-primary">{info.getValue()}</div>
          <div className="name-secondary">Friends</div>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: info => (
        <div className="date-cell">
          Jan 20, 2025
        </div>
      ),
    },
    {
      accessorKey: 'country',
      header: 'Country',
      cell: info => (
        <div className="country-cell">
          <span className="country-tag">{info.getValue()}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          className="edit-button"
          onClick={() => onEdit(row.original)}
        >
          <Edit2 size={16} />
        </button>
      ),
    },
  ], [onEdit]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table className="tax-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="table-header">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="table-row">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="table-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable;