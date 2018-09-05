//component that bring Question, QuestionCount and AnwerOption compontents together
//container component - define how thing work together
//this is also a presentation component

import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
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
        this.state = {
            questionNumber: Number(props.match.params.questionId)
        }

        this.handleSubmit=this.handleSubmit.bind(this);
      }

      handleSubmit() {
        this.props.history.push("/results");
      }

      handleClickBack(results, counter) {
        switch(counter)
        {
          case 5:
            this.setNextOrPreviousQuestion(counter, -2);
            break;
          case 7:
            results.state.answer.geneticTesting.taken !== 'Yes' ? this.setNextOrPreviousQuestion(counter, -2) :
            this.setNextOrPreviousQuestion(counter, -1)
            break;
          case 8:
          results.state.answer.geneticTesting.taken !== 'No' ?this.setNextOrPreviousQuestion(counter, -2) :
            this.setNextOrPreviousQuestion(counter, -1)
            break;
          case 14:
          results.state.answer.medications.list.includes('None') ?this.setNextOrPreviousQuestion(counter, -2) :
            this.setNextOrPreviousQuestion(counter, -1)
            break;
          default:
            this.setNextOrPreviousQuestion(counter, -1);
            break;
        }
      }

      handleClickNext(results, counter) {
        results.setState({
          currAnswer: ''
        })
        
        switch(counter) {
          case 3:
            results.state.answer.race !== "Other" ?
            this.setNextOrPreviousQuestion(counter, 2) :
            this.setNextOrPreviousQuestion(counter, 1)
            break;
          case 5:
          results.state.answer.geneticTesting.taken === 'No' ?this.setNextOrPreviousQuestion(counter, 2) :
            this.setNextOrPreviousQuestion(counter, 1)
            break;
          case 12:
          results.state.answer.medications.list.includes('None') ?this.setNextOrPreviousQuestion(counter, 2) :
            this.setNextOrPreviousQuestion(counter, 1)
            break;
          case 17:
            console.log("CASE 17: ", this.state.questionNumber); 
            if (!results.state.answer.opinion.list.includes('Other')) {
              // results.setState({
              //   loading:true
              // });
              // setTimeout(()=> results.getMatchResult(),300);
              results.postUserDemographics();
              setTimeout(()=> this.handleSubmit(),300);
              ;
              break;
            } else {
              console.log("CASE 17: ", this.state.questionNumber); 
              this.setNextOrPreviousQuestion(counter, 1)
              break;
            }
            
          case 18:
          console.log("CASE 18: ", this.state.questionNumber); 
            // results.setState({
            //   loading:true
            // });
            // setTimeout(()=> results.getMatchResult(),300);
            results.postUserDemographics();
            setTimeout(()=> this.handleSubmit(),300);
            break;
          default:
          console.log("CASE: ", this.state.questionNumber); 
            this.setNextOrPreviousQuestion(counter, 1);
            break;
        }
      }
    
      setNextOrPreviousQuestion(counter, questionsToSkip) {
        const setQuestion = counter + questionsToSkip;
        this.setState({questionNumber: setQuestion})
      }

      handleEnterNext(event){
        if(event.key === "Enter"){
          this.handleClickNext(this.state.questionNumber);
        }
      }

    render() {
        return (
            <Subscribe to={[ResultsContainer]}>
                {(results) => (
                    <ReactCSSTransitionGroup
                    className="quiz_wrapper"
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={500}
                    transitionAppear
                    transitionAppearTimeout={500}
                    onKeyPress={this.handleEnterNext(event)}
                >
                    <div className="quiz">
                        <LinearProgress 
                            className= "progressBar" 
                            mode="determinate" 
                            min={0} 
                            max={questionaire.length} 
                            value={this.state.questionNumber} 
                        />
        
                        <Question content={questionaire[this.state.questionNumber].question}/>
                                  
                        <AnswerInput 

                        questionId={this.state.questionNumber}
                        currAnswer={this.props.currAnswer}
                        />
                        
                            {this.state.questionNumber > 0 ? (
                                <FlatButton className="quizBackButton"     onClick={() => {
                                    this.handleClickBack(results, this.state.questionNumber);
                                    this.props.history.push(`/quiz/question/${this.state.questionNumber}`);
                                }}>BACK</FlatButton>
                                ): null}

                            <FlatButton className="quizNextButton"  
                                onClick={() => {
                                    this.handleClickNext(results, this.state.questionNumber);
                                    this.props.history.push(`/quiz/question/${this.state.questionNumber}`);
                                }
                                    
                                }> NEXT</FlatButton>
        
                        {config.node_env ==='dev' ? (<FlatButton className="quizResultsButton" onClick={this.props.skipToResults}> Results</FlatButton>):null}
                    
                        {questionaire[this.state.questionNumber].help.length ? (<HelpModal helpText={questionaire[this.state.questionNumber].help}/>):null}
    
                    </div>
                </ReactCSSTransitionGroup>
                )}
            </Subscribe>
            
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
    // onAnswerSelected: PropTypes.func.isRequired
}

export default withRouter(Quiz);