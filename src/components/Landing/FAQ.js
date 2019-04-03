import React from 'react'
import LandingPageNav from './LandingPageNav.js'
import LandingPageFooter from './LandingPageFooter.js'

class LandingPageFAQ extends React.Component {

  render() {
    return(
      <div className="landingPage">

        <div className="hero faqHero">

          <LandingPageNav showHIW={false} />

          <div className="heroText">
            <span>Got questions?</span>
            <span>Here's a list of questions we're frequently asked, with some helpful answers.</span>

          </div>

        </div>

        {/* sections toggled from hidden to shown when + is clicked, showing FAQ*/}
        <div className="faqSection">
          <span className="sectionTitle">You're a customer:</span>

          <div className="plus-minus-toggle collapsed 1" onClick={ this.props.toggleClass }></div>
          <div className="questionCont 1">
            <span onClick={ this.props.toggleClass } className="question 1">What is Mr Yum?</span>
            <span className="answer a1">We’re a little embarrassed that you’ve come to the FAQ section to find this out… Mr Yum is turning word-based menus into beautiful digital photo menus so you can see everything before ordering. Instead of trying to perv on the food at the table next to you, or play a matching game between Instagram and the menu, you’ll have everything in one place.<br/><br/>Actually, please <p className="contactLink" onClick={ this.props.handleClick }>reach out</p> because we clearly didn’t nail the homepage!</span>
          </div>

          <div className="plus-minus-toggle collapsed 2" onClick={ this.props.toggleClass }></div>
          <div className="questionCont 2">
            <span onClick={ this.props.toggleClass } className="question 2">Which cafes and restaurants are you at?</span>
            <span className="answer a2">
              We have recently launched at a few epic cafes and restaurants in Collingwood & Fitzroy. We’re keeping it local for now so we can stay close to owners and customers, take on their feedback, and build an amazing product!
              <br/><br/>
              With your love, we’ll get to all of Melbourne in no time so feel free to vote for your favourite cafes/restaurants and we’ll do our best to make it happen! <a href="https://pitchblak.typeform.com/to/QFwNgg">Click here to nominate a venue for Mr Yum.</a>
            </span>
          </div>

          <div className="plus-minus-toggle collapsed 3" onClick={ this.props.toggleClass }></div>
          <div className="questionCont 3">
            <span onClick={ this.props.toggleClass } className="question 3">How do I check out these menus?</span>
            <span className="answer a3">
              When you go into a venue that has Mr Yum. You’ll find a link and QR code on the paper menus and often, on their Google listing too.
              <br/><br/>
              We will bring out search when the time is right.
            </span>
          </div>

          <div className="plus-minus-toggle collapsed 4" onClick={ this.props.toggleClass }></div>
          <div className="questionCont 4">
            <span onClick={ this.props.toggleClass } className="question 4">How can I nominate my favorite places?</span>
            <span className="answer a4">
              Suggest a cafe, restaurant or bar you’d love to see on Mr Yum <a href="https://pitchblak.typeform.com/to/QFwNgg">here</a>.
            </span>
          </div>

        </div>

        <div className="faqSection">
          <span className="sectionTitle">You're a restaurant manager:</span>

          <div className="plus-minus-toggle collapsed 5" onClick={ this.props.toggleClass }></div>
          <div className="questionCont 5">
            <span onClick={ this.props.toggleClass } className="question 5">What does Mr Yum cost?</span>
            <span className="answer a5">
              It’s free for both customers and venues. We will take photos, redesign and print your menus at no cost.
              <br/><br/>
              For a new startup like Mr Yum, it is most important that we get the most incredible venues onboard and people are loving it. The added friction of $29/month isn’t worth it. There’s no catch.
              <br/><br/>
              This means we have to be selective about the venues we bring on so, please apply <a href="https://pitchblak.typeform.com/to/RpSea1">here</a>.
                </span>
              </div>

          <div className="plus-minus-toggle collapsed 6" onClick={ this.props.toggleClass }></div>
          <div className="questionCont 6">
            <span onClick={ this.props.toggleClass } className="question 6">How do I get my cafe or restaurant on Mr Yum?</span>
            <span className="answer a6">Thanks for your interest! Please apply <a href="https://pitchblak.typeform.com/to/RpSea1">here</a>.</span>
          </div>

        </div>

        <LandingPageFooter handleClick={this.props.handleClick} saveEmail={ this.props.saveEmail } />

      </div>
    )
  }
}

export default LandingPageFAQ
