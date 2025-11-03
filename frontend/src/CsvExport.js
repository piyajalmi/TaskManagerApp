import React from 'react';

// data: array of task objects
export default function CsvExport({ data, filename = 'export.csv' }) {
  const toCsv = (items) => {
    if (!items || !items.length) return '';
    const headers = Object.keys(items[0]).filter(k => k !== 'description'); // choose fields
    const rows = items.map(item => headers.map(h => {
      const v = item[h];
      return (v === null || v === undefined) ? '' : `"${String(v).replace(/"/g,'""')}"`;
    }).join(','));
    return [headers.join(','), ...rows].join('\n');
  };

  const download = () => {
    const csv = toCsv(data);
    if (!csv) { alert('No data to export'); return; }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <button onClick={download}>Export CSV</button>;
}
