import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link, withRouter } from 'react-router-dom';
import ComponentDidMount from '../utils/ComponentDidMount';
import ResultsContainer from '../containers/ResultsContainer';
import ResultDetail from './ResultDetail';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
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

    resultsOnPage(results) {
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
        const loading = (
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
        )

        const resultTable = (   
          <div className="instructions" style={{textAlign: "center"}}>
            <h2 className='userInfo'>Click on the title for study details.</h2>
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
                      <TableRowColumn className="tableCol">
                        <a onClick={this.onStudySelect.bind(this, study)}>{study.brief_title}</a>
                        <span style={{fontStyle:'italic', color:'#a0a0a0'}}>( {study.nct_id})</span>
                      </TableRowColumn>
                      <TableRowColumn className="tableCol">{study.city}, {study.state}</TableRowColumn>
                      <TableRowColumn className="tableCol">{study.zip}</TableRowColumn>
                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
            <div className="pagenation">
              {this.state.currentPage <= 1 ? (
                <FlatButton 
                  style={{visibility:'hidden', fontSize: '2.0em'}}
                >
                    <i className="glyphicon glyphicon-triangle-left" />
                </FlatButton>
              ) : 
                <FlatButton 
                  style={{visibility:'visible', fontSize: '2.0em'}} 
                  onClick={() => {this.previousPageNumber()}}
                >
                  <i className="glyphicon glyphicon-triangle-left" />
                </FlatButton>}
              <div className="currentPage" style={{display: "inline", fontWeight:"bold", fontSize:"2.5em"}}>          {this.state.currentPage}
              </div>
              <FlatButton 
                style={{fontSize: '2.0em'}} 
                onClick={() => {this.nextPageNumber()}}
              >
                <i className="glyphicon glyphicon-triangle-right" />
              </FlatButton>
            </div>
          </div>
          )

        const detailPage = (
            <ResultDetail study={this.state.study} contact={this.state.contact} back={() => this.goBack()}/>
        )

        return (
          <Subscribe to={[ResultsContainer]}>
            {(results) => (
              <div className="resultsPage">
                <ComponentDidMount
                  handler={() => {
                  if(!results.state.results.length)
                    results.getMatchResult();
                  }}
                >
                  {results.state.loading ? loading :  resultTable}
                  
                  </ComponentDidMount>
              </div>
            )}
          </Subscribe>
        )
    } 
}

export default Result;