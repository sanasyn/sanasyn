//component that bring Question, QuestionCount and AnwerOption compontents together
//container component - define how thing work together
//this is also a presentation component

import React, { Component } from 'react';
import Question from '../components/Question';
import questionaire from '../utils/questionaire';
import { Link, withRouter } from 'react-router-dom';
import AnswerInput from '../components/AnswerInput';
import HelpModal from '../components/HelpModal';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import config from '../../config/config.js'
// import AnswerOption from '../components/AnswerOption'


class Quiz extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <ReactCSSTransitionGroup
                className="quiz_wrapper"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionAppear
                transitionAppearTimeout={500}
                onKeyPress={this.props.onEnterNext}
            >
                <div className="quiz">
                    <LinearProgress 
                        className= "progressBar" 
                        mode="determinate" 
                        min={0} 
                        max={questionaire.length} 
                        value={Number(this.props.counter)} 
                    />
    
                    <Question content={questionaire[this.props.counter].question}/>
                              
                    <AnswerInput 
                    answerInputType={questionaire[this.props.counter].type}
                    answerOptions={questionaire[this.props.counter].options}
                    questionId={this.props.counter}
                    currAnswer={this.props.currAnswer}
                    onAnswerSelected={this.props.onAnswerSelected}
                    disableActive={this.props.disableActive}
                    />
                    
                        {this.props.counter > 0 ? (
                            <FlatButton className="quizBackButton" onClick={this.props.onClickBack}>BACK</FlatButton>
                            ): null}

                        <FlatButton className="quizNextButton"  onClick={
                            this.props.onClickNext
                            }> NEXT</FlatButton>
    
                    {config.node_env ==='dev' ? (<FlatButton className="quizResultsButton" onClick={this.props.skipToResults}> Results</FlatButton>):null}
                
                    {questionaire[this.props.counter].help.length ? (<HelpModal helpText={questionaire[this.props.counter].help}/>):null}

                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

Quiz.propTypes ={
    //currAnswer: PropTypes.string.isRequired,
    //answerOptions:PropTypes.array.isRequired,
    //counter: PropTypes.number.isRequired,
    // question: PropTypes.string.isRequired,
    // questionId: PropTypes.number.isRequired,
    // questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
}

export default withRouter(Quiz);