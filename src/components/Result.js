import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link, withRouter } from 'react-router-dom';
import ComponentDidMount from '../utils/ComponentDidMount';
import ResultsContainer from '../containers/ResultsContainer';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

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
                      <CircularProgress
                        size={200}
                        style={{marginTop: '30px', color: '#a71919'}}
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
                      <TableHead>
                        <TableRow>
                          <TableCell className="tableColumn1">Title</TableCell>
                          <TableCell className="tableColumn2">City, State</TableCell>
                          <TableCell className="tableColumn3">Zip Codes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.resultsOnPage(results).map((study, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell 
                                className="tableColumn1">
                                <Link to={`/study/${study.facility_id} `}>
                                  {study.brief_title}
                                </Link>
                                <span 
                                  style={{fontStyle:'italic', color:'#a0a0a0'}}
                                >
                                  ({study.nct_id})
                                </span>
                              </TableCell>
                              <TableCell className="tableColumn2">
                                {study.city}, {study.state}
                              </TableCell>
                              <TableCell className="tableColumn3">
                                {study.zip}
                              </TableCell>
                            </TableRow>
                          )
                        }
                        )}
                      </TableBody>
                    </Table>
                    <div className="pagenation">
                      {this.state.currentPage <= 1 ? (
                        <Button 
                          style={{visibility:'hidden', fontSize: '2.0em'}}
                        >
                            <i className="glyphicon glyphicon-triangle-left" />
                        </Button>
                      ) : 
                        <Button 
                          style={{visibility:'visible', fontSize: '2.0em'}} 
                          onClick={() => {this.previousPageNumber()}}
                        >
                          <i className="glyphicon glyphicon-triangle-left" />
                        </Button>}
                      <div className="currentPage" style={{display: "inline", fontWeight:"bold", fontSize:"2.5em"}}>          {this.state.currentPage}
                      </div>
                      <Button 
                        style={{fontSize: '2.0em'}} 
                        onClick={() => {this.nextPageNumber()}}
                      >
                        <i className="glyphicon glyphicon-triangle-right" />
                      </Button>
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