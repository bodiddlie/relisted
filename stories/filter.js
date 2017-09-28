import React from 'react'
import PropTypes from 'prop-types'

import Relisted from '../src'
import {
  containerStyle,
  searchStyle,
  searchFieldStyle,
  headerStyle,
  columnStyle,
  bodyStyle,
  rowStyle,
  cellStyle,
  centeredStyle,
} from './styles'

export function FilteredList({ columns, data }) {
  return (
    <Relisted>
      {({ getColumnProps, getFilterProps, getClearProps, filterData }) => (
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
              {filterData(data, columns).map(row => (
                <div style={rowStyle} key={row.name}>
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
