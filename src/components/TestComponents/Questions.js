import React from 'react';

export default class Questions extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="form-radios">
        <label className="caption left">{this.props.questions.contentA}</label>

        <label
          className={`form-radios-item`}
        >
          <input
            id={this.props.questions.id}
            className="radioButton"
            type="radio" 
            name={this.props.questions.id}
            value={this.props.questions.typeA}
            onChange={this.props.answerSelected}
          /> <span></span>
        </label>

        <label
          className={`form-radios-item`}
        >
          <input
            id={this.props.questions.id}
            className="radioButton"
            type="radio" 
            name={this.props.questions.id}
            value={this.props.questions.typeA === this.props.questions.typeB}
            onChange={this.props.answerSelected}
          /> <span></span>
        </label>

        <label
          className={`form-radios-item`}
        >
          <input
            id={this.props.questions.id}
            className="radioButton"
            type="radio" 
            name={this.props.questions.id}
            value={this.props.questions.typeB}
            onChange={this.props.answerSelected}
          /> <span></span>
        </label>

        <label className="caption right">{this.props.questions.contentB}</label>
      </div>
    );
  }
}
