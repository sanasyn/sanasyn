import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Quiz from './Quiz';
import questionaire from '../utils/questionaire';
import update from 'react-addons-update';
import Result from './Result';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);

    console.log("PROPS TEST: ", props)

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
    this.handleTextChange=this.handleTextChange.bind(this);
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
    let answer=this.state.currAnswer;
    console.log("EVENT: ", event.currentTarget);
    
      //for question 10 medication, handle this for medication list and question 14 , reason for using this app
      if((counter === 9 || counter ===13)) {
        if(event.currentTarget.checked && !answer) {
          //grab the first element
          answer=[event.currentTarget.value];
        }
        else if(event.currentTarget.checked && answer.indexOf(event.currentTarget.value) <= -1) {
          //when answer has 1+ elements, check if current checked element are already in the array to be stored.
          answer.push(event.currentTarget.value);
        } else {
          //console.log("event.currentTarget.checked: "+ event.currentTarget.checked);
          
          //console.log("answer before splice: ", answer);
          let tempCheckedValue=event.currentTarget.value;
          answer.splice(answer.indexOf(tempCheckedValue),1);
          //console.log("answer after splice: ", answer);
        }
      } else {
        
        answer=event.currentTarget.value;
        // console.log("curr answer: ", answer);
      }
    
    this.setState({
      currAnswer:answer
    });  
    
  }

  handleTextChange(event) {
    this.setState({
      currAnswer: event.currentTarget.value
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

  handleClickBack() {
    let counter = this.props.match.params.questionId;
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
    let counter = this.props.match.params.questionId;
    console.log("COUNTER: ", counter);
    let updateAnswer=this.state.answer;
    
    //put the currAnswer value into the answer object
    switch(counter)
    {
      case 0:
        //for question 1 zipcode
        updateAnswer = update(this.state.answer,{zipcode:{$set:this.state.currAnswer}});
        console.log("UPDATE ANSWER: ", updateAnswer);
        this.setState({
          answer:updateAnswer
        });
        break;

      case 1:
        //for question 2 age
        updateAnswer = update(this.state.answer,{age:{$set:this.state.currAnswer}});
        console.log("UPDATE ANSWER: ", updateAnswer);
        this.setState({
          answer:updateAnswer
        });
        break;

      case 2:
        //for question 3 sex
        updateAnswer = update(this.state.answer,{gender:{$set:this.state.currAnswer}});
        console.log("UPDATE ANSWER: ", updateAnswer);
        this.setState({
          answer:updateAnswer
        });
        break;

      case 3:
        //for question 4 race question
        updateAnswer = update(this.state.answer,{race:{$set:this.state.currAnswer}});
        console.log("UPDATE ANSWER: ", updateAnswer);
        this.setState({
          answer:updateAnswer
        });

      case 4:
        //for question 4 race question
        updateAnswer = update(this.state.answer,{race:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });
        break;
      
      case 5:
        updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:this.state.currAnswer.toLowerCase()}}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 6:
        if (this.state.currAnswer==='Yes') { 
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"apoE4_1"}}});
        } else {
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"apoE4_0"}}});
        }
        this.setState({
          answer:updateAnswer
        });
        break;

      case 7:
        if (this.state.currAnswer === 'Yes') {
          updateAnswer = update(this.state.answer,{geneticTesting:{consent:{$set:"yes"}}});
        } else {
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"no"}}});
        }
        this.setState({
          answer:updateAnswer
        });
        break;
      
      case 8:
        //for question 6 MRI
        
        updateAnswer = update(this.state.answer,{mri:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
      
        break;
      
      case 9:
        //for question 7 PET Scan
        updateAnswer = update(this.state.answer,{pet:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 10:
        //for question 8 spinal tap 
        updateAnswer = update(this.state.answer,{spinalTap:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });

        break;

      case 11:
        //for question 9 stroke in last 12 months
        updateAnswer = update(this.state.answer,{stroke:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 12:
        updateAnswer = update(this.state.answer,{medications:{list:{$push:this.state.currAnswer}}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 13:
        updateAnswer = update(this.state.answer,{medications:{acceptableTime:{$set:this.state.currAnswer.toLowerCase()}}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 14:
        //for question 11 family memeber/caregiver
        updateAnswer = update(this.state.answer,{informant:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 15:
        //for question 12 primary care
        updateAnswer = update(this.state.answer,{primaryCare:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 16:
        //for question 13 cancer diagnois
        updateAnswer = update(this.state.answer,{cancer:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;


      case 17:
        //for question 14 reason to use this app
        updateAnswer = update(this.state.answer,{opinion:{list:{$push:this.state.currAnswer}}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 18:
        updateAnswer = update(this.state.answer,{opinion:{otherText:{$set:this.state.currAnswer}}});
        this.setState({
          answer:updateAnswer
        });
        break;

      default:
        break;

    }
    
    switch(counter) {
      case 2:
        this.state.answer.race !== "Other" ?
        this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 5:
        this.state.answer.geneticTesting.taken === 'No' ?this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 12:
        !this.state.answer.medications.list.includes('None') ?this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      case 17: 
        !this.state.answer.opinion.list.includes('Other') ?
        this.setNextOrPreviousQuestion(2) :
        this.setNextOrPreviousQuestion(1)
        break;
      default:
        this.setNextOrPreviousQuestion(1);
        break;
    }

    if (counter === 18) {
      this.getMatchResult();
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
          setQuestion={this.state.setQuestion}
          questionTotal={questionaire.length}
          onAnswerSelected ={this.handleAnswerSelected}
          onClickNext={this.handleClickNext}
          onClickBack={this.handleClickBack}
          onEnterNext={this.handleEnterNext}
          onTextChange={this.handleTextChange}
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