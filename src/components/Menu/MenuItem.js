import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

class MenuItem extends React.Component {

  itemDetails(item) {
    const clampedDesc = (
      <LinesEllipsis
        text={item['Item Description']}
        maxLine={3}
        ellipsis='...'
        basedOn='words'
        trimRight
      />
    )
    let trimmedName = item['Item Name']
    if (trimmedName.length > 30) {
      trimmedName = trimmedName.substring(0,31).trim() + '...'
    }

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
