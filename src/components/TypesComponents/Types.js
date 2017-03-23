import React, { Component } from 'react';
import { selectType } from '../../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Types extends Component {
  renderTypes() {
    return this.props.types.map((type) => {
      return(
        <div
          key={type.id}
          onClick={() => this.props.selectType(type)}
          className="col-md-3 type-item">
          <Link to={'/type/:' + type.id}>
            <img
              className={`${ type.id === 1 || type.id === 3 || type.id === 12 ? 'extrawide-illustration' : '' }`}
              src={type.img}
            />
            <h4>{type.title}</h4>
          </Link>
        </div>
      );
    })
  }

  render() {
    return(
      <ReactCSSTransitionGroup
       className="col-md-12 typeDiv"
       component="div"
       transitionName="fade"
       transitionEnterTimeout={800}
       transitionLeaveTimeout={500}
       transitionAppear
       transitionAppearTimeout={500}
      >
        <div className="types-list-header">
          <h1>Types:</h1>
        </div>
        <div className="type-chart">
          {this.renderTypes()}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
};

function mapStateToProps(state) {
  return {
    types: state.types
  };
};

export default connect(mapStateToProps, { selectType })(Types);
