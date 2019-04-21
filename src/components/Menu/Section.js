import React from 'react'
import ReactDOM from 'react-dom';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import MenuInfo from './MenuInfo';

class Section extends React.Component {

  componentDidMount(){
    const { name, setSectionPosition } = this.props;
    const position = ReactDOM
      .findDOMNode(this).offsetTop;
    setSectionPosition(name.split('%')[0], position);
  }

  

  processItem(item, index){
    const {
      tagsInUse,
      routeToItemDetail,
      lang,
    } = this.props;
    const tags = item.fields.Tags;

    // If menu item tags match any tags in filter
    if ((tagsInUse.length > 0 && tagsInUse.some(tag => tags.includes(tag)))
      || tagsInUse.length === 0) {
        return (
          <MenuItem
            key={item.id}
            item={item.fields}
            itemIndex={index}
            lang={lang}
            onClick={(e) => {routeToItemDetail(e, item.id, lang)}}
          />
        );
      }

    return '';
  }

  getList(item, index){
    const { routeToItemDetail } = this.props;
    return (
      <MenuList
        key={item.id}
        // disable menu list item click until ordering
        onClick={(e) => {routeToItemDetail(e, item.id)}}
        item={item.fields}
        itemIndex={index}
      />
    );
  }

  getSection(){
    const {
      menuSection,
      lang,
      routeToItemDetail,
      tagsInUse,
    } = this.props;

    let infoList = [];
    let updatedIndex = -1;

    let section = menuSection.map((item, index) => {
      const hasTag = item.fields.Tags ? true : false;
      const tags = item.fields.Tags;
      const menuItemTemplate = (
        <MenuItem
          key={item.id}
          item={item.fields}
          itemIndex={index}
          lang={lang}
          onClick={(e) => {routeToItemDetail(e, item.id, lang)}}
        />
      );

      if (item.fields.itemType === 'info') {
        infoList.push(item.fields)
        // eslint-disable-next-line
        return
      }

      return hasTag ? tags[0] !== 'LIST' ? this.processItem(item, index) : this.getList(item, index) : menuItemTemplate
    });

    if (tagsInUse.length === 0) {
      // TODO: find a better unique key for this lol (lazy ass)
      section.push(<MenuInfo key={Math.random(999)} infoList={infoList} />)
    }

    section = section.map(item => {
      if (item && item !== '' && item.type.name === 'MenuItem') {
        updatedIndex ++
        return (
          <MenuItem
            key={item.key}
            item={item.props.item}
            itemIndex={updatedIndex}
            lang={lang}
            onClick={(e) => {routeToItemDetail(e, item.id, lang)}}
          />
        )
      } else {
        return item
      }
    })

    return section
  }

  render() {
    let { name, index, tagsInUse } = this.props
    let subSection = ""
    if (name.indexOf("%") !== -1) {
      subSection = name.substring((name.indexOf('%') + 1), name.length)
      name = name.substring(0, name.indexOf('%'))
    }
    if (tagsInUse.length > 0) {
      tagsInUse = tagsInUse.join(', ')
      name = tagsInUse
      .replace(new RegExp("\\bV\\b"), 'Vegetarian')
      .replace(new RegExp("\\bVE\\b"), 'Vegan')
      .replace(new RegExp("\\bGF\\b"), 'Gluten Free')
    };

    let section = this.getSection()

    if (section.slice(-1)[0] === undefined) {
      return <div></div>
    } else {
      return (
        <div>
          <h2 className={`section ${ index === 0 && tagsInUse.length === 0 ? 'sectionTaller' : '' }` } >{ name }<span className="subSection">{ subSection }</span></h2>
          { section }
        </div>

      )
    }
  }
}

export default Section
