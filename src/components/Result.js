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
        console.log("in on Study Select",study);
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
        const resultTable = (   
          <Table style={{maxWidth:"90%", margin:"auto"}}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{padding: '15px', width: '10%', fontSize: '1.3em'}}>See Details</TableHeaderColumn>
                <TableHeaderColumn style={{padding: '15px', width: '51%', fontSize: '1.3em'}}>Title</TableHeaderColumn>
                <TableHeaderColumn style={{padding: '15px', width: '15%', fontSize: '1.3em'}}>City, State</TableHeaderColumn>
                <TableHeaderColumn style={{padding: '15px', width: '10%', fontSize: '1.3em'}}>Zip Codes</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.resultsOnPage().map((study, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn style={{padding: '15px', width: '10%'}}><FlatButton style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px", fontSize: '1.3em'}}  onClick={this.onStudySelect.bind(this, study)}>Details</FlatButton></TableRowColumn>
                    <TableRowColumn style={{padding: '15px', width: '51%', whiteSpace: 'normal', fontSize: '1.3em'}}>{study.official_title}  <span style={{fontStyle:'italic', color:'#a0a0a0'}}>({study.nct_id})</span></TableRowColumn>
                    <TableRowColumn style={{padding: '15px', width: '15%', whiteSpace: 'normal', fontSize: '1.3em'}}>{study.city}, {study.state}</TableRowColumn>
                    <TableRowColumn style={{padding: '15px', width: '10%', fontSize: '1.3em'}}>{study.zip}</TableRowColumn>
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
            {this.state.showResults ? resultTable : null }
            {this.state.showDetails ? detailPage : null }

            {this.state.showResults ? (
                <div className="pagenation" style={{textAlign: "center"}}>
              {this.state.currentPage <= 1 ? (
                  <FlatButton style={{visibility:'hidden'}}><i className="glyphicon glyphicon-triangle-left" /></FlatButton>
                ): <FlatButton style={{visibility:'visible'}} onClick={() => {this.previousPageNumber()}}><i className="glyphicon glyphicon-triangle-left" /></FlatButton>}
                <div className="currentPage" style={{display: "inline", fontWeight:"bold", fontSize:"25px"}}>{this.state.currentPage}</div>
                <FlatButton onClick={() => {this.nextPageNumber()}}><i className="glyphicon glyphicon-triangle-right" /></FlatButton>
            </div>
              ): null}  
          </div>

        )
    } 
}

export default Result;