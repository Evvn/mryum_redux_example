import React from 'react'

class Header extends React.Component {
  render() {
    const { venueName, showBackArrow } = this.props

    return (
      <header className="header">

        {/* back arrow for routing, control this and venuename via props */}
        { showBackArrow ? <img src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/> : null }

        { !!venueName ? <h1 className="venue">{venueName}</h1> : null }
      </header>
    )
  }
}

export default Header
