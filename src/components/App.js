import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Main from './Main';
import About from './AboutUs';
import ResultDetail from './ResultDetail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import headerImage from '../dist/SanaTitle.svg';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const App = () => {
    return (
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
                exact path="/quiz" 
                component={Main} 
              />
              <Route 
                exact path="/about" 
                component={About} 
              />
              <Route 
                exact path="/about" 
                component={About} 
              />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
    );
  }

export default App;
