import React from 'react'

class Filter extends React.Component {

  render() {

    return(
      <div className="selectLanguage" onClick={ this.langClick }>
        <span className="langCode">en</span><div className="langArrow"></div>

        <div className="languageList">
          <p className="language" id="english" code="en" onClick={ this.props.setLang }>
            <span className="radioBtn radioSelected" code="en" />English
          </p>
          <p className="language" id="french" code="fr" onClick={ this.props.setLang }>
            <span className="radioBtn" code="fr" />Français
          </p>
          <p className="language" id="greek" code="el" onClick={ this.props.setLang }>
            <span className="radioBtn" code="el" />ελληνικά
          </p>
          <p className="language" id="chinese-simplified" code="zh-CN" onClick={ this.props.setLang }>
            <span className="radioBtn" code="zh-CN" />中文
          </p>
          <p className="language" id="spanish" code="es" onClick={ this.props.setLang }>
            <span className="radioBtn" code="es" />Español
          </p>
          <p className="language" id="italian" code="it" onClick={ this.props.setLang }>
            <span className="radioBtn" code="it" />Italiano
          </p>
        </div>
      </div>
    )
  }
}

export default Filter
