import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Main from './Main';
import About from './AboutUs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import headerImage from '../dist/SanaTitle.svg';

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
