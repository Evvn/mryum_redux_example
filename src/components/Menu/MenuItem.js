import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
// import JsxParser from 'react-jsx-parser'

class MenuItem extends React.Component {
  itemDetails(item) {
    const { lang } = this.props;
    let name = item.NAME[lang];
    let desc = item.DESCRIPTION[lang];
    let trimmedName;
    // let translatedName = 'name-' + lang
    // let translatedDesc = 'description-' + lang

    // if (lang !== 'en') {
    //   name = item[translatedName]
    //   desc = item[translatedDesc]
    // }

    if (name) {
      trimmedName = name;
      if (trimmedName.length > 30) {
        trimmedName = trimmedName.substring(0, 31).trim() + "...";
      }
    } else {
      trimmedName = "";
    }

    // <JsxParser
    //   jsx={
    //     `${desc}`
    //   }
    // />

    const clampedDesc = (
      <LinesEllipsis
        text={desc}
        maxLine={3}
        ellipsis="..."
        basedOn="words"
        trimRight
      />
    );

    return (
      <div>
        <h3 className="title">{trimmedName}</h3>
        <div className="bodyText">{clampedDesc}</div>
        <div className="info">
          <span className="price">{item.PRICE}</span>
          <span className="tags">
            {!!item.DIETARY_TAGS ? item.DIETARY_TAGS.join(" ") : null}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { item, onClick } = this.props;
    let img = item.IMAGE ? item.IMAGE.url : "/mryum_assets/missing_photo.jpg";
    const style = {
      backgroundImage: "url(" + img + ")",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    };

    return (
      <div className="menuItem" onClick={e => onClick(e)}>
        <div className="leftBox itemPhoto" style={style} />
        <div className="rightBox">{this.itemDetails(item)}</div>
      </div>
    );
  }
}

export default MenuItem;
