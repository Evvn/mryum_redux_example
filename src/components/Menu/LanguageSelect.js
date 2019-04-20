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
      if (document.querySelector('.filterList').classList.contains('open')) {
        document.querySelector('.filterText').textContent = 'close'
      } else {
        document.querySelector('.filterText').textContent = 'filter'
      }
    }
  }

  printLanguages(languageList) {
    const { lang, updateLang } = this.props
    let languageButtons = []
    languageList.forEach(language => {
      let className = 'radioBtn'
      if (language.code === lang) {
        className = 'radioBtn radioSelected'
      }
      languageButtons.push(
        <p
          key={language.name}
          className="language"
          id={language.name}
          code={language.code}
          onClick={(e) => {updateLang(language.code)}}
        >
          <span className={className} code={language.code} />{language.name}
        </p>
      )
    })
    return languageButtons
  }

  render() {
    const { lang, } = this.props
    const languageList = [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'fr',
        name: 'Français',
      },
      {
        code: 'el',
        name: 'ελληνικά',
      },
      {
        code: 'zh-CN',
        name: '中文',
      },
      {
        code: 'es',
        name: 'Español',
      },
      {
        code: 'it',
        name: 'Italiano',
      },
    ]

    return(
      <div className="selectLanguage" onClick={this.langClick}>
        <span className="langCode">{lang}</span><div className="langArrow"></div>

        <div className="languageList">
          {this.printLanguages(languageList)}
        </div>
      </div>
    )
  }
}

export default Filter
