import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unstated';
import './style.css';
import App from './components/App';
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

ReactDOM.render(
    <Provider>
        {/* <MuiThemeProvider theme={createMuiTheme()}> */}
            <App />
        {/* </MuiThemeProvider> */}
    </Provider>, document.getElementById('root'));
