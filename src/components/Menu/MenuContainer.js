import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import HorizontalScrollNav from '../Common/HorizontalScrollNav';
import Filter from './Filter.js';
// eslint-disable-next-line
import LanguageSelect from './LanguageSelect.js';
import Menu from './Menu';
import { persistStore } from 'redux-persist'
import Footer from './Footer';
import Water from './Water';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import * as actions from './actions/actions.js';

class MenuContainer extends React.Component {
  constructor(props) {
    super(props)

    const paramArray = window.location.href.split('/');
    this.params = {
       requestedVenue: paramArray[3],
       item: paramArray.length === 5 ? paramArray[4] : false,
    }

    this.state = {update: false}
  }

 componentWillMount() {
   const { getMenuData, bffRes, venue } = this.props;
   console.log('mount')
   if (!bffRes || this.params.requestedVenue !== venue) {
     getMenuData(this.params.requestedVenue, this.params.item);
   }
 }

 componentWillUpdate() {
   const { getMenuData, bffRes, venue } = this.props;
   console.log('update')
   if (!bffRes || this.params.requestedVenue !== venue) {
     getMenuData(this.params.requestedVenue, this.params.item);
   }
 }

 componentWillUnmount() {
   persistStore(this.props).purge();
 }

 routeToItemDetail(e, id) {
   e.stopPropagation();
   window.location = window.location.href + `/${id}`
 }


  getHeader(){
    const {
      venue,
      sectionPositions,
      showBackArrow,
      showFilter,
      showLanguageSelect,
      filter,
      updateFilter,
      updateLang,
      lang,
      bffRes,
    } = this.props;
    const venueName = Object.values(bffRes)[0].fields.Venue;
    const itemView = this.params.item ? true : false;
    document.title = venueName + " Menu";

    return (
      <div>
        <header className="header">
          {/* back arrow for routing, control this and venuename via props */}
          { itemView ? <img style ={{background: 'black'}} src="/icons/arrow-left-solid-white.svg" className="headerBackArrow" alt="back arrow"/> : null }
          { !!venueName && !itemView? <h1 className="venue">{venueName}</h1> : null }
          { !itemView && <Filter filter={filter} updateFilter={updateFilter} /> }
            { !itemView ? <HorizontalScrollNav sectionPositions={sectionPositions}/> : ''}
          { !itemView && <LanguageSelect lang={lang} updateLang={updateLang} /> }
          {/* <img className="cartIcon" src="/icons/cart_icon.svg" alt="cart"/> */}
          {/* need check to see when to display cart badge */}
          {/* { hasCartItems && <div className="cartBadge"/> } */}
        </header>
      </div>
    );
  }

  render() {
    // eslint-disable-next-line
    const {
      venueName,
      sectionPositions,
      showBackArrow,
      showFilter,
      showLanguageSelect,
      filter,
      updateFilter,
      current,
      updateLang,
      lang,
      bffRes,
      isLoading,
      setSectionPosition,
      itemId,
    } = this.props;

    console.log(this.params.item)

    document.title = venueName + " Menu";

    return (
      isLoading ? <LoadingScreen/> : 
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
            <Water/>
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
  isLoading: state.persistentMenu.isLoading,
  venue: state.persistentMenu.venue,
  itemId: state.persistentMenu.item,
  sectionPositions: state.menu.sectionPositions,
  filter: state.persistentMenu.filter,
  lang: state.persistentMenu.lang,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
