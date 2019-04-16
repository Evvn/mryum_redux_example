import React from 'react'
import ReactDOM from 'react-dom';
import MenuItem from './MenuItem';
import MenuList from './MenuList';

class Section extends React.Component {

  componentDidMount(){
    const { name, setSectionPosition } = this.props;
    const position = ReactDOM
      .findDOMNode(this)
      .getBoundingClientRect();
    setSectionPosition(name, position);
  }

  processItem(item, index){
    const {
      tagsInUse,
      routeToItemDetail,
      menuSection,
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
        onClick={(e) => {
            routeToItemDetail(e, item.id)
          }}
        item={item.fields}
        itemIndex={index}
      />
    );
  }

  getSection(){
    const {
      tagsInUse,
      routeToItemDetail,
      menuSection,
      lang,
    } = this.props;

    return menuSection.map((item, index) => {
      const hasTag = item.fields.Tags ? true : false;
      const tags = item.fields.Tags;
      const menuItemTemplate = (
        <MenuItem
          key={item.id}
          item={item.fields}
          itemIndex={index}
          lang={lang}
          onClick={(e) => {this.routeToItemDetails(e, item.id, lang)}}
        />
      );

      return hasTag ? tags[0] !== 'LIST' ? this.processItem(item, index) : this.getList(item, index) : menuItemTemplate
    });
  }

  render() {


    // key={menuSections[section].fields['Sections']}
    // name={menuSections[section].fields['Sections']}
    let { name, index } = this.props
    let subSection = ""
    if (name.indexOf("%") !== -1) {
      subSection = name.substring((name.indexOf('%') + 1), name.length)
      name = name.substring(0, name.indexOf('%'))
    }

    return (
      <div>
        <h2 className={`section ${ index === 0 ? 'sectionTaller' : '' }` } >{ name }<span className="subSection">{ subSection }</span></h2>
        {this.getSection()}
      </div>
      
    )
  }
}

export default Section
