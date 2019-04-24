import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import HorizontalScrollNav from '../Common/HorizontalScrollNav';
import Filter from './Filter.js';
import LanguageSelect from './LanguageSelect.js';
import Menu from './Menu';
// import { persistStore } from 'redux-persist'
import Footer from './Footer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import * as actions from './actions/actions.js';
import classNames from 'classnames'
import ReactGA from 'react-ga'

class MenuContainer extends React.Component {
  constructor(props) {
    super(props)

    const paramArray = window.location.href.split('/');
    this.params = {
       requestedVenue: paramArray[3],
       item: paramArray.length === 5 ? paramArray[4] === 'qr' || paramArray[4] === 'test' || paramArray[4] === 'menu' ? false : paramArray[4] : false,
    }

    if (paramArray[4] && (paramArray[4] === 'qr' || paramArray[4] === 'test')) {
      if (paramArray[4] === 'qr') {
        ReactGA.event({category: 'Page view', action: 'via QR code scan', label: paramArray[3], nonInteraction: true});
      } else if (paramArray[4] === 'menu') {
        ReactGA.event({category: 'Page view', action: 'via /menu URL', label: paramArray[3], nonInteraction: true});
      } else if (paramArray[4] === 'test') {
        console.log('%c テスティング. \nｔｅｓｔｉｎｇ.', 'color: #a1b5ff; font-size: 250%; font-family: monospace;');
        ReactGA.event({category: 'Page view', action: 'DEV :) // Test view', label: paramArray[3], nonInteraction: true});
      }
      window.history.replaceState({}, document.title, '/' + paramArray[3])
    }

    this.routeToItemDetail = this.routeToItemDetail.bind(this)
  }

 componentWillMount() {
   const { getMenuData, bffRes, venue, itemId, setItemId, clearSectionPositions } = this.props;
   if (!bffRes || this.params.requestedVenue !== venue) {
    document.title = "Mr Yum";
     getMenuData(this.params.requestedVenue, this.params.item);
     clearSectionPositions();
   }
   else{
    const venueName = Object.values(bffRes)[0].fields.Venue;
    document.title = venueName + " Menu";
   }
   if(this.params.item !== itemId){
     setItemId(this.params.item)
   }
 }

 componentWillUpdate() {
   const { getMenuData, bffRes, venue, itemId, setItemId, clearSectionPositions } = this.props;
   if (!bffRes || this.params.requestedVenue !== venue) {
     getMenuData(this.params.requestedVenue, this.params.item);
     clearSectionPositions();
   }
   if(this.params.item !== itemId){
     setItemId(this.params.item)
   }
 }


 // old alternating code - delete when fixed
 // componentDidUpdate() {
 //   let index = 0
 //   document.querySelectorAll('.menuItem').forEach(item => {
 //     if (item.classList.contains('water')) {
 //       return
 //     }
 //     if (index % 2 === 0) {
 //       if (!item.querySelector('.leftBox').classList.contains('itemPhoto')) {
 //         item.querySelector('.leftBox').className = 'rightBox'
 //         item.querySelector('.rightBox').className = 'leftBox'
 //       }
 //     } else {
 //       if (!item.querySelector('.rightBox').classList.contains('itemPhoto')) {
 //         item.querySelector('.leftBox').className = 'rightBox'
 //         item.querySelector('.rightBox').className = 'leftBox'
 //       }
 //     }
 //     index++
 //   })
 // }

 componentWillUnmount() {
   const { clearSectionPositions } = this.props;
   clearSectionPositions();
   window.scrollTo(0,0)
   //persistStore(this.props).purge();
 }

 routeToItemDetail(e, id, lang) {
   //const { setItemId } = this.props;
   const newId = id ? id : false;
   const refSuffix = newId ? `/${id}` : '';
   window.location = window.location.href + `${refSuffix}`
 }


  getHeader(){
    const {
      sectionPositions,
      filter,
      updateFilter,
      updateLang,
      lang,
      bffRes,
      itemId,
    } = this.props;
    const venueName = bffRes ? Object.values(bffRes)[0].fields.Venue : false;
    const itemView = itemId ? true : false;
    const filtersInUse = Object.values(filter).includes(true)

    return (
      <div>
        <header className={ classNames('header', itemView ? 'previewHeader' : '') }>
          {/* back arrow for routing, control this and venuename via props */}
          { itemView ? <img onClick={() => {window.history.back()}} src="/icons/arrow-left-solid-grey.svg" className="headerBackArrow" alt="back arrow"/> : null }
          { !!venueName && !itemView? <h1 className="venue">{venueName}</h1> : null }
          { !itemView && <Filter filter={filter} updateFilter={updateFilter} lang={lang} /> }
          { !itemView && !filtersInUse ? <HorizontalScrollNav sectionPositions={sectionPositions}/> : ''}
          { !itemView && <LanguageSelect lang={lang} updateLang={updateLang} /> }
          {/* <img className="cartIcon" src="/icons/cart_icon.svg" alt="cart"/> */}
          {/* need check to see when to display cart badge */}
          {/* { hasCartItems && <div className="cartBadge"/> } */}
        </header>
      </div>
    );
  }

  render() {
    const {
      filter,
      lang,
      bffRes,
      isLoading,
      setSectionPosition,
      itemId,
    } = this.props;

    // const tagsInUse = [];
    // Object.keys(filter).forEach(tag => {
    //   if (filter[tag]) {
    //     tagsInUse.push(tag);
    //   }
    // });
    //
    // let tags = item.fields['Tags Filtering']
    // if (tags) {
    //   tags.forEach((tag, index) => {
    //     if (tag === 'vegetarian') {
    //       tags[index] = 'V'
    //     }
    //     if (tag === 'vegan') {
    //       tags[index] = 'VE'
    //     }
    //     if (tag === 'gluten-free') {
    //       tags[index] = 'GF'
    //     }
    //   })
    // }
    //
    // console.log(bffRes);

    return (
      isLoading || !bffRes ? <LoadingScreen/> :
      (
        <div className="Menu">
          {this.getHeader()}
          <div className="menu">
            <Menu
              menuItemKeys={Object.keys(bffRes)}
              menuItems={bffRes}
              filter={filter}
              lang={lang}
              itemId={itemId}
              routeToItemDetail={this.routeToItemDetail}
              setSectionPosition={setSectionPosition}
            />
            <Footer/>
          </div>
        </div>
      )
    );
  }

};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const mapStateToProps = state => ({
  bffRes: state.persistentMenu.bffRes,
  isLoading: state.common.isLoading,
  venue: state.persistentMenu.venue,
  itemId: state.persistentMenu.item,
  sectionPositions: state.menu.sectionPositions,
  filter: state.persistentMenu.filter,
  lang: state.persistentMenu.lang,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
