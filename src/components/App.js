import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import headerImage from '../dist/SanaTitle.svg';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <MuiThemeProvider>
        <div>
          <header className='header'>
            <Link to='/' style={{textDecoration: "none"}}>
              <span className='logo'>S&#423;</span>
              <Image src={headerImage}/>
            </Link>
          </header>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/quiz" component={Main} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
    );
  }

}

export default App;
