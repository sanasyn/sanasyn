import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link, withRouter } from 'react-router-dom';
import ComponentDidMount from '../utils/ComponentDidMount';
import ResultsContainer from '../containers/ResultsContainer';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class Result extends Component {
    constructor(props){
        super(props)

        this.state = {
            study: '',
            contact: '',
            currentPage: 1,
            resultsPerPage: 8,
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
                      <footer className='footer' style={{position: 'fixed'}}>
                        <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link>
                      </footer>
                  </div>
              
                  ) : (
                    <div>
                    <div className="instructions" style={{textAlign: "center"}}>
                      <h2 className='userInfo'>Click on the title for study details.</h2>

                      {this.resultsOnPage(results).map((study, i) => {
                        return (
                          <Card key={i}>
                            <CardContent>
                              <Link to={`/study/${study.facility_id} `} className="studyTitle">
                                {study.brief_title}
                              </Link>
                              <p className="studyNumber">
                                {study.nct_id}
                              </p>
                              <p className="locationText">
                                {study.city}, {study.state} {study.zip}
                              </p>
                              </CardContent>
                              </Card>
                        )
                      })}

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
                            color="inherit">
                            <i className="glyphicon glyphicon-triangle-left" />
                          </Button>}
                        <div className="currentPage" style={{display: "inline", fontWeight:"bold", fontSize:"2.5em"}}>
                          {this.state.currentPage}
                        </div>
                        <Button 
                          style={{fontSize: '2.0em'}} 
                          onClick={() => {this.nextPageNumber()}}
                          color="inherit"
                        >
                          <i className="glyphicon glyphicon-triangle-right" />
                        </Button>
                      </div>
                      
                  </div>
                  <footer className='footer'>
                          <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link>
                      </footer>
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