import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Main from './Main';
import About from './AboutUs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import headerImage from '../dist/SanaTitle.svg';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <MuiThemeProvider>
        <div className='mainContainer'>
          <header className='header'>
            <Link to='/' style={{textDecoration: "none"}}>
              <span className='logo'>S&#423;</span>
              <Image className='headerImage' src={headerImage}/>
            </Link>
            <IconMenu
              className='menuBtn'
              style={{marginTop:'1.2em'}}
              iconButtonElement={<IconButton><MenuIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <Link to="/quiz" style={{textDecoration: "none"}}><MenuItem value="1" primaryText="Find Trials" /></Link>
              <Link to="/about" style={{textDecoration: "none"}}><MenuItem value="2" primaryText="About Us" /></Link>
            </IconMenu>
          </header>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/quiz" component={Main} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
          <footer className='footer'>
            <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link> | 
            <Link className="aboutLink" to='/about' style={{textDecoration: "none"}}> About Us</Link>
          </footer>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
    );
  }

}

export default App;
