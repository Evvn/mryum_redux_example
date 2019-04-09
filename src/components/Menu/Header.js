import React from 'react'

class Header extends React.Component {
  render() {
    const { venueName } = this.props

    return (
      <header className="header">
        <h1 className="venue">{venueName}</h1>
      </header>
    )
  }
}

export default Header
