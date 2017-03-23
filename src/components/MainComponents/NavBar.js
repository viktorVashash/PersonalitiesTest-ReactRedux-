import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NavBar extends Component{
  render() {
    return(
      <ReactCSSTransitionGroup
        className="col-md-12"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div className="welcome-top row">
          <div className="col-sm-12 col-md-6">
            <img src="./src/images/mask.png" />
          </div>
          <div className="col-sm-12 col-md-6 text-wrapper">
            <h1>Uncover Your Potential</h1>
            <p>Scientifically validated, user-friendly personality tests online</p>
            <p className="small">Take professionally developed, scientifically validated personality and career assessments online. Get deep, personal insights to help you choose the right career, improve your relationships, and develop to your fullest potential.</p>
            <Link to="/test" className="btn btn-default">Start Test</Link>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default NavBar;
