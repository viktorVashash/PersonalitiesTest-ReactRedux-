import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TestHeader from './TestHeader';
import Questions from './Questions';
import Validation from './Validation';
import Result from './Result';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answersCount: {
        Introvert: 0,
        Extravert: 0,
        Intuition: 0,
        Sensing: 0,
        Thinking: 0,
        Feeling: 0,
        Judging: 0,
        Perceiving: 0
      },
      answers: [
        {
          id: '1',
          value: ''
        }
      ],
      result: ''
    }

    this.answerSelected = this.answerSelected.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {
    const questions = this.props.questions;
    const AnswerOptions = questions.map((question) => question.answers);

    this.setState({
      question: this.props.questions[0].question,
      answerOptions: AnswerOptions[0]
    });
  }

  answerSelected(event) {
    const selectedAnswer = this.state.answers.map((answer) => {
      if(answer.id === event.target.id) {
        answer.id = event.target.id;
        answer.value = event.target.value;
        return false;
      }
    });

    let answers = selectedAnswer.filter((answer) => answer === false);
    answers[0] = answers[0] === undefined;

    if(answers[0]) {
      this.state.answers.push({
        id: event.target.id,
        value: event.target.value
      })
    }
  }

  userAnswer() {
    this.state.answers.map((answer) => {
      let answerCount = answer.value;
      let answ = this.state.answersCount[answerCount] + 1;
      this.state.answersCount[answerCount] = answ;
    })

    let zeroAnswers = [{
      id: '1',
      value: ''
    }];

    this.setState({
      answersCount: this.state.answersCount,
      answers: zeroAnswers
    });
  }

  nextPage(e) {
    e.preventDefault();

    let inputs = document.getElementsByTagName('input');
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    if(this.state.answers.length === 4) {      
      this.userAnswer();

      for(let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }

      if(this.state.questionId < this.props.questions.length) {
        this.setState({
          counter: counter,
          questionId: questionId,
          question: this.props.questions[counter].question,
          answerOptions: this.props.questions[counter].answers,
          answer: ''
        })
      } else {
        this.setState({questionId});
        this.setResult(this.getResult());
      }
    } else {
      $('#myModal').modal('show')
    }
  }

  getResult() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);

    let ie = Math.max(this.state.answersCount.Introvert, this.state.answersCount.Extravert);
    let is = Math.max(this.state.answersCount.Intuition, this.state.answersCount.Sensing);
    let tf = Math.max(this.state.answersCount.Thinking, this.state.answersCount.Feeling);
    let jp = Math.max(this.state.answersCount.Judging, this.state.answersCount.Perceiving);

    const ieArr = answersCountKeys.slice(0, 2);
    const isArr = answersCountKeys.slice(2, 4);
    const tfArr = answersCountKeys.slice(4, 6);
    const jpArr = answersCountKeys.slice(6, 8);

    ie = ieArr.filter((key) => answersCount[key] === ie);
    is = isArr.filter((key) => answersCount[key] === is);
    tf = tfArr.filter((key) => answersCount[key] === tf);
    jp = jpArr.filter((key) => answersCount[key] === jp);

    return ie.concat(is, tf, jp);
  }

  setResult(results) {
    this.setState({
      result: results
    });
  }

  renderQuestions() {
    return this.state.answerOptions.map((answerOption) => {
      return(
        <div
          className="question-wrapper"
          key={answerOption.id}
        >
          <Questions
            questions={answerOption}
            answerSelected={this.answerSelected}
          />
        </div>
      );
    });
  }

  renderResult() {
    return (
      <Result testResult={this.state.result}/>
     );
  }

  render() {
    const rate = Math.floor(((this.state.questionId - 1) * 100) / 11);

    return(
      <ReactCSSTransitionGroup
        className="testDiv"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <TestHeader />
        <form className="test-form" onSubmit={this.nextPage.bind(this)}>

          <div className={`statement
            ${this.state.questionId === 7 ||
              this.state.questionId === 8 ||
              this.state.questionId === 9 ? 'questionOpt' : ''}`}>
            <strong>{this.state.result ? 'Your results:' : this.state.question}</strong>
          </div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={this.state.questionId}
              aria-valuemin={0}
              aria-valuemax={11}
              style={{width: (this.state.questionId - 1) * 10 + '%'}}>
                { rate }%
            </div>
          </div>
          <div>
            <div>
              {this.state.result ? this.renderResult() : this.renderQuestions()}
              <Validation style="display:none"/>
              <button
                type="submit"

                className={`btn ${this.state.result ? 'hide-btn' : ''}`}>
                  Next Page
              </button>
            </div>
          </div>
        </form>
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions
  };
}

export default connect(mapStateToProps)(Test);
