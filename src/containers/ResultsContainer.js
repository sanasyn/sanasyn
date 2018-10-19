import { Container } from 'unstated';
import axios from 'axios';

export default class ResultsContainer extends Container {
  constructor(){
      super();

      this.state ={
        setQuestion: 0,
        currAnswer:"",
        answer:{
          zipcode:"78758",
          age: "60",
          gender: "Female",
          geneticTesting: {
            taken: "No",
            apoe4Present: "No",
            consent: "Yes"
          },
          pet: "Yes",
          mri: "Yes",
          spinalTap: "Yes",
          stroke: "No", 
          medications: {
              list: ["None"],
              acceptableTime:"Yes"
            },
          informant: "Yes",
          primaryCare: "Yes",
          opinion: {
            list:[],
            otherText:"Test"
          },
          race: "White non-Hispanic",
          cancer:"No"
        },
        inputError:true,
        results:[],
        start:false,
        loading:false,
        language: "english"
      }
  }

  postUserDemographics() {
    axios.post('/api/userDemographics', this.state.answer)
      .then((val) => console.log("Successfully posted user demographics"))
      .catch(error => {
        console.log("ERROR: ", error)
        console.log(error.response)
      });
  }

  getMatchResult() {
    this.setState({
      loading:true
    })
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

  handleAnswerSelected(event, counter) {
    // let counter = this.props.questionId;
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

}