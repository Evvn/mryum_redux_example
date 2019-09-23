import React, { Component } from "react";
import NotFound from "../NotFound/NotFound.js";
import Section from "./Section.js";
import ItemDetail from "./ItemDetail.js";
import ClassNames from "classnames";

class Menu extends Component {
  getTags() {
    const { filter } = this.props;
    const tagsInUse = [];
    Object.keys(filter).forEach(tag => {
      if (filter[tag]) {
        tagsInUse.push(tag);
      }
    });

    return tagsInUse;
  }

  componentDidUpdate() {}

  getSections() {
    const { menuItems, menuItemKeys, searchRes, searchInUse } = this.props;
    const menuSections = {};
    // let searchedMenuArr = [];
    let searchedMenu = {};
    if (searchInUse) {
      // eslint-disable-next-line
      searchRes.map((item, index) => {
        if (menuItems[searchRes[index].id]) {
          return (searchedMenu[item.id] = menuItems[searchRes[index].id]);
        }
      });

      Object.keys(searchedMenu).forEach(item => {
        const placedSections = Object.keys(menuSections);
        const menuItem = menuItems[item];
        const section = menuItem.SECTIONS;
        if (!placedSections.includes(section)) {
          menuSections[section] = [menuItem];
        } else {
          menuSections[section] = menuSections[section].concat([menuItem]);
        }
      });
    } else {
      menuItemKeys.forEach(item => {
        const placedSections = Object.keys(menuSections);
        const menuItem = menuItems[item];
        const section = menuItem.SECTIONS;
        if (!placedSections.includes(section)) {
          menuSections[section] = [menuItem];
        } else {
          menuSections[section] = menuSections[section].concat([menuItem]);
        }
      });
    }

    return menuSections;
  }

  compareMenuOrder = (a, b) => {
    const indexA = a.POSITION;
    const indexB = b.POSITION;
    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
    return 0;
  };

  compareSectionOrder = (a, b) => {
    const indexA = a[0].POSITION;
    const indexB = b[0].POSITION;
    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
    return 0;
  };

  getMenu() {
    const {
      setSectionPosition,
      lang,
      routeToItemDetail,
      searchInUse,
      searchTerm,
      filterInUse
    } = this.props;
    const menuSections = this.getSections();
    const tagsInUse = this.getTags();

    if (menuSections.length === 0) {
      return <NotFound />;
    } else {
      let sortedSections = Object.values(menuSections).map(section => {
        return section.sort(this.compareMenuOrder);
      });

      sortedSections = sortedSections.sort(this.compareSectionOrder);

      sortedSections = sortedSections.map(section => {
        let sectionName = section[0].SECTIONS;
        let sectionObj = {
          [sectionName]: section
        };
        return sectionObj;
      });

      sortedSections = sortedSections.map((section, index) => {
        return (
          <Section
            key={index}
            index={index}
            menuSection={Object.values(section)[0]}
            name={Object.keys(section)[0]}
            setSectionPosition={setSectionPosition}
            tagsInUse={tagsInUse}
            routeToItemDetail={routeToItemDetail}
            lang={lang}
            searchInUse={searchInUse}
            searchTerm={searchTerm}
            filterInUse={filterInUse}
          />
        );
      });

      return sortedSections;
    }
  }

  render() {
    const { lang, menuItems, itemId } = this.props;
    const desktopView = window.innerWidth > 768 ? true : false;
    let showItem = itemId ? true : false;
    if (itemId !== undefined) {
      if (itemId.toLowerCase() === "qr" || itemId.toLowerCase() === "test") {
        showItem = false;
      }
    }

    return desktopView ? (
      <div>
        <div
          className={ClassNames(itemId ? "menuCont lockScroll" : "menuCont")}
        >
          {this.getMenu()}
        </div>

        {showItem ? <ItemDetail item={menuItems[itemId]} lang={lang} /> : ""}
      </div>
    ) : (
      <div>
        {showItem ? (
          <ItemDetail item={menuItems[itemId]} lang={lang} />
        ) : (
          <div>{this.getMenu()}</div>
        )}
      </div>
    );
  }
}

export default Menu;
