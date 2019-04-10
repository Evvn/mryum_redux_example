import React from 'react'

class Section extends React.Component {
  render() {
    let { name, itemIndex } = this.props
    let subSection = ""
    if (name.indexOf("%") !== -1) {
      subSection = name.substring((name.indexOf('%') + 1), name.length)
      name = name.substring(0, name.indexOf('%'))
    }

    return (
      <h2 className={`section ${ itemIndex === 0 ? 'sectionTaller' : '' }` } >{ name }<span className="subSection">{ subSection }</span></h2>
    )
  }
}

export default Section
