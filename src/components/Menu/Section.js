import React from "react";
import ReactDOM from "react-dom";
import MenuItem from "./MenuItem";
import MenuList from "./MenuList";
import MenuInfo from "./MenuInfo";
import uuid from "uuid/v4";

//scss
import "./styles/section.scss";

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false
    };
  }

  componentDidMount() {
    const { name, setSectionPosition } = this.props;
    const position = ReactDOM.findDOMNode(this).offsetTop - 30;
    setSectionPosition(name.split("%")[0], position);
  }

  processItem(item, index) {
    const {
      tagsInUse,
      routeToItemDetail,
      lang,
      searchInUse,
      filterInUse
    } = this.props;
    let tags = "";
    if (item.DIETARY_DESCRIPTORS) {
      tags = item.DIETARY_DESCRIPTORS.split(", ");
    }

    if (tags) {
      tags.forEach((tag, index) => {
        if (tag === "vegetarian") {
          tags[index] = "V";
        }
        if (tag === "vegan") {
          tags[index] = "VE";
        }
        if (tag === "gluten-free") {
          tags[index] = "GF";
        }
      });
    }

    // If menu item tags match any tags in filter -> should match ALL filter tags -> done
    // changed .some method to .every
    if (tags) {
      if (
        (tagsInUse.length > 0 && tagsInUse.every(tag => tags.includes(tag))) ||
        tagsInUse.length === 0
      ) {
        return (
          <MenuItem
            key={item.ID}
            item={item}
            itemIndex={index}
            lang={lang}
            searchInUse={searchInUse}
            filterInUse={filterInUse}
            onClick={e => {
              routeToItemDetail(e, item.ID, lang);
            }}
          />
        );
      }
    }

    return "";
  }

  getList(item, index) {
    const { routeToItemDetail } = this.props;
    return (
      <MenuList
        key={item.ID}
        // disable menu list item click until ordering
        onClick={e => {
          routeToItemDetail(e, item.ID);
        }}
        item={item}
        itemIndex={index}
      />
    );
  }

  getSection() {
    const {
      menuSection,
      lang,
      routeToItemDetail,
      tagsInUse,
      searchInUse,
      filterInUse
    } = this.props;

    let infoList = [];

    let section = menuSection
      ? menuSection.map((item, index) => {
          const hasTag = item.DIETARY_DESCRIPTORS ? true : false;
          const menuItemTemplate = (
            <MenuItem
              key={item.ID}
              item={item}
              itemIndex={index}
              lang={lang}
              searchInUse={searchInUse}
              filterInUse={filterInUse}
              onClick={e => {
                routeToItemDetail(e, item.ID, lang);
              }}
            />
          );

          // this creates LIST, e.g. wine list or coffees
          if (item.TYPE === "info") {
            infoList.push(item);
            // eslint-disable-next-line
            return;
          }

          if (tagsInUse.length > 0 && !hasTag) {
            return "";
          }

          // this creates PHOTOLESS MENU ITEMS, e.g. beers (that can be ordered)
          return hasTag
            ? item.TYPE !== "list"
              ? this.processItem(item, index)
              : this.getList(item, index)
            : menuItemTemplate;
        })
      : [];

    if (tagsInUse.length === 0 && infoList.length > 0 && !searchInUse) {
      section.push(<MenuInfo key={uuid()} infoList={infoList} />);
    }

    return section;
  }

  showMap = mapUrl => {
    this.setState(
      {
        showMap: true
      },
      () => {
        const mapStyle = document.querySelector(".map").style;
        mapStyle.backgroundImage = `url('${mapUrl}')`;
        console.log(mapUrl);
        mapStyle.backgroundRepeat = "no-repeat";
        mapStyle.backgroundPosition = "center";
        mapStyle.backgroundSize = "contain";
      }
    );
  };

  hideMap = () => {
    this.setState({
      showMap: false
    });
  };

  render() {
    const {
      name,
      index,
      tagsInUse,
      searchInUse,
      searchTerm,
      menuSection
    } = this.props;
    const { showMap } = this.state;
    const venueName = Object.values(menuSection)[0].VENUE_NAME;
    const isQvm = venueName === "QVM Winter Market" ? true : false;
    let tags = tagsInUse;
    let nameClone = name ? name : "";
    let subSection = "";
    let hideSection = false;
    let mapUrl = "";

    if (isQvm) {
      mapUrl = `/qvm/section_map_${Object.values(menuSection)[0].map_zone}.jpg`;
    }

    if (nameClone.indexOf("%") !== -1) {
      subSection = nameClone.substring(
        nameClone.indexOf("%") + 1,
        nameClone.length
      );
      nameClone = nameClone.substring(0, nameClone.indexOf("%"));
    }

    // replace nameClone with tags in use
    if (tags.length > 0) {
      tags = tags.join(", ");
      nameClone = tags
        .replace(new RegExp("\\bV\\b"), "Vegetarian")
        .replace(new RegExp("\\bVE\\b"), "Vegan")
        .replace(new RegExp("\\bGF\\b"), "Gluten Free");
      subSection = "";
    }

    // replace nameClose with search term in use
    if (searchInUse) {
      nameClone = `Search results for '${searchTerm}'`;
      subSection = "";
    }

    // concat tags and filter res
    if (tags.length > 0 || searchInUse) {
      if (index > 0) {
        hideSection = true;
      }
    }

    let section = this.getSection();
    section = section.filter(elem => elem);

    return (
      <div>
        {hideSection ? (
          ""
        ) : (
          <h2
            className={`section ${
              index === 0
                ? tags.length === 0 && !searchInUse
                  ? "sectionTaller"
                  : "sectionFiltered"
                : ""
            }`}
          >
            {nameClone}
            <span className="subSection">{subSection}</span>
            {isQvm && tags.length === 0 && !searchInUse ? (
              <span className="mapBtn" onClick={() => this.showMap(mapUrl)}>
                View on map
              </span>
            ) : (
              ""
            )}
          </h2>
        )}
        {section}
        {showMap ? (
          <div
            className="mapModal"
            onClick={() => {
              this.hideMap();
            }}
          >
            <div className="map" />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Section;
