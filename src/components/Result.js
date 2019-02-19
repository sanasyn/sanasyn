import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link, withRouter } from 'react-router-dom';
import ComponentDidMount from '../utils/ComponentDidMount';
import ResultsContainer from '../containers/ResultsContainer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForward from '@material-ui/icons/ArrowForward';
import  ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    margin:'10px'
  },
  clickTitle: {
    fontSize: '1.9em',
    color: 'black'
  }
}

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
      const { classes } = this.props;
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
                      <Typography variant="h6" gutterBottom className={classes.clickTitle}>
                        Searching for results...
                      </Typography>
                    {/* <h2 className='userInfo'>Searching for results...</h2> */}
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
                      {/* <h2 className='userInfo'>Click on the title for study details.</h2> */}
                      <Typography variant="h6" className={classes.clickTitle}gutterBottom>
                        Click on the title for study details.
                      </Typography>

                      {this.resultsOnPage(results).map((study, i) => {
                        return (
                          <Card key={i} className={classes.card}>
                            <CardContent>
                              <Typography variant="h3" gutterBottom>
                              <Link to={`/study/${study.facility_id} `}>
                                {study.brief_title}
                              </Link>
                              </Typography>
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
                            color="primary"
                          >
                             
                              <ArrowForward />
                              
                          </Button>
                        ) : 
                          <Button 
                            style={{visibility:'visible', fontSize: '2.0em'}} 
                            onClick={() => {this.previousPageNumber()}}
                            color="primary">
                            
                              <ArrowBack/>
                          </Button>}
                        <div className="currentPage" style={{display: "inline", fontWeight:"bold", fontSize:"2rem"}}>
                          {this.state.currentPage}
                        </div>
                        <Button 
                          style={{fontSize: '2.0em'}} 
                          onClick={() => {this.nextPageNumber()}}
                          color="primary"
                        >
                          <ArrowForward />
                          
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

export default withRouter(withStyles(styles)(Result));