import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { selectType } from '../../actions/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Result extends Component {
  constructor(props) {
    super(props);
  }

  renderType(answerType, types) {
    return types.map((type) => {
      return answerType.map((answer) => {
        if(type.title === answer) {
          return(
            <div key={type.id} className="col-xs-12 col-md-8 type-item">
              <Link to={'/type/:' + type.id}>
                <img
                  className={`${ type.id === 1 || type.id === 3 || type.id === 12 ? 'extrawide-illustration' : '' }`}
                  src={type.img}
                />
                <h4>{type.title}: {type.transcript}</h4>
              </Link>
            </div>
          );
        }
      })
    })
  }

  perebor(arr, types) {
    let answerType = [];

    for(let i = 0; i < arr[0].length; i++) {
      for(let j = 0; j < arr[1].length; j++) {
        for(let k = 0; k < arr[2].length; k++) {
          for(let l = 0; l < arr[3].length; l++) {
            answerType.push(arr[0][i].type + arr[1][j].type + arr[2][k].type + arr[3][l].type);
          }
        }
      }
    }

    return(
      <div>{this.renderType(answerType, types)}</div>
    );
  }

  renderTypes(ie, is, tf, jp, types) {
    let arr = [];
    arr.push(ie, is, tf, jp);

    return (
      <div>
        <h2>YOUR POSSIBLE PERSONALITY TYPES:</h2>
        {this.perebor(arr, types)}
      </div>
    )
  }

  renderDescriptions(result) {
    return result.descriptions.details.map((detail) => {
      return(
        <li key={detail}>{detail}</li>
      );
    })
  }

  renderResultsOpt(results) {
    return results.map((result, i) => {
      return(
        <div key={i} className="col-md-6 result-details">
          <p>{result.title} {result.descriptions.title}:</p>
          <ul>
            {this.renderDescriptions(result)}
          </ul>
        </div>
      );
    });
  }

  renderResults(results) {
    return(
      <div>
        <h2>YOU MAY BE AN {results[0].title} and {results[1].title}</h2>
        {this.renderResultsOpt(results)}
      </div>
    );
  }

  renderResult(results) {
    return results.map((result) => {
      return(
        <div key={result.title} className="result-details">
          <h2>YOU MAY BE AN {result.title}</h2>
          <p>{result.title} {result.descriptions.title}:</p>
          <ul>
            {this.renderDescriptions(result)}
          </ul>
        </div>
      );
    });
  }

  render() {
    const { results, testResult, types } = this.props;
    const ie = [], is = [], tf = [], jp = [];

    results.map((result) => {
      return testResult.map((testRes, j) => {
        if(result.title === testRes) {
          result.title === 'Introvert' || result.title === 'Extravert' ? ie.push(result) : ie;
          result.title === 'Intuition' || result.title === 'Sensing' ? is.push(result) : is;
          result.title === 'Thinking' || result.title === 'Feeling' ? tf.push(result) : tf;
          result.title === 'Judging' || result.title === 'Perceiving' ? jp.push(result) : jp;
        }
      });
    });

    return(
      <ReactCSSTransitionGroup
        className="result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <h2>SECTION I: YOUR DIMENSION RESULTS</h2>
        <p>This section will explain how you scored on each of the four dimensions of personality.</p>
        { ie.length > 1 ? this.renderResults(ie) : this.renderResult(ie) }
        { is.length > 1 ? this.renderResults(is) : this.renderResult(is) }
        { tf.length > 1 ? this.renderResults(tf) : this.renderResult(tf) }
        { jp.length > 1 ? this.renderResults(jp) : this.renderResult(jp) }
        <h2>SECTION II: YOUR PERSONALITY TYPE</h2>
        <p>This section will show you how your four dimension results combine to create your personality type.</p>
        <h2>DISCOVERING YOUR PERSONALITY TYPE</h2>
        <p>
          Your personality type code is based on the combination of your results for the four dimensions of personality.
          Because we are not sure of your styles on all of the dimensions, we are not sure of your four-letter code.
          We will show you all the personality types that may fit you, and it is up to you to decide which describes you best.
          Below you will find profiles for each of the personality types that you should consider.
          Read over each of them carefully and think about which fits you best.
          You may see some of yourself in all of them, and none of them may fit you exactly.
          However, try to think about which comes the closest to describing you.
          If you can find a profile that is about 90% accurate or better, that is likely to be your personality type.
        </p>
        { this.renderTypes(ie, is, tf, jp, types) }
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
    types: state.types
  };
}

export default connect(mapStateToProps, { selectType })(Result);
