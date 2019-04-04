import React from 'react'

class MenuItem extends React.Component {
  render() {
    const { item, itemIndex } = this.props
    const style = {
      backgroundImage: 'url(' + item.fields['Image'][0].url + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div>
        { itemIndex % 2 === 0 ?
          <div className="menuItem">
            <div className="leftBox" style={style}></div>
            <div className="rightBox">
              <h3 className="title">{item.fields['Item Name']}</h3>
              <div className="bodyText">{item.fields['Item Description']}</div>
              <div className="info">
                <span className="price">{item.fields['Price']}</span>
                <span className="tags">{item.fields['Tags'].join(' ')}</span>
              </div>
            </div>
          </div>
          :
          <div className="menuItem">
            <div className="leftBox">
              <h3 className="title">{item.fields['Item Name']}</h3>
              <div className="bodyText">{item.fields['Item Description']}</div>
              <div className="info">
                <span className="price">{item.fields['Price']}</span>
                <span className="tags">{item.fields['Tags'].join(' ')}</span>
              </div>
            </div>
            <div className="rightBox" style={style}></div>
          </div>
        }
      </div>
    )
  }
}

export default MenuItem
