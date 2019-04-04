import React from 'react'

class Section extends React.Component {
  render() {
    const { name } = this.props

    return (
      <h2>{name}</h2>
    )
  }
}

export default Section
