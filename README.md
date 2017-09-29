# Relisted

React Primitives to build a sortable, filterable, data-list.

## What this is

Relisted is a component that manages user interaction for sorting and filtering
a list of data, while allowing you to retain complete control over the rendering
of the list. 

## What this is NOT

This is a super early version that is just barely generalized enough for me to open-source.
It does not currently have any accessibility considerations. It does not support paging
or virtualization. It has built-in sort and filter functionality that might not meet your needs. My next plan on the roadmap for this is to add the ability to override the filter/sort
functionality with your own custom functions.

## Installation

```
npm install --save relisted
```

or

```
yarn add relisted
```

> This package also depends on `react` and `prop-types`. Make sure those are both installed!

## Simple Example

```jsx
import Relisted from 'relisted'

function BasicList({columns, data}) {
  return (
    <Relisted>
      {({getColumnProps}) => (
        <div style={{display: 'flex', flexDirection: 'column', width: '500px', height: '500px', border: '1px solid blue'}}>
          <div style={{display: 'flex', width: '100%', borderBottom: '1px solid #cdcdcd'}}>
            {columns.map(c => (
              <div key={c.name} {...getColumnProps((style: {flex: 1}))}>
                {c.text}
              </div>
            ))}
          </div>
          {data.length > 0 ?(
            <div style={{display: 'flex', width: '100%', flex: 1, flexDirection: 'column'}}>
              {data.map(row => (
                <div style={{width: '100%', display: 'flex' flexShrink: '0'}}>
                  {columns.map(c => (
                    <div key={c.name} style={{flex: 1}}>
                      {row[c.name]}
                    </div>
                  ))}
                </div>
              ))}
              </div>
          ) : (
            <div>Empty Data</div>
          )}
        </div>
      )}
    </Relisted>
  )
}

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

function App() {
  return (
    <BasicList
      columns={columns}
      data={data}
    />
  )
}
```

## Props

### sortBy

> `string` | defaults to empty string

Pass a the name of the column you want to sort by. Used by the default filter function.

### children

> `function({})` | *required*

This function is called by the render of `relisted` and is passed an object. Read more below.

## Child Callback Function

The child callback function is passed an object that has 3 different categories of properties:

### prop getters

These are functions that will return an object representing props to apply to a component.
Any props that you would like to apply to that component along with the ones returned
by the getter should be passed to the getter function.

#### `getColumnProps`

This function is responsible for wiring up the click handling of each column header for
sorting.

Required properties:

- `name`: the name of the column. This name gets set as the sortBy once a column header is clicked.

#### `getFilterProps`

This function applies props for controlling the state of the search filter.

There are no required properties for this function.

#### `getClearProps`

This function applies props for wiring up a button for clearing the search filter.

There are no requrired properties for this function.

### helpers

These are functions that provide built-in sorting and filtering of a list.

| property     | type                              | description                                   |
|--------------|-----------------------------------|-----------------------------------------------|
| `filterData` | `function(data: [], columns: [])` | filters the given data using the filter state |
| `sortData`   | `function(data: [])`              | sorts the given data using the sort state     |

### state

These are values that represent the current internal state of the Relisted component.

| property        | type      | description                               |
|-----------------|-----------|-------------------------------------------|
| `sortBy`        | `string`  | the column name to sort by                |
| `sortAscending` | `boolean` | whether to sort in ascending order or not |

## Examples

Examples can be found in the stories folder.

## Inspiration

This library was inspired by the awesome [Downshift](https://github.com/paypal/downshift) created
by Kent C. Dodds. I highly recommend checking out the documentation for that library to get a better
understanding of the patterns utilized here.

## LICENSE

MIT