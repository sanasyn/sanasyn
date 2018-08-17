import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Quiz from './Quiz';
import questionaire from '../utils/questionaire';
import Result from './Result';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);

    this.state ={
      setQuestion: 0,
      currAnswer:"",
      answer:{
        zipcode:"",
        age: "",
        gender: "",
        geneticTesting: {
          taken: "no",  //could also be apoE4_0 or apoE4_1
          consent: "yes" // mark as yes if already taken
        },
        pet: "",
        mri: "",
        spinalTap: "",
        stroke: "", 
        medications: {
            list: [],
            acceptableTime:"no" //default to 0
         },
        informant: "",
        primaryCare: "",
        opinion: {
          list:[],
          otherText:""
        },
        race: "",
        cancer:""
      },
      inputError:true,
      results:[],
      start:false,
      loading:false,
    }

    props.history.push(this.state.setQuestion);

    // all of these functions should be handled using arrow functions to bind this
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleClickNext=this.handleClickNext.bind(this);
    this.handleClickBack=this.handleClickBack.bind(this);
    this.handleEnterNext=this.handleEnterNext.bind(this);
    this.skipToResults=this.skipToResults.bind(this);
    this.validateInputValue=this.validateInputValue.bind(this);
    this.renderResult=this.renderResult.bind(this);
    this.renderLoading=this.renderLoading.bind(this);
    this.postUserDemographics=this.postUserDemographics.bind(this);
  }

  componentWillMount() {
    this.setState({
      question: questionaire[0].question,
      answerInputType: questionaire[0].type,
      answerOptions: questionaire[0].options,
      help: questionaire[0].help,
    });
  }

