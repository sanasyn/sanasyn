import React, { Component, Fragment } from 'react';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
import LandingPage from './LandingPage';
import Quiz from './Quiz';
import About from './AboutUs';
import Result from './Result';
import Header from './Header';
import ResultDetail from './ResultDetail';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {Grid, Button, Typography, Paper, Card, CardContent} from '@material-ui/core';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      anchorElement: null,
    }

    this.handleModal=this.handleModal.bind(this);
  }

  handleModal(e, status) {
    if (status) {
      this.setState({
        modalOpen: status,
        anchorElement: e.currentTarget
      })
    } else {
      this.setState({
        modalOpen: status,
        anchorElement: null
      })
    }
    
  }

  render() {
    return (
      <Subscribe to={[ResultsContainer]}>
        {(results) => (
          <BrowserRouter>
            <Fragment>
            <Header/>
                <Paper>
                  <Switch>
                      <Route 
                        exact path="/" 
                        component={LandingPage} 
                      />
                      <Route 
                        path="/quiz/question/:questionId" 
                        component={Quiz} 
                      />
                      <Route 
                        exact path="/about" 
                        component={About} 
                      />
                      <Route 
                        path="/results" 
                        component={Result} 
                      />
                      <Route 
                        path="/study/:facilityId" 
                        component={ResultDetail} 
                      />
                    </Switch>
                </Paper>
                
            </Fragment>
            
              
          </BrowserRouter>
        )}
      </Subscribe>
    );
  }
}
export default App;
