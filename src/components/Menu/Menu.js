// Menu component - main dude,  gets called in App.js with url path to select correct venue in airtable
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, {Component} from 'react';
// import './App.css';
import * as actions from './actions/actions.js'

class Menu extends Component {

  componentWillMount() {
    const { getMenuData } = this.props
    getMenuData('Holla')
  }

  render() {
    return (
      <div>
        <h1>Menu</h1>
        <h1>Menu</h1>
        <h1>Menu</h1>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  router: state.router,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
