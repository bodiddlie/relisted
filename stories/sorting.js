import React from 'react'
import PropTypes from 'prop-types'

import Relisted from '../src'
import * as styles from './styles'

export function SortedList({ columns, data, sortBy = '' }) {
  return (
    <Relisted sortBy={sortBy}>
      {({ getColumnProps, sortData, sortBy, sortAscending }) => (
        <div style={styles.containerStyle}>
          <div style={styles.headerStyle}>
            {columns.map(c => (
              <div
                key={c.name}
                {...getColumnProps({ name: c.name, style: styles.columnStyle })}
              >
                {c.text}{' '}
                {sortBy === c.name ? sortAscending ? (
                  <span>⬆</span>
                ) : (
                  <span>⬇</span>
                ) : (
                  <span style={{ color: 'transparent' }}>⬇</span>
                )}
              </div>
            ))}
          </div>
          {data.length > 0 && (
            <div style={styles.bodyStyle}>
              {sortData(data).map(row => (
                <div style={styles.rowStyle} key={row.name}>
                  {columns.map(c => (
                    <div key={c.name} style={styles.cellStyle}>
                      {row[c.name]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Relisted>
  )
}

SortedList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortBy: PropTypes.string,
}

function Column(props) {
  return (
    <div style={styles.columnStyle} {...props}>
      {props.children}
    </div>
  )
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
}
