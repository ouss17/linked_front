import React from 'react';
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Rechercher :  {'  '}
      <input className='input-react-table' value={filter || ""}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}
