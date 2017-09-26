import React from 'react'
import PropTypes from 'prop-types'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Relisted extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    filterValue: '',
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

  propGetters() {
    return {
      getColumnProps: () => {},
      getFilterProps: this.getFilterProps,
      getClearProps: this.getClearProps,
      filterData: this.filterData,
    }
  }

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
