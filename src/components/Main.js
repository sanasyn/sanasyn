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
      // setQuestion: 0,
      currAnswer:"",
      answer:{
        zipcode:"",
        age: "",
        gender: "",
        geneticTesting: {
          taken: "No",
          apoe4Present: "No",
          consent: "Yes"
        },
        pet: "",
        mri: "",
        spinalTap: "",
        stroke: "", 
        medications: {
            list: [],
            acceptableTime:"No" //default to 0
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
      disabled:false
    }

    // props.history.push(this.state.setQuestion);

    // all of these functions should be handled using arrow functions to bind this
    // this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    // this.handleClickNext=this.handleClickNext.bind(this);
    // this.handleClickBack=this.handleClickBack.bind(this);
    // this.handleEnterNext=this.handleEnterNext.bind(this);
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

// setNextOrPreviousQuestion(questionsToSkip) {
//     let counter = Number(this.props.match.params.questionId);
//     const setQuestion = counter + questionsToSkip;
//     this.props.history.push(`/quiz/question/${setQuestion}`);
//     this.setState({setQuestion: setQuestion})

//   }

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
          // onAnswerSelected ={this.handleAnswerSelected}
          inputError={this.state.inputError}
          validateInputValue={this.validateInputValue}
          skipToResults={this.skipToResults}
          disableActive={this.state.disabled}
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