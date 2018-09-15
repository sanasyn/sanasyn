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
            study: '',
            contact: '',
            currentPage: 1,
            resultsPerPage: 25,
        }
    }

    resultsOnPage(results) {
      const indexOfLastResult = this.state.currentPage * this.state.resultsPerPage;
      const indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
      const limitResults = results.state.results.slice(indexOfFirstResult, indexOfLastResult);
      return limitResults;
    }

    previousPageNumber() {
      this.setState({currentPage: this.state.currentPage - 1})
    }

    nextPageNumber() {
      this.setState({currentPage: this.state.currentPage + 1})
    }

    render(){
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
                  {results.state.loading ? (
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
              
                  ) : (
                    <div className="instructions" style={{textAlign: "center"}}>
                    <h2 className='userInfo'>Click on the title for study details.</h2>
                    <Table style={{maxWidth:"90%", margin:"auto"}}>
                      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                          <TableHeaderColumn className="tableColumn1">Title</TableHeaderColumn>
                          <TableHeaderColumn className="tableColumn2">City, State</TableHeaderColumn>
                          <TableHeaderColumn className="tableColumn3">Zip Codes</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        {this.resultsOnPage(results).map((study, i) => {
                          return (
                            <TableRow key={i}>
                              <TableRowColumn 
                                className="tableColumn1">
                                <Link to={`/study/${study.facility_id} `}>
                                  {study.brief_title}
                                </Link>
                                <span 
                                  style={{fontStyle:'italic', color:'#a0a0a0'}}
                                >
                                  ({study.nct_id})
                                </span>
                              </TableRowColumn>
                              <TableRowColumn className="tableColumn2">
                                {study.city}, {study.state}
                              </TableRowColumn>
                              <TableRowColumn className="tableColumn3">
                                {study.zip}
                              </TableRowColumn>
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
                  ) }
                  
                  </ComponentDidMount>
              </div>
            )}
          </Subscribe>
        )
    } 
}

export default withRouter(Result);