import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HorizontalScrollNav from "../Common/HorizontalScrollNav";
import Filter from "./Filter.js";
import LanguageSelect from "./LanguageSelect.js";
import Menu from "./Menu";
// import { persistStore } from 'redux-persist'
import Footer from "./Footer";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import * as actions from "./actions/actions.js";
import * as commonActions from "../Common/actions/actions.js";
import classNames from "classnames";
import ReactGA from "react-ga";
import Water from "./Water.js";
import MenuSearch from "../Common/MenuSearch";

import "./styles/menuContainer.scss";

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    const paramArray = window.location.href.split("/");
    this.params = {
      requestedVenue: paramArray[3],
      item:
        paramArray.length === 5
          ? paramArray[4].toLowerCase() === "qr" ||
            paramArray[4].toLowerCase() === "test" ||
            paramArray[4].toLowerCase() === "menu"
            ? false
            : paramArray[4]
          : false
    };

    if (
      paramArray[4] &&
      (paramArray[4].toLowerCase() === "qr" ||
        paramArray[4].toLowerCase() === "test")
    ) {
      if (paramArray[4].toLowerCase() === "qr") {
        ReactGA.event({
          category: "Page view",
          action: "via QR code scan",
          label: paramArray[3],
          nonInteraction: true
        });
      } else if (paramArray[4].toLowerCase() === "menu") {
        ReactGA.event({
          category: "Page view",
          action: "via /menu URL",
          label: paramArray[3],
          nonInteraction: true
        });
      } else if (paramArray[4].toLowerCase() === "test") {
        console.log(
          "%c テスティング. \nｔｅｓｔｉｎｇ.",
          "color: #a1b5ff; font-size: 250%; font-family: monospace;"
        );
        ReactGA.event({
          category: "Page view",
          action: "DEV :) // Test view",
          label: paramArray[3],
          nonInteraction: true
        });
      }
      window.history.replaceState({}, document.title, "/" + paramArray[3]);
    }

    this.routeToItemDetail = this.routeToItemDetail.bind(this);
  }

  componentWillMount() {
    const {
      getMenuData,
      bffRes,
      venue,
      itemId,
      setItemId,
      clearSectionPositions,
      venueUrl
    } = this.props;

    if (!bffRes || venueUrl.toLowerCase() !== venue) {
      document.title = "Mr Yum";
      getMenuData(venueUrl.toLowerCase(), this.params.item);
      clearSectionPositions();
    } else {
      const venueName = bffRes.venue.NAME;
      document.title = venueName + " Menu";
    }
    if (this.params.item !== itemId) {
      if (itemId !== undefined) {
        if (itemId.toLowerCase() !== "qr" || itemId.toLowerCase() !== "test") {
          setItemId(this.params.item);
        }
      }
    }
  }

  componentWillUpdate() {
    const {
      getMenuData,
      bffRes,
      venue,
      itemId,
      setItemId,
      clearSectionPositions,
      venueUrl
    } = this.props;
    if (!bffRes || venueUrl.toLowerCase() !== venue) {
      getMenuData(venueUrl.toLowerCase(), this.params.item);
      clearSectionPositions();
    }
    if (this.params.item !== itemId) {
      if (itemId !== undefined) {
        if (itemId.toLowerCase() !== "qr" || itemId.toLowerCase() !== "test") {
          setItemId(this.params.item);
        }
      }
    }
  }

  componentWillUnmount() {
    const { clearSectionPositions } = this.props;
    clearSectionPositions();
    window.scrollTo(0, 0);
    //persistStore(this.props).purge();
  }

  routeToItemDetail(e, id, lang) {
    // const { setItemId } = this.props;
    const newId = id ? id : false;
    const refSuffix = newId ? `/${id}` : "";
    window.location = window.location.href + `${refSuffix}`;
  }

  getHeader() {
    const {
      sectionPositions,
      filter,
      updateFilter,
      updateLang,
      lang,
      bffRes,
      itemId,
      searchLength
    } = this.props;
    const venueName = bffRes ? bffRes.venue.NAME : false;
    let itemView = itemId ? true : false;
    if (itemId !== undefined) {
      if (itemId.toLowerCase() === "qr" || itemId.toLowerCase() === "test") {
        itemView = false;
      }
    }
    const filterInUse = Object.values(filter).includes(true);
    const searchInUse = searchLength > 0 ? true : false;

    return (
      <div>
        <header
          className={classNames("header", itemView ? "previewHeader" : "")}
        >
          {/* back arrow for routing, control this and venuename via props */}
          {itemView ? (
            <img
              onClick={() => {
                if (
                  document.referrer.includes("mryum") ||
                  document.referrer.includes("localhost")
                ) {
                  window.history.back();
                } else {
                  let location = window.location.href.split("/");
                  location.pop();
                  window.location = location.join("/");
                }
              }}
              src="/icons/arrow-left-solid-white.svg"
              className="headerBackArrow"
              alt="back arrow"
            />
          ) : null}
          {!!venueName && !itemView ? (
            <h1 className="venue">{venueName}</h1>
          ) : null}
          {!itemView && (
            <Filter filter={filter} updateFilter={updateFilter} lang={lang} />
          )}
          {!itemView && !filterInUse && !searchInUse ? (
            <HorizontalScrollNav sectionPositions={sectionPositions} />
          ) : (
            ""
          )}
          {!itemView && <LanguageSelect lang={lang} updateLang={updateLang} />}
          {/* <img className="cartIcon" src="/icons/cart_icon.svg" alt="cart"/> */}
          {/* need check to see when to display cart badge */}
          {/* { hasCartItems && <div className="cartBadge"/> } */}
        </header>
      </div>
    );
  }

  render() {
    const {
      filter,
      lang,
      bffRes,
      isLoading,
      setSectionPosition,
      itemId,
      searchTerm,
      setSearchRes,
      searchLength,
      searchRes
    } = this.props;
    let itemView = itemId ? true : false;
    if (itemId !== undefined) {
      if (itemId.toLowerCase() === "qr" || itemId.toLowerCase() === "test") {
        itemView = false;
      }
    }
    const searchInUse = searchLength > 0 ? true : false;
    const filterInUse = Object.values(filter).includes(true);
    const tagsInUse = [];
    Object.keys(filter).forEach(tag => {
      if (filter[tag]) {
        tagsInUse.push(tag);
      }
    });

    tagsInUse.forEach((tag, index) => {
      if (tag === "V") {
        tagsInUse[index] = "vegetarian";
      }
      if (tag === "VE") {
        tagsInUse[index] = "vegan";
      }
      if (tag === "GF") {
        tagsInUse[index] = "gluten-free";
      }
    });

    let filteredRes = [];
    if (tagsInUse.length > 0) {
      Object.values(Object.values(bffRes.items)).forEach((elem, index) => {
        if (elem.DIETARY_DESCRIPTORS) {
          Object.keys(elem.DIETARY_DESCRIPTORS);
          // IF ELEMENT HAS TAGS ...
          let matchCount = 0;
          tagsInUse.forEach(tag => {
            if (elem.DIETARY_DESCRIPTORS.includes(tag)) {
              matchCount++;
            }
          });
          if (matchCount === tagsInUse.length) {
            filteredRes.push(":)");
          }
        }
      });
    }

    const showWater =
      filteredRes.length === 0 && tagsInUse.length > 0 ? true : false;

    return isLoading || !bffRes ? (
      <LoadingScreen />
    ) : (
      <div className="Menu">
        {this.getHeader()}
        {!itemView && (
          <MenuSearch
            data={bffRes}
            hide={false}
            onInput={result => result}
            setSearchRes={setSearchRes}
            searchInUse={searchInUse}
            tagsInUse={tagsInUse.length > 0 ? true : false}
          />
        )}
        <div className="menu">
          <Menu
            menuItemKeys={Object.keys(bffRes.items)}
            menuItems={bffRes.items}
            filter={filter}
            lang={lang}
            itemId={itemId}
            routeToItemDetail={this.routeToItemDetail}
            setSectionPosition={setSectionPosition}
            searchInUse={searchInUse}
            searchTerm={searchTerm}
            searchRes={searchRes}
            filterInUse={filterInUse}
          />
          {showWater ? <Water /> : ""}
          {searchInUse && searchRes.length === 0 ? (
            <div className="noSearchRes">
              <img src="/icons/no_results.svg" alt="" className="searchFace" />
              <p>Sorry, looks like there are no results.</p>
              <p>Try something else!</p>
            </div>
          ) : (
            ""
          )}
          <Footer />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions, ...commonActions }, dispatch);

const mapStateToProps = state => ({
  bffRes: state.persistentMenu.bffRes,
  category: state.persistentMenu.category,
  isLoading: state.common.isLoading,
  venue: state.persistentMenu.venue,
  sectionPositions: state.menu.sectionPositions,
  filter: state.persistentMenu.filter,
  lang: state.persistentMenu.lang,
  searchTerm: state.common.searchTerm,
  searchRes: state.common.searchRes,
  searchLength: state.common.searchLength
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer);
