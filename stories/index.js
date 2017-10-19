import React from 'react'
import { storiesOf } from '@storybook/react'
import PropTypes from 'prop-types'

import Relisted from '../src'
import { FilteredList } from './filter'
import { SortedList } from './sorting'
import {
  containerStyle,
  headerStyle,
  columnStyle,
  bodyStyle,
  rowStyle,
  cellStyle,
  centeredStyle,
} from './styles'

storiesOf('Relisted', module)
  .add('empty data', () => <BasicList columns={columns} data={[]} />)
  .add('with data', () => <BasicList columns={columns} data={data} />)
  .add('filter', () => <FilteredList columns={columns} data={data} />)
  .add('sort', () => (
    <SortedList
      columns={columns}
      data={data}
      sortBy="cost"
      sortAscending={false}
    />
  ))

const columns = [
  { name: 'cost', text: 'Cost' },
  { name: 'name', text: 'Name' },
  { name: 'hero', text: 'Hero' },
  { name: 'rarity', text: 'Rarity' },
]

const data = [
  { cost: 1, name: 'Mistress of Mixtures', hero: 'Neutral', rarity: 'Common' },
  { cost: 2, name: 'Frostbolt', hero: 'Mage', rarity: 'Basic' },
  { cost: 3, name: 'Jade Blossom', hero: 'Druid', rarity: 'Common' },
  { cost: 6, name: 'Dragonfire Potion', hero: 'Priest', rarity: 'Epic' },
  { cost: 4, name: 'Mortal Strike', hero: 'Warrior', rarity: 'Rare' },
  {
    cost: 8,
    name: 'Ragnaros, Lightlord',
    hero: 'Paladin',
    rarity: 'Legendary',
  },
]

function BasicList({ columns, data }) {
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
          {data.length > 0 ? (
            <div style={bodyStyle}>
              {data.map(row => (
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

BasicList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}
