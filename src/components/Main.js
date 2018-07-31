import React, { Component } from 'react';
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

    this.state ={
      counter:0,
      questionId: 1,
      question: "",
      answerInputType:"",
      answerOptions: [],
      followupQ:"",
      followupQFlag: false,
      followupQCnt:"",
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
      followupQ:questionaire[0].followupQ
    });
  }

  setUserAnswer(answer){
    //update function is React's immutability helpers
    //since the state is immutable, this helper function allows me to update the existing andwer count with a new vlaue.
    //update the state with the answer value and answer counts.
    this.setState({
      answer:answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter+1;
    const questionId = this.state.questionId +1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: questionaire[counter].question,
      answerInputType:questionaire[counter].type,
      answerOptions: questionaire[counter].options,
      followupQ:questionaire[counter].followupQ,
      followupQFlag:false,
      followupQCnt:'',
      currAnswer: ''
    });
  }

  setFollowupQuestion(counter,followupQCnt) {
    
    //display follow questions
    this.setState({
      counter: counter,
      questionId: this.state.questionId,
      question: questionaire[counter].followupQ[followupQCnt].question,
      answerInputType:questionaire[counter].followupQ[followupQCnt].type,
      answerOptions: questionaire[counter].followupQ[followupQCnt].options,
      followupQFlag:true,
      currAnswer:''
    });
  }

  getMatchResult() {
    // console.log("getMatchResult");
    // console.log("answer: ", this.state.answer);
    axios.post('/api/query', this.state.answer)
      .then((results) => {
        // console.log("results: ", results.data);
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
    let answer=this.state.currAnswer;
    
      //for question 10 medication, handle this for medication list and question 14 , reason for using this app
      if((this.state.counter === 9 || this.state.counter ===13) && !this.state.followupQFlag) {
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
    const counter = this.state.counter-1;
    const questionId = this.state.questionId-1;
    let preAnswer="";
    switch(counter)
    {
      case 0:
        preAnswer=this.state.answer.zipcode;
        break;
      case 1:
        preAnswer=this.state.answer.age;
        break;
      default:
        break;

    }

    this.setState({
      counter: counter,
      questionId: questionId,
      currAnswer: preAnswer,
      question: questionaire[counter].question,
      answerInputType:questionaire[counter].type,
      answerOptions: questionaire[counter].options,
      followupQ:questionaire[counter].followupQ
    })
  }
  //when next button is clicked, set up the next question to be displayed
  handleClickNext() {
   //counter for current question
    const counter = this.state.counter;
    let updateAnswer=this.state.answer;
    
    //put the currAnswer value into the answer object
    //
    switch(counter)
    {
      case 0:
        //for question 1 zipcode
        updateAnswer = update(this.state.answer,{zipcode:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });

        break;

      case 1:
        //for question 2 age
         updateAnswer = update(this.state.answer,{age:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 2:
        //for question 3 sex
         updateAnswer = update(this.state.answer,{gender:{$set:this.state.currAnswer}});
        this.setState({
          answer:updateAnswer
        });
        break;

        case 3:
        //for question 4 race question
        if(this.state.followupQFlag) {
          if (this.state.followupQCnt === 0) { 
            updateAnswer = update(this.state.answer,{race:{$set:this.state.currAnswer}});
          }
        } else {
          updateAnswer = update(this.state.answer,{race:{$set:this.state.currAnswer}});
        }
        // console.log("store currAnswer into the asnwer object");
        // console.log("currAnswer: ", this.state.currAnswer);
        // console.log("updateAnswer: ", updateAnswer);
        this.setState({
          answer:updateAnswer
        });

      break;
      
      case 4:

        if(!this.state.followupQFlag && this.state.currAnswer === 'Yes')
        {
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"yes"}}});
        } else {
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"no"}}});
        }
        //for question 4 genetic testing
        if (this.state.followupQCnt === 0 && this.state.currAnswer==='Yes') { 
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"apoE4_1"}}});
        } 

        if (this.state.followupQCnt === 0 && this.state.currAnswer==='No') {
          updateAnswer = update(this.state.answer,{geneticTesting:{taken:{$set:"apoE4_0"}}});
        }

        if (this.state.followupQCnt ===1 && this.state.currAnswer === 'No') {
          updateAnswer = update(this.state.answer,{geneticTesting:{consent:{$set:"no"}}});
        }

        if (this.state.followupQCnt ===1 && this.state.currAnswer === 'Yes') {
          updateAnswer = update(this.state.answer,{geneticTesting:{consent:{$set:"yes"}}});
        }
        this.setState({
          answer:updateAnswer
        });
        break;
      
      case 5:
        //for question 6 MRI
        updateAnswer = update(this.state.answer,{mri:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
      
        break;
      
      case 6:
        //for question 7 PET Scan
        updateAnswer = update(this.state.answer,{pet:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 7:
        //for question 8 spinal tap 
        updateAnswer = update(this.state.answer,{spinalTap:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });

        break;

      case 8:
        //for question 9 stroke in last 12 months
        updateAnswer = update(this.state.answer,{stroke:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 9:
        //for question 10 medication 
        if (this.state.followupQFlag) {
          if (this.state.followupQCnt ===0) { 
            updateAnswer = update(this.state.answer,{medications:{acceptableTime:{$set:this.state.currAnswer.toLowerCase()}}});
          }
        } else {
          updateAnswer = update(this.state.answer,{medications:{list:{$push:this.state.currAnswer}}});
        }
        this.setState({
          answer:updateAnswer
        });
      
        break;

      case 10:
        //for question 11 family memeber/caregiver
        updateAnswer = update(this.state.answer,{informant:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 11:
        //for question 12 primary care
        updateAnswer = update(this.state.answer,{primaryCare:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;

      case 12:
        //for question 13 cancer diagnois
        updateAnswer = update(this.state.answer,{cancer:{$set:this.state.currAnswer.toLowerCase()}});
        this.setState({
          answer:updateAnswer
        });
        break;


      case 13:
        //for question 14 reason to use this app
        if(this.state.followupQFlag) {
          if (this.state.followupQCnt === 0) { 
            updateAnswer = update(this.state.answer,{opinion:{otherText:{$set:this.state.currAnswer}}});
          }
        } else {
          updateAnswer = update(this.state.answer,{opinion:{list:{$push:this.state.currAnswer}}});
        }
        // console.log("store currAnswer into the asnwer object");
        // console.log("currAnswer: ", this.state.currAnswer);
        // console.log("updateAnswer: ", updateAnswer);
        this.setState({
          answer:updateAnswer
        });

        
        break;

      default:
          // console.log("current counter: ", counter," this current counter is not been handle in the switch statement. Moss likely there is additional questions in the questionaire.js that is not being handled for storing user input.");
        break;

    }

    //below is the flow to set up the next question to display
    //check if the current question a follow up question
    if (this.state.followupQFlag) {
      //current question is a follow up question
      //checking if this is the last follow up qeustion
      if (this.state.followupQCnt < questionaire[counter].followupQ.length-1) {
        //current question is not the last followup question
         //set up follow up question to display
       var followupQCnt= this.state.followupQCnt+1;
       this.setState({
        followupQCnt: followupQCnt
       })

       //for genetic testing question only if the taken is no then display the second follow up question
       if (counter === 4 && this.state.answer.geneticTesting.taken === 'no') {
          setTimeout(()=>this.setFollowupQuestion(counter,1),300);
       } else {
        setTimeout(()=>this.setNextQuestion(),300);
       }
       
       //other than genetic testing question follow the same followup question set up flow
       if (counter !== 4 ) {
          setTimeout(()=>this.setFollowupQuestion(counter,followupQCnt),300);
      }

      } else {
        if (this.state.questionId < questionaire.length) {
          //current question is the last follow up question so set up the next question
        setTimeout(()=>this.setNextQuestion(),300);
          
        } else {
          //last of the last question, send answer object
          this.setState({
            loading:true
          });
         setTimeout(()=> this.getMatchResult(),300);
         setTimeout(()=> this.postUserDemographics(),400);
        }
      }
    } 
    else {
      //current question is not a follow up question
      if (typeof questionaire[counter].followupQ !=='string') {
        //the current question has follow up questions
         if (typeof this.state.followupQCnt === 'string') {
          //first time in follow up question
          //set the follow question's counter to 0
          this.setState({
            followupQCnt: 0
          });

           //set up followupQuestion for genetic testing and medication questions
           switch(counter) {
              case 3:
                //for race
                if (this.state.currAnswer.includes("Other")) {
                  setTimeout(()=>this.setFollowupQuestion(counter,0),300);
                } else{
                  setTimeout(()=>this.setNextQuestion(),300);
                }
              break;

             case 4:
                  //for genetic testing quetion
                  if (this.state.currAnswer === 'Yes') {
                    //if the answer from genetic testing is yes then display the first follow up question
                    this.setState({
                      followupQCnt: 0
                     })
                    setTimeout(()=>this.setFollowupQuestion(counter,0),300);
                  } else if (this.state.currAnswer === 'No') {
                    //the answer is no from genetic testing then display second follow up question
                    this.setState({
                      followupQCnt: 1
                     })
                    setTimeout(()=>this.setFollowupQuestion(counter,1),300);
                  }

              break;

             case 9:
                if (this.state.currAnswer.includes("None")) {
                  setTimeout(()=>this.setNextQuestion(),300);
                } else {
                  setTimeout(()=>this.setFollowupQuestion(counter,0),300);
                }
              
              break;
            
             case 13:
                  //for reason for using the app question
                  if (this.state.currAnswer.includes("Other")) {
                    setTimeout(()=>this.setFollowupQuestion(counter,0),300);
                  }
                  else{
                    //in the last question so send answer object
                    this.setState({
                      loading:true
                    });
                    setTimeout(()=> this.getMatchResult(),300);
                    setTimeout(()=> this.postUserDemographics(),400);
                    
                  }

              break;
            
              
            

            default:
              setTimeout(()=>this.setFollowupQuestion(counter,0),300);
              break;
           }
        
        }
      } 
      else {
        //set up next question as normal
        if (this.state.questionId < questionaire.length) {
          setTimeout(()=>this.setNextQuestion(),300);
        } else {
          //reach to end of the question that does not have follow up question. send the answer back and diplay result
          
          // console.log("action: send the input to matching and display results")
          this.setState({
            loading:true
          });
          setTimeout(()=> this.getMatchResult(),300);       
        }
      }
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
    const counter = this.state.counter;

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
          answerInputType={this.state.answerInputType}
          answerOptions ={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={questionaire.length}
          onAnswerSelected ={this.handleAnswerSelected}
          onClickNext={this.handleClickNext}
          onClickBack={this.handleClickBack}
          onEnterNext={this.handleEnterNext}
          onTextChange={this.handleTextChange}
          inputError={this.state.inputError}
          validateInputValue={this.validateInputValue}
          counter={this.state.counter}
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

export default Main;