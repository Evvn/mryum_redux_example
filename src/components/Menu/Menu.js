// Menu component - main dude,  gets called in App.js with url path to select correct venue in airtable
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React, {Component} from 'react';
// import './App.css';
import * as actions from './actions/actions.js'
import LoadingScreen from '../LoadingScreen/LoadingScreen.js'
import NotFound from '../NotFound/NotFound.js'
import Section from './Section.js'
import MenuItem from './MenuItem.js'
import MenuList from './MenuList.js'
import Header from './Header.js'
import Footer from './Footer.js'
import ItemDetail from './ItemDetail.js'

class Menu extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.routeItemDetails = this.routeItemDetails.bind(this)
  // }

  componentWillMount() {
    const {getMenuData, bffRes} = this.props
    if (!bffRes) {
      getMenuData('Holla')
    }
  }

  componentWillUpdate() {
    const {getMenuData, bffRes} = this.props
    if (!bffRes) {
      getMenuData('Holla')
    }
  }

  routeItemDetails(e, id) {
    e.stopPropagation();
    window.location = window.location.href + `/${id}`
  }

  generateView() {
    const {router, bffRes, filter} = this.props
    const itemId = router.route.params.item

    if (itemId) {
      return (<ItemDetail details={bffRes[itemId].fields}/>)
    } else {
      return (<div className="Menu">
        <Header venueName={Object.values(bffRes)[0].fields.Venue}/>

        <div className="menu">
          {this.printMenu(bffRes, filter)}

          <Footer/>
        </div>

      </div>)
    }
  }

  printMenu(menuSections, filter) {
    if (menuSections.length === 0) {
      return <NotFound/>
    } else {
      let menu = []
      let sections = []
      let itemIndex = 0;
      Object.keys(menuSections).forEach(section => {
        // if item section name does not exist in sections
        if (sections.indexOf(menuSections[section].fields['Sections']) === -1) {
          // push the section in here
          sections.push(menuSections[section].fields['Sections'])
          // and push the SECTION COMPONENT in here
          menu.push(
            <Section
              itemIndex={itemIndex}
              key={menuSections[section].fields['Sections']}
              name={menuSections[section].fields['Sections']}
            />
          )
        }

        // add ITEMS to menu under each SECTION
        // check if menu item is list item
        const hasTag = menuSections[section].fields.Tags ? true : false;
        const tags = menuSections[section].fields.Tags;
        // if it is not a list, else (if it is)
        if (hasTag) {
          if (tags[0] !== 'LIST') {
            menu.push(
              <MenuItem
                key={menuSections[section].id}
                onClick={(e) => {
                    this.routeItemDetails(e, menuSections[section].id)
                  }}
                item={menuSections[section].fields}
                itemIndex={itemIndex}
              />
            );
          } else {
            menu.push(
              <MenuList
                key={menuSections[section].id}
                onClick={(e) => {
                    this.routeItemDetails(e, menuSections[section].id)
                  }}
                item={menuSections[section].fields}
                itemIndex={itemIndex}
              />
            );
          }
        } else {
          menu.push(<MenuItem key={menuSections[section].id} onClick={(e) => {
            this.routeItemDetails(e, menuSections[section].id)
            }}
            item={menuSections[section].fields} itemIndex={itemIndex} />
          );
        }
        // if filter matches, add item and index ++, else next item * TO DO
        itemIndex++;
      })
      return menu
    }

  }

  render() {
    const {isLoading} = this.props
    return (<div>
      {
        isLoading
          ? <LoadingScreen/>
          : this.generateView()
      }
    </div>)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({router: state.router, bffRes: state.menu.bffRes, isLoading: state.menu.isLoading, filter: false});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
