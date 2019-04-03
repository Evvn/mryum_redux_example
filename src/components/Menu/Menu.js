// Menu component - main dude,  gets called in App.js with url path to select correct venue in airtable
import { connect } from 'react-redux'
import React, {Component} from 'react';
import './App.css';
import Header from './Header.js'
import Section from './Section.js'
import MenuItem from './MenuItem.js'
import MenuList from './MenuList.js'
import Footer from './Footer.js'
import NotFound from './NotFound.js'
import Airtable from 'airtable'
import ReactGA from 'react-ga'
import Modal from './Modal.js'

// sneaky airtable api key in hidden environment variable
let API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY
Airtable.configure({apiKey: API_KEY, endpointUrl: 'https://api.airtable.com'})

class Menu extends Component {
  constructor(props) {
    super(props);
    const { isTest } = this.props;

    // sets url type based on props, /test, /qr, /broadsheet etc
    this.venueurl = 'holla';

    // if (this.props.urlType === 'test') {
    //   isTest = true
    // } else if (this.props.urlType === 'qr') {
    //   isQR = true
    // } else if (this.props.urlType === 'menu') {
    //   isMenuURL = true
    // } else if (this.props.urlType === 'broadsheet') {
    //   isBroadsheet = true
    // }

    // Google analytics events - dev, qr scan, direct url etc
    // if (isTest) {
    //   ReactGA.event({category: 'Page view', action: 'DEV :) // Test view', label: venueurl, nonInteraction: true});
    // }
    //
    // if (isQR) {
    //   ReactGA.event({category: 'Page view', action: 'via QR code scan', label: venueurl, nonInteraction: true});
    // }
    //
    // if (isMenuURL) {
    //   ReactGA.event({category: 'Page view', action: 'via /menu URL', label: venueurl, nonInteraction: true});
    // }
    //
    // if (!isTest & !isQR  & !isMenuURL) {
    //   ReactGA.event({category: 'Page view', action: 'via direct link/url', label: venueurl, nonInteraction: true});
    // }
    //
    // // my testing console text :)
    if (isTest) {
      console.log('%c テスティング. \nｔｅｓｔｉｎｇ.', 'color: #a1b5ff; font-size: 250%; font-family: monospace;');
    }

  }

  // create dictionary to use in other components
  // pulls all non-blank records from 'Words to Search' table in Airtable
  dictionary = () => {
    let self = this
    // select all words in WTS table that have definitions
    let wordsToSearchObjs = []
    let wordsToSearch = Airtable.base('appHNmzsbpQLZtgte')

    wordsToSearch('Words to Search').select({
      view: "Grid view",
    }).eachPage(function page(records, fetchNextPage) {

      records.forEach(function(record) {
        let firstRecord = record
        // if record has no definition, find it and save it
        // this searches Culinary Dictionary for a match and updates the WtS definition
        if (record.get('Definition') === undefined) {
          wordsToSearch('Culinary Dictionary').select({
            view: "Grid view",
            filterByFormula: `(Word = "${ record.get('Word') }") = 1`
            // select only record with matching name
          }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function(record) {
              // set the definition here
              let culDef = record.get('Definition')
              // update record here
              wordsToSearch('Words to Search').update(firstRecord.get('record id'), {
                "Definition": culDef
              }, function(err, record) {
                  if (err) { console.error(err); return; }
                  console.log(record.fields);
              });
            })

            fetchNextPage()

          }, function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
        // push 'record' to words to search objs array
        wordsToSearchObjs.push(firstRecord.fields);
      })

      fetchNextPage()

    }, function done(err) {
      if (err) {
        console.error(err);
        return;
      }

      // call definitions function
      self.definitions()
    });
    return wordsToSearchObjs
  }

