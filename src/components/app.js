import React, { Component } from 'react';
import Main from './MainComponents/Main';

export default class App extends Component {
  render() {
    return (
      <div>
        <Main />
        {this.props.children}
      </div>
    );
  }
}
