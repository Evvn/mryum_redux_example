import { createRouteNodeSelector } from "redux-router5";
import { connect } from "react-redux";
import React from "react";
import LandingPageNav from "./LandingPageNav.js";
import LandingPageFooter from "./LandingPageFooter.js";
import SendEmail from "./SendEmail.js";

class LandingPageContact extends React.Component {
  render() {
    return (
      <div className="landingPage">
        <div className="hero contactHero">
          <LandingPageNav showHIW={false} />

          <div className="heroText">
            <span>Let's have a chat!</span>
            <span>
              We want to hear from you. Submit the form below and we'll be in
              touch soon.
            </span>
          </div>
        </div>

        <div className="emailForm">{<SendEmail />}</div>

        <LandingPageFooter saveEmail={this.props.saveEmail} />
      </div>
    );
  }
}

export default connect(createRouteNodeSelector("faq"))(LandingPageContact);
