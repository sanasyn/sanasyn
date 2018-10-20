//component that bring Question, QuestionCount and AnwerOption compontents together
//container component - define how thing work together
//this is also a presentation component

import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
import Question from '../components/Question';
import questionaire from '../utils/questionaire';
import questionaireSpanish from '../utils/questionaireSpanish';
import { Link, withRouter } from 'react-router-dom';
import AnswerInput from '../components/AnswerInput';
import HelpModal from '../components/HelpModal';
import PropTypes from 'prop-types';
import {LinearProgress, Button, Card,CardHeader,CardContent} from '@material-ui/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import config from '../../config/config.js'
import { withStyles } from '@material-ui/core/styles';

const styles ={};
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
            results.state.answer.geneticTesting.taken === 'No' ? this.setNextOrPreviousQuestion(counter, 2) :
            this.setNextOrPreviousQuestion(counter, 1)
            break;
          case 6:
            results.state.answer.geneticTesting.taken === 'Yes' ? this.setNextOrPreviousQuestion(counter, 2) :
            this.setNextOrPreviousQuestion(counter, 1)
            break;
          case 12:
            results.state.answer.medications.list.includes('None') ? this.setNextOrPreviousQuestion(counter, 2) :
            this.setNextOrPreviousQuestion(counter, 1)
            break;
          case 17:
            if (!results.state.answer.opinion.list.includes('Other')) {
              results.postUserDemographics();
              setTimeout(()=> this.handleSubmit(),300);
              ;
              break;
            } else {
              this.setNextOrPreviousQuestion(counter, 1)
              break;
            }
            
          case 18:
            results.postUserDemographics();
            setTimeout(()=> this.handleSubmit(),300);
            break;
          default:
            this.setNextOrPreviousQuestion(counter, 1);
            break;
        }
      }
    
      setNextOrPreviousQuestion(counter, questionsToSkip) {
        const setQuestion = counter + questionsToSkip;
        this.setState({questionNumber: setQuestion})
        this.props.history.push(`/quiz/question/${setQuestion}`);
      }

      // handleEnterNext(event){
      //   if(event.key === "Enter"){
      //     this.handleClickNext(this.state.questionNumber);
      //   }
      // }

    render() {
        return (
            <Subscribe to={[ResultsContainer]}>
                {(results) => (
                    <ReactCSSTransitionGroup
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={500}
                    transitionAppear
                    transitionAppearTimeout={500}
                    // onKeyPress={this.handleEnterNext(event)}
                >
                    <div className="quiz">
                    <Card>
                      <CardContent>
                        <LinearProgress 
                            color='primary'
                            className= "progressBar" 
                            variant="determinate"
                            value={this.state.questionNumber/questionaire.length*100} 
                        />
                      
                        <Question 
                          content={results.state.language === 'spanish' 
                          ? questionaireSpanish[this.state.questionNumber].question 
                          : questionaire[this.state.questionNumber].question }/>
                      
                        <AnswerInput 
                          language={results.state.language}
                          questionId={this.state.questionNumber}
                          currAnswer={this.props.currAnswer}
                        />
                        
                            {this.state.questionNumber > 0 ? (
                                <Button 
                                  className="quizBackButton"
                                  onClick={() => {
                                    this.handleClickBack(results, this.state.questionNumber);
                                  }} 
                                >
                                  BACK
                                </Button> ): null}

                            <Button className="quizNextButton"  
                              onClick={() => {
                                  this.handleClickNext(results, this.state.questionNumber);
                              }}
                            > 
                              NEXT
                            </Button>
                    
                        {questionaire[this.state.questionNumber].help.length ? (
                        <HelpModal 
                          helpText={results.state.language === 'spanish' 
                          ? questionaireSpanish[this.state.questionNumber].help
                          : questionaire[this.state.questionNumber].help
                        }
                        />):null}
                      </CardContent>
                    </Card>
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

export default withRouter(withStyles(styles)(Quiz));