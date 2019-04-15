import React from 'react'

class Filter extends React.Component {

  // on language section click
  langClick(e) {
    // toggle 'open' classes
    document.querySelector('.langArrow').classList.toggle('rotate')
    document.querySelector('.languageList').classList.toggle('langOpen')

    // close filter if it's open
    if (document.querySelector('.filterList') !== null) {
      document.querySelector('.filterList').classList.remove('open')
      document.querySelector('.hamburger').classList.remove('is-active')
    }
  }

  render() {
    const { updateLang, } = this.props

    return(
      <div className="selectLanguage" onClick={this.langClick}>
        <span className="langCode">en</span><div className="langArrow"></div>

        <div className="languageList">
          <p className="language" id="english" code="en" onClick={(e) => {updateLang(e.target.getAttribute('code'))}}>
            <span className="radioBtn radioSelected" code="en" />English
          </p>
          <p className="language" id="french" code="fr" onClick={(e) => {updateLang(e.target.getAttribute('code'))}}>
            <span className="radioBtn" code="fr" />Français
          </p>
          <p className="language" id="greek" code="el" onClick={(e) => {updateLang(e.target.getAttribute('code'))}}>
            <span className="radioBtn" code="el" />ελληνικά
          </p>
          <p className="language" id="chinese-simplified" code="zh-CN" onClick={(e) => {updateLang(e.target.getAttribute('code'))}}>
            <span className="radioBtn" code="zh-CN" />中文
          </p>
          <p className="language" id="spanish" code="es" onClick={(e) => {updateLang(e.target.getAttribute('code'))}}>
            <span className="radioBtn" code="es" />Español
          </p>
          <p className="language" id="italian" code="it" onClick={(e) => {updateLang(e.target.getAttribute('code'))}}>
            <span className="radioBtn" code="it" />Italiano
          </p>
        </div>
      </div>
    )
  }
}

export default Filter
