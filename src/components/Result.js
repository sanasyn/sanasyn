import React, { Component } from 'react';
import ResultDetail from './ResultDetail';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Result extends Component {
    constructor(props){
        super(props)

        this.state = {
            showResults: true,
            showDetails: false,
            study: '',
            contact: '',
            currentPage: 1,
            resultsPerPage: 25,
        }

        this.onStudySelect=this.onStudySelect.bind(this)
    }
    resultsOnPage() {
      const indexOfLastResult = this.state.currentPage * this.state.resultsPerPage;
      const indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
      const results = this.props.results.slice(indexOfFirstResult, indexOfLastResult);
      return results;
    }

    onStudySelect(study) {
        // console.log("in on Study Select",study);
        this.setState({showDetails: true, showResults: false})
        axios.post("/api/resultDetails", study)
          .then((results) => {
            this.setState({ 
              study: results.data.study[0],
              contact: results.data.contact[0]
            })
          })
    }

    goBack() {
        this.setState({
            showDetails: false,
            showResults:true,
        })
    }

    previousPageNumber() {
      this.setState({currentPage: this.state.currentPage - 1})
    }

    nextPageNumber() {
      this.setState({currentPage: this.state.currentPage + 1})
    }

    render(){
        const instructions = (
          <div className="instructions" style={{textAlign: "center"}}>
            <h2 className='userInfo'>Click on the title for study details.</h2>
          </div>
          )

        const resultTable = (   
          <Table style={{maxWidth:"90%", margin:"auto"}}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{padding: '15px', width: '55%', fontSize: '1.3em'}}>Title</TableHeaderColumn>
                <TableHeaderColumn style={{padding: '15px', width: '18%', fontSize: '1.3em'}}>City, State</TableHeaderColumn>
                <TableHeaderColumn style={{padding: '15px', width: '13%', fontSize: '1.3em'}}>Zip Codes</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.resultsOnPage().map((study, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn 
                      style={{padding: '15px', width: '55%', whiteSpace: 'normal', fontSize: '1.3em'}} 
                    >
                      <a onClick={this.onStudySelect.bind(this, study)}>{study.brief_title}</a>
                      <span style={{fontStyle:'italic', color:'#a0a0a0'}}>( {study.nct_id})</span>
                    </TableRowColumn>
                    <TableRowColumn style={{padding: '15px', width: '18%', whiteSpace: 'normal', fontSize: '1.3em'}}>{study.city}, {study.state}</TableRowColumn>
                    <TableRowColumn style={{padding: '15px', width: '13%', fontSize: '1.3em'}}>{study.zip}</TableRowColumn>
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
          )

        const detailPage = (
            <ResultDetail study={this.state.study} contact={this.state.contact} back={() => this.goBack()}/>
        )

        return (
          <div className="resultsPage">
            {this.state.showResults ? instructions : null }
            {this.state.showResults ? resultTable : null }
            {this.state.showDetails ? detailPage : null }

            {this.state.showResults ? (
                <div className="pagenation">
              {this.state.currentPage <= 1 ? (
                  <FlatButton style={{visibility:'hidden', fontSize: '2.0em'}}><i className="glyphicon glyphicon-triangle-left" /></FlatButton>
                ): <FlatButton style={{visibility:'visible', fontSize: '2.0em'}} onClick={() => {this.previousPageNumber()}}><i className="glyphicon glyphicon-triangle-left" /></FlatButton>}
                <div className="currentPage" style={{display: "inline", fontWeight:"bold", fontSize:"2.5em"}}>{this.state.currentPage}</div>
                <FlatButton style={{fontSize: '2.0em'}} onClick={() => {this.nextPageNumber()}}><i className="glyphicon glyphicon-triangle-right" /></FlatButton>
            </div>
              ): null}  
          </div>

        )
    } 
}

export default Result;