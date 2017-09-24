import React from 'react'
import PropTypes from 'prop-types'

import Relisted from '../src'

export function FilteredList({ columns, data }) {
  return (
    <Relisted>
      {({ getColumnProps, getFilterProps, getClearProps }) => (
        <div style={containerStyle}>
          <div style={searchStyle}>
            <input
              {...getFilterProps({
                type: 'text',
                style: searchFieldStyle,
                placeholder: 'Filter...',
              })}
            />
            <button {...getClearProps({ type: 'button' })}>X</button>
          </div>
          <div style={headerStyle}>
            {columns.map(c => (
              <div key={c.name} style={columnStyle} {...getColumnProps()}>
                {c.text}
              </div>
            ))}
          </div>
          {data.length > 0 ? (
            <div style={bodyStyle}>
              {data.map(row => (
                <div style={rowStyle} key={row.id}>
                  {columns.map(c => (
                    <div key={c.name} style={cellStyle}>
                      {row[c.name]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div style={centeredStyle}>Empty Data</div>
          )}
        </div>
      )}
    </Relisted>
  )
}

FilteredList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '500px',
  height: '500px',
  border: '1px solid blue',
}

const headerStyle = {
  display: 'flex',
  width: '100%',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderBottom: '1px solid #cdcdcd',
}

const columnStyle = {
  flex: 1,
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  paddingLeft: '0.25rem',
  cursor: 'pointer',
}

const bodyStyle = {
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

const centeredStyle = {
  display: 'flex',
  width: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const rowStyle = {
  width: '100%',
  display: 'flex',
  backgroundColor: 'transparent',
  fontSize: '0.75rem',
  flexShrink: '0',
  cursor: 'pointer',
}

const cellStyle = {
  flex: 1,
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  paddingLeft: '0.25rem',
}

const searchStyle = {
  width: '100%',
  display: 'flex',
  borderBottom: '1px solid #cdcdcd',
}

const searchFieldStyle = {
  flex: 1,
  height: '40px',
  border: 'none',
  fontSize: '1.5rem',
  paddingLeft: '0.5rem',
  outline: 'none',
}