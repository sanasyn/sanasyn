import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
import LandingPage from './LandingPage';
import Main from './Main';
import Quiz from './Quiz';
import About from './AboutUs';
import Result from './Result';
import ResultDetail from './ResultDetail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import headerImage from '../dist/SanaTitle.svg';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const App = () => {
  return (
    <Subscribe to={[ResultsContainer]}>
      {(results) => (
        <BrowserRouter>
          <MuiThemeProvider>
            <div className='mainContainer'>
              <header className='header'>
                <Link to='/' style={{textDecoration: "none"}}>
                  <span className='logo'>S &#423;</span>
                  <Image className='headerImage' src={headerImage}/>
                </Link>
                <IconMenu
                  className='menuBtn'
                  style={{marginTop:'1.2em'}}
                  iconButtonElement={<IconButton><MenuIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem componentClass={Link} value="1" primaryText="Find Trials" href='/quiz' to='/quiz' />
                  <MenuItem componentClass={Link} value="2" primaryText="About Us" href='/about' to='/about' />
                </IconMenu>
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
          </MuiThemeProvider>
        </BrowserRouter>
      )}
    </Subscribe>
  );
}

export default App;
