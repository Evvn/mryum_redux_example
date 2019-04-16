import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

class MenuItem extends React.Component {

  itemDetails(item) {
    const { lang } = this.props
    let name = item['Item Name']
    let desc = item['Item Description Raw']
    let translatedName = 'description-' + lang
    let translatedDesc = 'name-' + lang

    if (lang !== 'en') {
      name = item[translatedName]
      desc = item[translatedDesc]
    }

    let trimmedName = name
    if (trimmedName.length > 30) {
      trimmedName = trimmedName.substring(0,31).trim() + '...'
    }

    const clampedDesc = (
      <LinesEllipsis
        text={desc}
        maxLine={3}
        ellipsis='...'
        basedOn='words'
        trimRight
      />
    )

    return (
      <div>
        <h3 className="title">{trimmedName}</h3>
        <div className="bodyText">{clampedDesc}</div>
        <div className="info">
          <span className="price">{item['Price']}</span>
          <span className="tags">{ !!item.Tags ? item.Tags.join(' ') : null }</span>
        </div>
      </div>
    )
  }

  render() {
    const { item, itemIndex, onClick } = this.props;
    const style = {
      backgroundImage: 'url(' + item['Image'][0].url + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div onClick={(e) => onClick(e)}>
        { itemIndex % 2 === 0 ?
          <div className="menuItem">
            <div className="leftBox" style={style}></div>
            <div className="rightBox">
              { this.itemDetails(item) }
            </div>
          </div>
          :
          <div className="menuItem">
            <div className="leftBox">
              { this.itemDetails(item) }
            </div>
            <div className="rightBox" style={style}></div>
          </div>
        }
      </div>
    )
  }
}

export default MenuItem
