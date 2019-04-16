import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React, {Component} from 'react';
import * as actions from './actions/actions.js'
import LoadingScreen from '../LoadingScreen/LoadingScreen.js'
import NotFound from '../NotFound/NotFound.js'
import Section from './Section.js'
import Water from './Water.js'
import MenuItem from './MenuItem.js'
import MenuList from './MenuList.js'
import Header from './Header.js'
import Footer from './Footer.js'
import ItemDetail from './ItemDetail.js'
import { persistStore } from 'redux-persist'

class Menu extends Component {
  constructor(props) {
     super(props)

     const paramArray = window.location.href.split('/');
     this.params = {
        requestedVenue: paramArray[3],
        item: paramArray.length === 5 ? paramArray[4] : false,
     }
   }

  componentWillMount() {
    const { getMenuData, bffRes, venue } = this.props;
    if (!bffRes || this.params.requestedVenue !== venue) {
      getMenuData(this.params.requestedVenue);
    }
  }

  componentWillUpdate() {
    const { getMenuData, bffRes, venue } = this.props;
    if (!bffRes || this.params.requestedVenue !== venue) {
      getMenuData(this.params.requestedVenue);
    }
  }

  componentWillUnmount() {
    persistStore(this.props).purge();
  }

  routeItemDetails(e, id) {
    e.stopPropagation();
    window.location = window.location.href + `/${id}`
  }

  generateView() {
    const {
      bffRes,
      filter,
      lang,
      updateFilter,
      updateLang,
      sectionPositions,
    } = this.props
    const itemId = this.params.item

    const venueName = Object.values(bffRes)[0].fields.Venue
    const { menu, sectionNames } = this.printMenu(bffRes, filter);
    

    // add 'Menu' to the end of the doc title - shows in tab
    document.title = venueName + " Menu";
    if (itemId) {
      return (<ItemDetail details={bffRes[itemId].fields} lang={lang} />)
    } else {
      return (
        <div className="Menu">
          {sectionPositions === {} ? (<span>Loading</span>) :
          <Header
            venueName={venueName}
            showLanguageSelect
            showFilter
            filter={filter}
            lang={lang}
            updateFilter={updateFilter}
            updateLang={updateLang}
            sectionNames={sectionNames}
            sectionPositions={sectionPositions}
          />}
          <div className="menu">
            { menu }
            <Water />
            <Footer/>
          </div>
        </div>
      );
    }
  }

  printMenu(menuSections) {
    const { filter, setSectionPosition, lang } = this.props
    let tagsInUse = []
    Object.keys(filter).forEach(tag => {
      if (filter[tag]) {
        tagsInUse.push(tag)
      }
    })

    if (menuSections.length === 0) {
      return { menu: <NotFound/>, sectionNames: false };
    } else {
      let menu = []
      let sections = []
      let itemIndex = 0;
      let sectionNames = [];
      Object.keys(menuSections).forEach(section => {
        // if item section name does not exist in sections
        sectionNames.push(menuSections[section].fields['Sections']);
        if (sections.indexOf(menuSections[section].fields['Sections']) === -1) {
          // push the section in here
          sections.push(menuSections[section].fields['Sections'])
          // and push the SECTION COMPONENT in here
          menu.push(
            <Section
              itemIndex={itemIndex}
              key={menuSections[section].fields['Sections']}
              name={menuSections[section].fields['Sections']}
              setSectionPosition={setSectionPosition}
            />
          )
        }

        // add ITEMS to menu under each SECTION
        // check if menu item is list item
        const hasTag = menuSections[section].fields.Tags ? true : false;
        const tags = menuSections[section].fields.Tags;
        const menuItem = (
          <MenuItem
            key={menuSections[section].id}
            onClick={(e) => {
                this.routeItemDetails(e, menuSections[section].id, lang)
              }}
            item={menuSections[section].fields}
            itemIndex={itemIndex}
            lang={lang}
          />
        )
        // if it is not a list, else (if it is)
        if (hasTag) {
          // IF MENU ITEM HAS TAGS BUT IS NOT A LIST ITEM
          if (tags[0] !== 'LIST') {
            if (tagsInUse.length > 0 && tagsInUse.some(tag => tags.includes(tag))) {
              // if menu item tags match any tags in filter
              menu.push(
                menuItem
              );
              itemIndex++;
            } else if (tagsInUse.length === 0) {
              // if no tags are in use, push non list item with tags
              menu.push(
                menuItem
              );
              itemIndex++;
            }
          } else if (tagsInUse.length === 0) {
            // IF MENU ITEM IS A LIST ITEM & no tags are in use
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
            itemIndex++;
          }
        } else {
          if (tagsInUse.length === 0) {
            // IF MENU ITEM HAS NO TAGS -- always hide when filter is in use
            menu.push(
              menuItem
            );
            itemIndex++;
          }
        }
      })

      // eslint-disable-next-line
      const noEmptySections = menu.map((element, index) => {
        // if menu object is type Section
        if (element.type.name === 'Section') {
          // if next object after Section is not undefined, RETURN IT
          if (typeof menu[index + 1] !== 'undefined') {
            // if next object after Section is a MenuItem or a MenuList, RETURN IT
            if (menu[index + 1].type.name === 'MenuItem' ||
                menu[index + 1].type.name === 'MenuList')
            {
              return element
            }
          }
        } else {
          return element
        }
      })
      sectionNames = [...new Set(sectionNames)];
      return { menu: noEmptySections, sectionNames };
    }

  }

  render() {
    const {isLoading, sectionPositions} = this.props
    return (
      <div>
        {
          isLoading
            ? <LoadingScreen/>
            : this.generateView(sectionPositions)
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  bffRes: state.persistentMenu.bffRes,
  isLoading: state.persistentMenu.isLoading,
  venue: state.persistentMenu.venue,
  sectionPositions: state.menu.sectionPositions,
  filter: state.persistentMenu.filter,
  lang: state.persistentMenu.lang,
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
