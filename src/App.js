import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./components/Common/actions/actions.js";
import { Route, Switch } from "react-router"; // react-router v4
import PropTypes from "prop-types";
import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Landing/Home.js";
import Contact from "./components/Landing/Contact.js";
import FAQ from "./components/Landing/FAQ.js";
import MenuContainer from "./components/Menu/MenuContainer.js";
import NotFound from "./components/NotFound/NotFound.js";
import Brunch from "./components/CategorySelection/Brunch.js";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.js";
import ReactGA from "react-ga";
// initialize Google Analytics
ReactGA.initialize("UA-129043240-1");
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends React.Component {
  // To do
  // componentWillMount() {
  //   const { getVenueNames, venueNames } = this.props;
  //   if (!venueNames) {
  //     getVenueNames();
  //   }
  // }

  componentWillUnmount() {
    localStorage.clear("persist:persistedStore");
  }

  render() {
    const {
      //router,
      //venueNames,
      isLoading
    } = this.props;
    // const path = router.location.pathname.split("/")[1].toLowerCase();
    // const showMenu = venueNames
    //   ? venueNames.includes(path)
    //     ? true
    //     : false
    //   : false;
    const showMenu = true;
    return isLoading ? (
      <LoadingScreen />
    ) : (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/brunch" component={Brunch} />
        <Route
          exact
          path="/:venue"
          component={showMenu ? MenuContainer : NotFound}
        />
        <Route
          exact
          path="/:venueUrl/:itemId"
          component={({ match }) => (
            <MenuContainer
              venueUrl={match.params.venueUrl}
              itemId={match.params.itemId}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

App.propTypes = {
  // I removed the .isRequired from the end of the last line, could cause problems? Fixes an error that was being thrown
  moduleMappings: PropTypes.objectOf(PropTypes.object)
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  router: state.router,
  venueNames: state.persistentCommon.venueNames,
  isLoading: state.common.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
