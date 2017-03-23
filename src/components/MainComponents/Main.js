import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
  render() {
    return(
      <div>
        <div className="navbar">
          <Link to="/">
            <img src="./src/images/logo3.png" className="App-logo" alt="Personalities" />
          </Link>
        </div>
        <div className="homepage-navigation-wrapper">
          <ul className="nav nav-justified">
            <Link to="/test">
              <li>Start Test</li>
            </Link>
            <Link to="/types">
                <li>Types</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;