setNextOrPreviousQuestion(questionsToSkip) {
    let counter = Number(this.props.match.params.questionId);
    const setQuestion = counter + questionsToSkip;
    this.props.history.push(`/quiz/question/${setQuestion}`);
    this.setState({setQuestion: setQuestion})

  }

  getMatchResult() {
    axios.post('/api/query', this.state.answer)
      .then((results) => {
        this.setState({
          results: results.data,
          loading:false
        })
      })
      .catch(error => {
        console.log("ERROR: ", error)
        console.log(error.response)
      });
  }

  postUserDemographics() {
    axios.post('/api/userDemographics', this.state.answer)
      // .then((val) => console.log(val.data))
      .catch(error => {
        console.log("ERROR: ", error)
        console.log(error.response)
      });
  }

  //this function will set the answer for the current question and check for any follwo up question and display follow up questions.
  handleAnswerSelected(event) {
    let counter = this.props.match.params.questionId;
    let answerTest = this.state.answer;
    let answerState1 = questionaire[counter].answerState;
    let nestedAnswerState2 = questionaire[counter].answerState2 || '';

    if (event.target.type === 'radio' || event.target.type === 'text' ||event.target.type === 'textarea') {
      nestedAnswerState2 ?
      answerTest[answerState1][nestedAnswerState2] = event.target.value :
      answerTest[answerState1] = event.target.value;
      this.setState({
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

        this.setState({
          currAnswer: updateStateArray,
          answer: answerTest,
        })

      } else if (!event.target.checked && updateStateArray.includes(event.target.value)) {
        updateStateArray.splice(updateStateArray.indexOf(event.target.value),1);

        nestedAnswerState2 ?
        answerTest[answerState1][nestedAnswerState2] = updateStateArray :
        answerTest[answerState1] = updateStateArray;

        this.setState({
          currAnswer: updateStateArray,
          answer: answerTest,
        })
      }
    }
  }

  skipToResults() {
    this.setState({
      loading:true,
      answer: {
        zipcode:"78758",
        age: "65",
        gender: "Female",
        geneticTesting: {
          taken: "apoE4_0",
          consent: "yes"
        },
        stroke: "no", 
        medications: {
            list: ["Namenda"],
            acceptableTime:"yes"
         },
        informant: "yes",
        primaryCare: "yes",
        opinion: {
          list:[]
        }
      }
    });
    setTimeout(()=> this.getMatchResult(),300);
  }

  handleClickBack() {
    let counter = Number(this.props.match.params.questionId);
    switch(counter)
    {
      case 5:
        this.setNextOrPreviousQuestion(-2);
        break;
      case 7:
        this.state.answer.geneticTesting.taken !== 'yes' ? this.setNextOrPreviousQuestion(-2) :
        this.setNextOrPreviousQuestion(-1)
        break;
      case 8:
        this.state.answer.geneticTesting.taken !== 'no' ?this.setNextOrPreviousQuestion(-2) :
        this.setNextOrPreviousQuestion(-1)
        break;
      case 14:
        this.state.answer.medications.list.includes('None') ?this.setNextOrPreviousQuestion(-2) :
        this.setNextOrPreviousQuestion(-1)
        break;
      default:
        this.setNextOrPreviousQuestion(-1);
        break;

    }
  }
  //when next button is clicked, set up the next question to be displayed
  handleClickNext() {
   //counter for current question
    let counter = Number(this.props.match.params.questionId);
    let updateAnswer=this.state.answer;
    
    this.setState({
      currAnswer: ''
    })
    
    switch(counter) {
      case 3:
        this.state.answer.race !== "Other" ?
        this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 5:
        this.state.answer.geneticTesting.taken === 'No' ?this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 12:
        this.state.answer.medications.list.includes('None') ?this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 17: 
        !this.state.answer.opinion.list.includes('Other') ?
        this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 19:
        this.getMatchResult();
        break;
      default:
        this.setNextOrPreviousQuestion(1);
        break;
    }
  }

  handleEnterNext(event){
    if(event.key === "Enter"){
      this.handleClickNext();
    }
  }

  //validate the input value before the user can hit 
  //return true when the value is not valid
  //return false when the value is valid
  validateInputValue(currAnswer) {
    const counter = this.props.match.params.questionId;

    switch(counter) {
      case 0:
        if(currAnswer.match(/^[0-9]+$/) ) {
          this.setState({
            inputError:false
          })
        } else {
          this.setState({
            inputError:true
          })
        }
      break;

      default:
      break; 
    }
  }

  renderQuiz() {
    return (
      <div>
        <Quiz
          currAnswer={this.state.currAnswer}
          counter={this.props.match.params.questionId}
          onAnswerSelected ={this.handleAnswerSelected}
          onClickNext={this.handleClickNext}
          onClickBack={this.handleClickBack}
          onEnterNext={this.handleEnterNext}
          inputError={this.state.inputError}
          validateInputValue={this.validateInputValue}
          skipToResults={this.skipToResults}
          {...this.props}
          />
          <footer className='footer' style={{position:'fixed'}}>
            <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link> | 
            <Link className="aboutLink" to='/about' style={{textDecoration: "none"}}> About Us</Link>
          </footer>
        </div>
    );
  }

  renderLoading() {
    return (
      <div className='refreshIndicator'>
        <h2 className='userInfo'>Searching for results...</h2>
          <RefreshIndicator
            size={200}
            top={50}
            left={-100}
            style={{marginLeft: '50%', marginTop: '30px'}}
            status={'loading'}
          />
        <footer className='footer' style={{position:'fixed'}}>
            <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link> | 
            <Link className="aboutLink" to='/about' style={{textDecoration: "none"}}> About Us</Link>
          </footer>
      </div>
    );
  }

  renderResult() {
    return (
      <div>
        <Result results={this.state.results}/>
        {/* <footer className='footer'>
            <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link> | 
            <Link className="aboutLink" to='/about' style={{textDecoration: "none"}}> About Us</Link>
        </footer> */}
      </div>
    );
  }

  render() {
    return (
      <div style={{marginTop:"30px"}}>
      { this.state.loading ? this.renderLoading() :this.state.results.length ? this.renderResult() :  this.renderQuiz()}
      </div>
    );
  }
}

export default withRouter(Main);