import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../Menu/actions/actions.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js'

class Brunch extends React.Component{
  componentWillMount() {
    const { getVenues, categoryRes } = this.props
    if (!categoryRes) {
      getVenues()
    }
  }

  createBackground(url) {
    let style = {
      backgroundImage: `url('${url}')`,
    }
    return style
  }

  printBrunch(categoryRes) {
    let verified = []
    let unverified = []

    categoryRes.forEach((venue, index) => {
      if (venue.VERIFIED) {
        verified.push(
          <div
            key={index}
            className="venueCard"
            style={this.createBackground(venue.BANNER_IMAGE.url)}
          >
            <a className="venueName" href={`/${venue.NAME_NO_SPACE}`}>{ venue.NAME }</a>
          </div>
        )
      } else {
        unverified.push(
          <div
            key={index}
            className="venueCard"
            style={this.createBackground(venue.BANNER_IMAGE.url)}
          >
            <a className="venueName" href={`/${venue.NAME_NO_SPACE}`}>{ venue.NAME }</a>
          </div>
        )
      }
    })

    return (
      <div>
        <h2>Verified by Mr Yum <span role="img" aria-label="medal">🏅</span></h2>
          {verified}
        <h2>Not Yet Verified <span role="img" aria-label="dice">🎲</span></h2>
          {unverified}
      </div>
    )
  }

  render() {
    const { isLoading, categoryRes } = this.props

    return(
      ( isLoading ?
        <LoadingScreen/>
        :
        <div className="categorySelection">
          <header>
            <h1 className="venue">Brunch in Melbourne</h1>
            <a href="/"><img src="/mryum_assets/Mr_Yum_logo_white.svg" alt="Mr Yum"/></a>
          </header>

          { this.printBrunch(categoryRes) }

        </div>
      )
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  categoryRes: state.persistentMenu.categoryRes,
  isLoading: state.persistentMenu.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Brunch)