  // on component mount
  componentWillMount() {
    let self = this
    let venueurl = this.venueurl.slice()
    // append venue url to mr yum address, to search airtable
    this.venueurl = 'http://mryum.com.au/' + venueurl
    let venueName = ''
    let viewType = 'link/url'
    let menuLink = ''
    let broadsheetLink = ''
    let showBroadsheetLink = false
    let showMenuLink = false

    // set visit type
    if (self.state.isTest) {
      viewType = 'test'
    }
    if (self.state.isQR) {
      viewType = 'QR'
    }

    let base = Airtable.base('apptSqpNwahy0x0YK');
    // api call to venues table, search by url to get correct venue name
    // plan to use venue name to populate menu -> YAY -> it works
    base('Venues').select({view: "Grid view", filterByFormula: `SEARCH("${venueurl}", URL) >= 0`}).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      // CHECK RECORD IN API CALL HOLY SHIT IT GETS THE NAME USING THE URL TO VALIDATE OMGGGGGGGG
      // ^ as you can see I was very excited when this worked correctly ^
      records.forEach(function(record) {
        if (venueurl === record.get('URL')) {

          let visits = record.get('visits') + 1
          let qrScans = record.get('qr scans') + 1

          broadsheetLink = record.get('Broadsheet Link')
          if (broadsheetLink !== undefined) {
            showBroadsheetLink = true
          }

          if (record.get('pdf-link') !== undefined) {
            menuLink = record.get('pdf-link')
            showMenuLink = true
          }

          if (!self.state.isTest) {
            if (!self.state.isQR) {
              // log visit to venues base
              base('Logs').update(record.get('record_id'), {
                "visits": visits
              }, function(err, record) {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            }
          }

          if (self.state.isQR) {
            // log qr scan to venues base
            base('Logs').update(record.get('record_id'), {
              "qr scans": qrScans
            }, function(err, record) {
              if (err) {
                console.error(err);
                return;
              }
            });
          }

          venueName = record.get('Name')
        }
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, function done(err) {
      if (err) {
        console.error(err);
        return;
      }

      // search 'Database' table for records wheree venue name matches venue name from url
      let db = []
      base('Database').select({
        view: "Grid view",
        filterByFormula: `SEARCH("${venueName}", Venue) = 1`
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        // create menu item objects from each matching record
        records.forEach(function(record) {
          if (record.get('Venue') === venueName) {
            let item = {
              name: record.get('Item Name'),
              namefr: record.get('name-fr'),
              nameel: record.get('name-el'),
              namezhcn: record.get('name-zh-CN'),
              namees: record.get('name-es'),
              nameit: record.get('name-it'),
              price: record.get('Price'),
              tags: record.get('Tags'),
              filters: record.get('Tags Filtering'),
              image: record.get('Image'),
              description: record.get('Item Description'),
              descriptionfr: record.get('description-fr'),
              descriptionel: record.get('description-el'),
              descriptionzhcn: record.get('description-zh-CN'),
              descriptiones: record.get('description-es'),
              descriptionit: record.get('description-it'),
              imageCredit: record.get('image credit'),
              sections: record.get('Sections')
            }
            // push item to db arr
            db.push(item)
          }
        })

        fetchNextPage()

      }, function done(err) {
        if (err) {
          console.error(err);
          return;
        }

        // builds each menu section with array to hold items
        let sections = []
        let newSections = []

        // push every section from the menu in to array
        db.forEach(function(record) {
          sections.push(record.sections)
        })

        // create an array of section objects to store items in
        sections = [...new Set(sections)]
        sections.forEach(function(section) {
          let newSection = {
            name: section,
            items: []
          }
          newSections.push(newSection)
        })

        //  builds each menu item object and push to section array
        let itemId = 0
        db.forEach(function(record) {

          // sanitize input for storage

          // NEED TO CLEAN ALL RECORDS TO HANDLE UNDEFINED FIELDS
          // if it's undefined, things break - set undefined things to ''
          let name = record.name
          if (name === undefined) {
            name = ''
          }

          let namefr = record.namefr
          if (namefr === undefined) {
            namefr = ''
          }

          let nameel = record.nameel
          if (nameel === undefined) {
            nameel = ''
          }

          let namezhcn = record.namezhcn
          if (namezhcn === undefined) {
            namezhcn = ''
          }

          let namees = record.namees
          if (namees === undefined) {
            namees = ''
          }

          let nameit = record.nameit
          if (nameit === undefined) {
            nameit = ''
          }

          let price = record.price
          if (price === undefined) {
            price = ''
          }

          let tags = record.tags
          if (tags !== undefined) {
            tags = tags.join(', ')
          }

          let filters = record.filters
          if (filters !== undefined) {
            filters = filters.join(', ')
          }

          let image = record.image
          if (image === undefined) {
            image = "/missing_photo.jpg"
          } else {
            image = image[0].thumbnails.large.url
          }

          let description = record.description
          if (description === undefined) {
            description = ''
          }

          let descriptionfr = record.descriptionfr
          if (descriptionfr === undefined) {
            descriptionfr = ''
          }

          let descriptionel = record.descriptionel
          if (descriptionel === undefined) {
            descriptionel = ''
          }

          let descriptionzhcn = record.descriptionzhcn
          if (descriptionzhcn === undefined) {
            descriptionzhcn = ''
          }

          let descriptiones = record.descriptiones
          if (descriptiones === undefined) {
            descriptiones = ''
          }

          let descriptionit = record.descriptionit
          if (descriptionit === undefined) {
            descriptionit = ''
          }

          let imageCredit = record.imageCredit
          if (imageCredit === undefined) {
            imageCredit = ''
          }

          let item = {
            id: itemId,
            name: name,
            namefr: namefr,
            nameel: nameel,
            namezhcn: namezhcn,
            namees: namees,
            nameit: nameit,
            price: price,
            tags: tags,
            filters: filters,
            image: image,
            description: description,
            descriptionfr: descriptionfr,
            descriptionel: descriptionel,
            descriptionzhcn: descriptionzhcn,
            descriptiones: descriptiones,
            descriptionit: descriptionit,
            imageCredit: imageCredit
          }

          itemId += 1

          newSections.forEach(function(section) {
            if (section.name === record.sections) {
              section.items.push(item)
            }
          })
        })

        // SET IT ALLLLLLLL HERE
        // set sections as state var to be passed to each component, and update all other vars to current values
        self.setState(prevState => ({isLoading: false, sections: newSections, venue: venueName, dictionary: self.dictionary(), showMenuLink: showMenuLink, showBroadsheetLink: showBroadsheetLink, menuLink: menuLink, broadsheetLink: broadsheetLink }), () => {
          // add 'Menu' to the end of the doc title - shows in tab name
          document.title = venueName + " Menu"
        })

      });

    });

    // log view and view type
    base('visit logs').create({
      "timestamp": new Date().toISOString(),
      "venue": this.state.venueurl,
      "view type": viewType
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  // same definitions function as in PreviewItem.js, replaces all defined words from
  // dictionary with the word wrapped in a span tag containing a data attribute with
  // the words' definition. Each span is then given a click event listener that displays
  // a modal with the word and definition on click, and clicking out of the modal closes
  // it and sets the values back to blank.
  definitions() {
    let dictionary = this.state.dictionary

    document.querySelectorAll('.LinesEllipsis').forEach(desc => {
      let description = desc.innerHTML.slice(0)

      if (this.state.lang !== 'en') {
        return
      }
      dictionary.forEach((def) => {
        if (def['Word'] !== undefined) {
          let pattern = new RegExp("\\b"+def['Word']+"\\b", 'gi');
          description = description.replace(pattern, "<span class='define'>" + def['Word'] + "</span>")
          if (desc !== null) {
            desc.innerHTML = description
          }
        }
      })

      let wordsDefined = document.querySelectorAll('.define')
      Array.from(wordsDefined).forEach(element => {
        element.addEventListener('click', (e) => {
          document.querySelector('.definedWord').textContent = e.target.textContent
          document.querySelector('.definitionText').textContent = e.target.getAttribute('data')
          document.querySelector('.definition').classList.remove('hidden')
          document.querySelector('.definition').classList.add('open')
          document.querySelector('.definition').classList.remove('fadeOut')
          document.querySelector('.menu').classList.remove('slideInLeft')
          document.querySelector('.menu').classList.remove('slideOutLeft')
          document.querySelector('.definition').addEventListener('click', this.closeDefinition)
        })
      })

      dictionary.forEach((def) => {
        Array.from(wordsDefined).forEach(element => {
          if (def['Word'] === element.textContent) {
            element.setAttribute('data', def['Definition'])
          }
        })
      })
    })
  }

  // function to handle closing the definition modal
  closeDefinition() {
    document.querySelector('.definition').classList.add('fadeOut')
    setTimeout(function(){
      document.querySelector('.definedWord').textContent = ""
      document.querySelector('.definitionText').textContent = ""
      document.querySelector('.definition').classList.add('hidden')
      document.querySelector('.definition').removeEventListener('click', () => {})
    }, 300);
  }

  // sets menu language when lang is clicked in drop down
  // also handles when radio button is clicked vs text, does same thing
  setLang = (e) => {
    document.querySelector('.radioSelected').classList.remove('radioSelected')
    if (!e.target.classList.contains('radioBtn')) {
      e.target.firstChild.classList.add('radioSelected')
    } else {
      e.target.classList.add('radioSelected')
    }
    // sets language code for header (custom code for zh-CN)
    let newCode = e.target.getAttribute('code')
    if (newCode === 'zh-CN') {
      newCode = 'CN'
    }

    // sets lang code and closes lang menu
    document.querySelector('.langCode').textContent = newCode
    document.querySelector('.languageList').classList.remove('langOpen')
    document.querySelector('.langArrow').classList.remove('rotate')

    // google analytics event
    ReactGA.event({category: 'Translation', action: e.target.getAttribute('code'), label: this.statevenueurl, nonInteraction: false});

    // set modals and broadsheet link to false, only shows in english
    let showModal = false
    let showBroadsheetLink = false
    if (e.target.getAttribute('code') !== 'en') {
      showModal = true
      showBroadsheetLink = false
    }

    this.setState({
      lang: e.target.getAttribute('code'),
      showModal: showModal,
      showBroadsheetLink: showBroadsheetLink
    },() => {
      document.querySelector('.menu').classList.remove('slideOutLeft')
    })
  }

  // function to render menu
  printMenu() {
    let sections = this.state.sections.slice()
    let menu = []
    let list = []

    // iterate over each section
    for (let s = 0; s < sections.length; s++) {
      // push Section components in to menu array
      menu.push(
        <Section name={sections[s].name} id={"sa" + s} key={s} showBroadsheetLink={this.state.showBroadsheetLink} lang={this.state.lang} venueName={ this.state.venue } broadsheetLink={ this.state.broadsheetLink }/>
      )
      // iterate over each sections "items" arr
      for (let i = 0; i < sections[s].items.length; i++) {

        // push each item that is of 'LIST' type in to list arr
        if (sections[s].items[i].tags === "LIST") {
          list.push(
            {
              testing: this.state.isTest,
              venue: this.state.venue,
              id: sections[s].items[i].id,
              name: sections[s].items[i].name,
              namefr: sections[s].items[i].namefr,
              nameel: sections[s].items[i].nameel,
              namezhcn: sections[s].items[i].namezhcn,
              namees: sections[s].items[i].namees,
              nameit: sections[s].items[i].name,
              price: sections[s].items[i].price,
              tags: sections[s].items[i].tags,
              filters: sections[s].items[i].filters,
              image: sections[s].items[i].image,
              imageSmall: sections[s].items[i].imageSmall,
              imageCredit: sections[s].items[i].imageCredit,
              description: sections[s].items[i].description,
              descriptionfr: sections[s].items[i].descriptionfr,
              descriptionel: sections[s].items[i].descriptionel,
              descriptionzhcn: sections[s].items[i].descriptionzhcn,
              descriptiones: sections[s].items[i].descriptiones,
              descriptionit: sections[s].items[i].description,
              dictionary: this.state.dictionary,
              key: sections[s].items[i].id + sections.length
            }
          )
        } else {
          // creates a menu item component (that is not a list item) to push in to menu arr
          menu.push(
            <MenuItem
              testing={this.state.isTest}
              venue={this.state.venue}
              id={sections[s].items[i].id}
              name={sections[s].items[i].name}
              namefr={sections[s].items[i].namefr}
              nameel={sections[s].items[i].nameel}
              namezhcn={sections[s].items[i].namezhcn}
              namees={sections[s].items[i].namees}
              nameit={sections[s].items[i].nameit}
              price={sections[s].items[i].price}
              tags={sections[s].items[i].tags}
              filters={sections[s].items[i].filters}
              image={sections[s].items[i].image}
              imageSmall={sections[s].items[i].imageSmall}
              imageCredit={sections[s].items[i].imageCredit}
              description={sections[s].items[i].description}
              descriptionfr={sections[s].items[i].descriptionfr}
              descriptionel={sections[s].items[i].descriptionel}
              descriptionzhcn={sections[s].items[i].descriptionzhcn}
              descriptiones={sections[s].items[i].descriptiones}
              descriptionit={sections[s].items[i].descriptionit}
              dictionary={this.state.dictionary}
              key={sections[s].items[i].id + sections.length}
              lang={this.state.lang}
            />
          )
        }
      }
      // if the list array is not empty, create lists of menu list items
      if (list.length !== 0) {
        menu.push(<MenuList lang={this.state.lang} listItems={list} key={`l${s}`}/>)
        list = []
      }
    }
    // return menu array
    return menu
  }

  // handles modal click - once it has been clicked, set show modal to false
  modalClick = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    let venue = this.state.venue
    let sections = this.state.sections
    let isLoading = this.state.isLoading
    let showModal = this.state.showModal
    let menuClass = 'menu'
    // set menu class name here - leaves room in footer for pdf menu link if needed
    if (this.state.showMenuLink) {
      menuClass = 'menu pdfLinkSpace'
    }

    // if the state is loading (waiting for airtable api call to finish)
    // show loading screen with spinner
    // if /broadsheet link, show black-labeled loading page
    if (isLoading) {
      if (this.state.isBroadsheet) {
        return (<div className="loading broadsheetLoading">
          <img src="/broadsheet_inverted.png" alt="Mr Yum"/>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
          <span>Powered by</span>
          <img src="/Mr_Yum_logo_white.svg" alt="Mr Yum" className="poweredBy"/>
        </div>)
      } else {
        return (<div className="loading">
          <img src="/Mr_Yum_logo_white.svg" alt="Mr Yum"/>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>)
      }
    } else if (sections.length === 0) {
      // if menu is empty, return page not found component
      return (<NotFound/>)
    } else {
      // render menu here
      return (<div className="Menu">

        {/* Header componen with language props, venue name, and sections for nav */}
        <Header isTest={this.state.isTest} lang={this.state.lang} name={venue} venueurl={this.state.venueurl} sections={sections} setLang={ this.setLang }/>

        <div className={ menuClass }>

          {/* function to print menu */}
          {this.printMenu()}

          {/* hidden modal for definition of words - shown on defined word clicks */}
          <div className="definition hidden">
            <div className="definedWord"></div>
            <div className="definitionText"></div>
          </div>

          {/* Cheeky menu item hidden that is shown if filters are selected and no menu items match */}
          <div className="menuItem water tiny" filters="filters undefined" id="999">
            <div className="leftBox" id="999" style={{
              backgroundImage: "url('/water.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}></div>

            <div className="rightBox" id="999">
              <h3 className="title" id="999">Water (sorry)</h3>
              <p className="bodyText" id="999">It looks like there's nothing on the menu for you! Jokes. Chat to the staff and they’ll be able to help. <span role="img" aria-label="smile" style={{lineHeight: 0}}>🙂</span></p>
              <div className="info" id="999">
                <span className="price" id="999">Free</span>
                <span className="tags" id="999"></span>
              </div>
            </div>
          </div>

          {/* Show menu when language is changed */}
          { showModal ? <Modal lang={this.state.lang} onClick={ this.modalClick }/> : null}

          <Footer venue={venue} showMenuLink={this.state.showMenuLink} menuLink={this.state.menuLink}/>

        </div>

      </div>);
    }
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  router: state.router,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
