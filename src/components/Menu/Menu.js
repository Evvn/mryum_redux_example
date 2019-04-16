import React, {Component} from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js'
import NotFound from '../NotFound/NotFound.js'
import Section from './Section.js'
import Water from './Water.js'
import MenuItem from './MenuItem.js'
import MenuList from './MenuList.js'
import Footer from './Footer.js'
import ItemDetail from './ItemDetail.js'
import { persistStore } from 'redux-persist'

class Menu extends Component {
  constructor(props) {
     super(props)
   }

  getTags(){
    const { filter } = this.props;
    const tagsInUse = [];
    Object.keys(filter).forEach(tag => {
      if (filter[tag]) {
        tagsInUse.push(tag);
      }
    });

    return tagsInUse;
  }

  getSections(){
    const { menuItems, menuItemKeys } = this.props;
    const tagsInUse = this.getTags();
    const menuSections = {};
    menuItemKeys.forEach(item => {
      const placedSections = Object.keys(menuSections);
      const menuItem = menuItems[item];
      const section = menuItem.fields.Sections;
      if (!placedSections.includes(section)){
        menuSections[section] = [menuItem];
      }
      else{
        menuSections[section] = menuSections[section].concat([menuItem]);
      }
    });

    return menuSections;
  }

  getMenu() {
    const {
      filter,
      setSectionPosition,
      lang,
      routeToItemDetail,
    } = this.props
    const menuSections = this.getSections();
    const tagsInUse = this.getTags();

    if (menuSections.length === 0) {
      return <NotFound/>;
    } else {
      let sections = []
      Object.keys(menuSections).forEach((section,index) => {
          sections.push(
            <Section
              index={index}
              menuSection={menuSections[section]}
              name={section}
              setSectionPosition={setSectionPosition}
              tagsInUse={tagsInUse}
              routeToItemDetail={routeToItemDetail}
              lang={lang}
            />
          )
        });
      return sections;
    }
  }

  render() {
    const {
      filter,
      lang,
      updateFilter,
      updateLang,
      sectionPositions,
      menuItems,
      itemId,
    } = this.props

    console.log(menuItems)
    return (
      <div>
        {
          itemId
            ? <ItemDetail details={menuItems[itemId].fields} lang={lang} />
            : this.getMenu()
        }
      </div>
    );
  }
}


export default Menu;
