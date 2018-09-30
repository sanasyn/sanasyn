import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
import LandingPage from './LandingPage';
import Main from './Main';
import Quiz from './Quiz';
import About from './AboutUs';
import Result from './Result';
import ResultDetail from './ResultDetail';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import headerImage from '../dist/SanaTitle.svg';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
              <div className='mainContainer'>
                <header className='header'>
                  <Link to='/' style={{textDecoration: "none"}}>
                    <span className='logo'>S &#423;</span>
                    <Image className='headerImage' src={headerImage}/>
                  </Link>
                  <Button
                    aria-owns={'simple-menu'}
                    aria-haspopup="true"
                    onClick={(e) => this.handleModal(e, true)}
                  >
                    Open Menu
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorElement}
                    open={this.state.modalOpen}
                    onClose={(e) => this.handleModal(e, false)}
                  >
                    <MenuItem 
                      component={Link} 
                      to={`/quiz/question/0`}
                    >
                      Find Trials
                    </MenuItem>
                    <MenuItem>About Us</MenuItem>
                  </Menu>
                </header>
                <div>
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
                </div>
              </div>
          </BrowserRouter>
        )}
      </Subscribe>
    );
  }
}
export default App;
