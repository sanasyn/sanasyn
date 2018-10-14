import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unstated';
import './style.css';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: { main:'#20759c'}, 
      secondary: { main: '#3b4e8c' }, 
      error: { main: '#b63d34'},
      text:{
        primary:'#ffffff',
        secondary: '#eeff7b'    }
    }
    
  });

  console.log(theme);

ReactDOM.render(
    <Provider>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
