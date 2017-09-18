import React from 'react'
import PropTypes from 'prop-types'

class Relisted extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  propGetters() {
    return {
      getColumnProps: () => {},
    }
  }

  render() {
    return this.props.children(this.propGetters())
  }
}

export default Relisted
