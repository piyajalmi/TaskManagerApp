import React from 'react';

export default function Pagination({ pageInfo = {}, onPageChange }) {
  // Provide defaults so destructuring never breaks
  const { page = 1, pages = 1 } = pageInfo;

  // Don’t render anything if there’s no pagination or only one page
  if (!pageInfo || pages <= 1) return null;

  const arr = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div style={{ marginTop: '1rem' }}>
      {arr.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          disabled={p === page}
          style={{ margin: '0 5px' }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
