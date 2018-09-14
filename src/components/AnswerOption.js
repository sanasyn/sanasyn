//compnent that display answer options
//presentation component

import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
import PropTypes from "prop-types";
import questionaire from '../utils/questionaire';
// checked={props.answerContent === props.answer}

class AnswerOption extends Component {
    constructor(props) {
        super(props)
    }

    handleAnswerSelected(event, results) {
        let counter = this.props.questionId;
        let answerTest = results.state.answer;
        let answerState1 = questionaire[counter].answerState;
        let nestedAnswerState2 = questionaire[counter].answerState2 || '';

        if (event.target.type === 'radio' || event.target.type === 'text' ||event.target.type === 'textarea') {
            nestedAnswerState2 ?
            answerTest[answerState1][nestedAnswerState2] = event.target.value :
            answerTest[answerState1] = event.target.value;
            results.setState({
                currAnswer: event.target.value,
                answer: answerTest,
            })
        } else {
            let updateStateArray = nestedAnswerState2 ?
            answerTest[answerState1][nestedAnswerState2] :
            answerTest[answerState1];

            if (event.target.checked && !updateStateArray.includes(event.target.value)) {
            updateStateArray.push(event.target.value);

            nestedAnswerState2 ?
            answerTest[answerState1][nestedAnswerState2] = updateStateArray :
            answerTest[answerState1] = updateStateArray;

            results.setState({
                currAnswer: updateStateArray,
                answer: answerTest,
            })

            } else if (!event.target.checked && updateStateArray.includes(event.target.value)) {
            updateStateArray.splice(updateStateArray.indexOf(event.target.value),1);

            nestedAnswerState2 ?
            answerTest[answerState1][nestedAnswerState2] = updateStateArray :
            answerTest[answerState1] = updateStateArray;

            results.setState({
                currAnswer: updateStateArray,
                answer: answerTest,
            })
            }
        }
        }

      render() {
          return (
            <Subscribe to={[ResultsContainer]}>
                {(results) => (
                    questionaire[this.props.questionId].type === 'radio' ? (
                        <li className="answerOption">
                        <input 
                            type={questionaire[this.props.questionId].type}
                            className='radioInput'
                            name="radioGroup"
                            checked={results.state.currAnswer === this.props.answerContent}
                            id={this.props.answerContent}
                            value={this.props.answerContent}
                            onChange={(e) => this.handleAnswerSelected(e, results)}
                        />
                        <label 
                            className={this.props.questionId === 3 ? 'radioLabel2' : 'radioLabel'} 
                            htmlFor={this.props.answerContent} 
                        >
                            {this.props.answerContent}
                        </label>
            
                    </li>
                    ) :
                    questionaire[this.props.questionId].type === 'checkbox' ? (
                        <li className="answerOption">
                        <input 
                            type={questionaire[this.props.questionId].type}
                            className='checkCustomButton'
                            id={this.props.answerContent}
                            value={this.props.answerContent}
                            onChange={(e) => this.handleAnswerSelected(e, results)}
                        />
                        <label className={"checkCustomLabel"} htmlFor={this.props.answerContent} >
                            {this.props.answerContent}
                        </label>
            
                    </li>
                    ) : 
                    questionaire[this.props.questionId].type === 'text' ? (
                        <li className="answerOption">
                            <label className='textCustomLabel' htmlFor={this.props.answerContent} >
                                {this.props.answerContent} :
                            </label>
                            <input 
                                type={questionaire[this.props.questionId].type}
                                className='textCustomInput'
                                name={this.props.groupName}
                                value={results.state.currAnswer}
                                onChange={(e) => this.handleAnswerSelected(e, results)}
                                ref={input => input && input.focus()}
                            />
                        </li>
                    ) : 
                    questionaire[this.props.questionId].type === 'textarea' ? (
                        <li className="answerOption">
                        <label className="reasonTextAreaLabel" htmlFor={this.props.answerContent} >
                            {this.props.answerContent} :
                        </label>
                        <textarea 
                            type={questionaire[this.props.questionId].type}
                            className='reasonTextArea'
                            name={this.props.groupName}
                            placeholder="Please write down your reason(s)."
                            value={results.state.currAnswer}
                            onChange={(e) => this.handleAnswerSelected(e, results)}
                            ref={input => input && input.focus()}
                        />
                    </li>
                    ) : null
                )}
            </Subscribe> 
        )
    }
}


AnswerOption.propTypes={
    // answerType: PropTypes.string.isRequired,
    // answerContent: PropTypes.string.isRequired,
    //currAnswer: PropTypes.string.isRequired,
    // onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
