import React from 'react'
import PropTypes from 'prop-types'
import orderBy from 'lodash/orderBy'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Relisted extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    sortBy: PropTypes.string,
    sortAscending: PropTypes.bool,
  }

  static defaultProps = {
    sortBy: '',
    sortAscending: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      filterValue: '',
      sortBy: props.sortBy,
      sortAscending: props.sortAscending,
    }
  }

  filterData = (data, columns) => {
    return data.filter(row => {
      const keys = columns.map(c => c.name)
      return keys.some(key => {
        const check = row[key]
        if (typeof check === 'string')
          return check
            .toLowerCase()
            .includes(this.state.filterValue.toLowerCase())
        return check === this.state.filterValue
      })
    })
  }

  sortData = data => {
    return orderBy(
      data,
      [this.state.sortBy],
      [this.state.sortAscending ? 'asc' : 'desc']
    )
  }

  columnClick = columnName => {
    this.setState(prevState => {
      const state = { sortBy: columnName }
      if (prevState.sortBy === state.sortBy) {
        state.sortAscending = !prevState.sortAscending
      } else {
        state.sortAscending = true
      }
      return state
    })
  }

  propGetters() {
    return {
      getColumnProps: this.getColumnProps,
      getFilterProps: this.getFilterProps,
      getClearProps: this.getClearProps,
      filterData: this.filterData,
      sortData: this.sortData,
      sortBy: this.state.sortBy,
      sortAscending: this.state.sortAscending,
      filterValue: this.state.filterValue,
    }
  }

  getColumnProps = ({ name, ...rest } = {}) => ({
    ...rest,
    onClick: callAll(rest.onClick, () => this.columnClick(name)),
  })

  getFilterProps = (props = {}) => ({
    value: this.state.filterValue,
    ...props,
    onChange: callAll(props.onChange, this.filterChange),
  })

  getClearProps = (props = {}) => ({
    ...props,
    onClick: callAll(props.onClick, this.clearFilter),
  })

  filterChange = evt => {
    this.setState({ filterValue: evt.target.value })
  }

  clearFilter = () => {
    this.setState({ filterValue: '' })
  }

  render() {
    return this.props.children(this.propGetters())
  }
}

export default Relisted
