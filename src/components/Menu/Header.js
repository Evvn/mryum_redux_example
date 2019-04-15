import React from 'react';
import Filter from './Filter.js';
// eslint-disable-next-line
import LanguageSelect from './LanguageSelect.js';

class Header extends React.Component {
  render() {
    // eslint-disable-next-line
    const { venueName, showBackArrow, showFilter, showLanguageSelect, filter, updateFilter } = this.props

    return (
      <header className="header">

        {/* back arrow for routing, control this and venuename via props */}
        { showBackArrow ? <img onClick={() => {window.history.back()}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/> : null }

        { !!venueName ? <h1 className="venue">{venueName}</h1> : null }

        { showFilter && <Filter filter={filter} updateFilter={updateFilter} /> }

        {/* { showLanguageSelect && <LanguageSelect /> } */}

        {/* <img className="cartIcon" src="/icons/cart_icon.svg" alt="cart"/> */}
        {/* need check to see when to display cart badge */}
        {/* { hasCartItems && <div className="cartBadge"/> } */}

      </header>
    )
  }
}

export default Header
