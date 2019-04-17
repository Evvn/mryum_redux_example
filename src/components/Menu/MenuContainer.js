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

    this.routeToItemDetail = this.routeToItemDetail.bind(this)
  }

 componentWillMount() {
   const { getMenuData, bffRes, venue, itemId, setItemId, clearSectionPositions } = this.props;
   if (!bffRes || this.params.requestedVenue !== venue) {
     getMenuData(this.params.requestedVenue, this.params.item);
     clearSectionPositions();
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

 componentWillUnmount() {
   const { clearSectionPositions } = this.props;
   clearSectionPositions();
   persistStore(this.props).purge();
 }

 routeToItemDetail(e, id) {
   //const { setItemId } = this.props;
   e.stopPropagation();
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
    const venueName = Object.values(bffRes)[0].fields.Venue;
    const itemView = itemId ? true : false;
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
      filter,
      lang,
      bffRes,
      isLoading,
      setSectionPosition,
      itemId,
    } = this.props;

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
