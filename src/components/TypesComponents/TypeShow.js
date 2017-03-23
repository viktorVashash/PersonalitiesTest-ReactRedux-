import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TypeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type
    }
  }

  renderDescriptions() {
    return this.props.type.descriptions.map((description) => {
      return(
        <div key={description.title} className="type-detail-header">
          <h2>{description.title}</h2>
          <p>{description.detail}</p>
        </div>
      );
    });
  }

  render() {
      if(!this.props.type) {
        return(
          <div>Loading...</div>
        );
      }

      return (
        <ReactCSSTransitionGroup
        className="type-show"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
        >
          <div className="type-header-wrapper">
            <div className="type-header">
              <div className="type-caption"><img src={this.props.type.detailImg} /></div>
            </div>
          </div>
          <div  className="col-md-12 min-height-wrapper article-wrapper result">
            <h1>Personality: {this.props.type.title}</h1>
            <div international type-description>
              {this.renderDescriptions()}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      );
  }
}

function mapStateToProps(state) {
  return {
    type: state.activeType
  };
}

export default connect (mapStateToProps)(TypeDetail);
