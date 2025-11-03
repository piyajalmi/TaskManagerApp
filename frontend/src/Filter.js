import React from 'react';

export default function Filters({ filters, setFilters }) {
  return (
    <div style={{ display:'flex', gap:'8px', marginBottom:'8px' }}>
      <input placeholder="Search" value={filters.search} onChange={e=>setFilters({...filters, search: e.target.value})} />
      <select value={filters.status} onChange={e=>setFilters({...filters, status: e.target.value})}>
        <option value="">All statuses</option><option value="Pending">Pending</option><option value="Done">Done</option>
      </select>
      <select value={filters.priority} onChange={e=>setFilters({...filters, priority: e.target.value})}>
        <option value="">All priorities</option><option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select value={filters.sortBy} onChange={e=>setFilters({...filters, sortBy: e.target.value})}>
        <option value="created_at">Created</option><option value="due_date">Due Date</option><option value="priority">Priority</option>
      </select>
      <select value={filters.order} onChange={e=>setFilters({...filters, order: e.target.value})}>
        <option value="desc">Desc</option><option value="asc">Asc</option>
      </select>
    </div>
  );
}
