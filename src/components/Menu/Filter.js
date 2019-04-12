import React from 'react'

class Filter extends React.Component {

  openFilterMenu(e) {
    document.querySelector('.filterList').classList.toggle('open')
    document.querySelector('.hamburger').classList.toggle('is-active')
  }

  render() {
    const vegetarian = 'Vegetarian'
    const vegan = 'Vegan'
    const gf = 'Gluten Free'
    const { updateFilter, filter } = this.props

    return(
      <div className="filter" onClick={ this.openFilterMenu }>
          <div className={Object.values(filter).indexOf(true) !== -1 ? "filterIcon" : "filterIcon hidden"}></div>
          <div className="hamburger hamburger--spin">
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </div>

          {/* TODO: there's a lot of repetition going on here, would be nice to not hard code all the filters */}
          <div className="filterList">
            <p className="option" id="vegetarian" value="vegetarian" onClick={() => {updateFilter({...filter, V: !filter.V})}}>
              <span className={filter.V ? 'checkBox checkedBox' : 'checkBox'} />
              { vegetarian }
            </p>
            <p className="option" id="vegan" value="vegan" onClick={() => {updateFilter({...filter, VE: !filter.VE})}}>
              <span className={filter.VE ? 'checkBox checkedBox' : 'checkBox'}/>
              { vegan }
            </p>
            <p className="option" id="gluten-free" value="gluten-free" onClick={() => {updateFilter({...filter, GF: !filter.GF})}}>
              <span className={filter.GF ? 'checkBox checkedBox' : 'checkBox'} />
              { gf }
            </p>
            {/* Some un-used filters for later */}
            {/* <p className="option" id="dairy-free">
              <span className="checkBox" />
              Dairy Free
            </p>
            <p className="option" id="nut-free">
              <span className="checkBox" />
              Nut Free
            </p> */}
          </div>

        </div>
    )
  }
}

export default Filter
