import React from 'react'
import { storiesOf } from '@storybook/react'

import Relisted from '../src'

storiesOf('Relisted', module).add('just columns', () => (
  <BasicList columns={columns} />
))

const columns = [
  { name: 'id', text: 'ID' },
  { name: 'title', text: 'Title' },
  { name: 'foo', text: 'Foo' },
  { name: 'bar', text: 'Bar' },
]

function BasicList({ columns, data = [] }) {
  return (
    <Relisted>
      {({ getColumnProps }) => (
        <div style={containerStyle}>
          <div style={headerStyle}>
            {columns.map(c => (
              <div key={c.name} style={columnStyle} {...getColumnProps()}>
                {c.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </Relisted>
  )
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
}

const columnStyle = {
  flex: 1,
}
