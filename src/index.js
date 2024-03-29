import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unstated';
import './style.css';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

var theme = createMuiTheme({
    palette: {
      primary: { main:'#20759c'}, 
      secondary: { main: '#3b4e8c' }, 
      error: { main: '#b63d34'},
      text:{
        primary:'#ffffff',
        secondary: '#eeff7b'    }
    },
    typography:{
        fontFamily:[
            'Montserrat',
            'Helvetica',
            'Arial',
            'sans-serif'
        ]
    }
  });

  theme = {
    ...theme,
    overrides: {
      MuiTypography: {
        h2: {
          [theme.breakpoints.down("sm")]: {
            fontSize: "2.75rem"
          },
          [theme.breakpoints.down("xs")]: {
            fontSize: "2rem"
          }
        },
        h3: {
            [theme.breakpoints.down("sm")]: {
              fontSize: "2.25rem"
            },
            [theme.breakpoints.down("xs")]: {
              fontSize: "1.75rem"
            }
          },
        body1: {
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem"
            },
            [theme.breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
          },
        headline: {
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.75rem"
            },
            [theme.breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
          },
        title:{
            color:"#000"
        }
      }
    }
  };

//   console.log(theme);

ReactDOM.render(
    <Provider>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
