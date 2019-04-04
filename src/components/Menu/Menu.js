// Menu component - main dude,  gets called in App.js with url path to select correct venue in airtable
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, {Component} from 'react';
// import './App.css';
import * as actions from './actions/actions.js'
import LoadingScreen from '../LoadingScreen/LoadingScreen.js'
import NotFound from '../NotFound/NotFound.js'
import Section from './Section.js'
import MenuItem from './MenuItem.js'
import Header from './Header.js'

class Menu extends Component {

  componentWillMount() {
    const { getMenuData } = this.props
    getMenuData('Holla')
  }

  printMenu(menuSections, filter) {
    if (menuSections.length === 0) {
      return <NotFound />
    } else {
      let menu = []
      Object.values(menuSections).forEach(section => {
        if (typeof(section) === 'string') {
          // add SECTION to menu
          menu.push(
            <Section
              key={section}
              name={section}
            />
          )
        } else {
          // add ITEMS to menu under each SECTION
          let itemIndex = 0;
          section.forEach(item => {
            // if filter matches, add item and index ++, else next item
            menu.push(
              <MenuItem
                key={item.id}
                item={item}
                itemIndex={itemIndex}
              />
            );
            itemIndex++;
          })
        }
      })
      return menu
    }
  }

  render() {
    const { bffRes, isLoading, filter } = this.props

    return (
      <div>
        { isLoading ?
          <LoadingScreen />
          :
           <div className="Menu">
             <Header />
             <div className="menu">
               {this.printMenu(bffRes, filter)}
             </div>
           </div>
         }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  router: state.router,
  bffRes: state.menu.bffRes,
  isLoading: state.menu.isLoading,
  filter: false,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
