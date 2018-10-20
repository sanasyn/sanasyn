//presentation component for header

import React from 'react';
import PropTypes from 'prop-types';
import headerImage from '../dist/SanaTitle.svg';
import { Subscribe } from 'unstated';
import ResultsContainer from '../containers/ResultsContainer';
import {Link} from 'react-router-dom';
import Image from 'material-ui-image';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar,Typography, Button} from '@material-ui/core';

const styles = {
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1 
    },
    appBar: {
      background: 'black',
      backgroundImage: 'linear-gradient(rgb(36, 98, 183), rgba(32, 117, 156,0))',
    },
    logo:{
        color: '#eeff7b',
        letterSpacing: '-6px',
        fontFamily: 'Arial',
        fontSize: '2em',
        fontStyle: 'italic'
    },
    title:{
        height:'100%',
        width:'auto',
        boxSizing:'content-box'
    },
    navLink:{
      padding:'31px',
      textDecoration: 'none',
      color:"#fff",
      display: 'inline',
      fontSize: '1.3em'
    },
    form: {
      display: 'inline',
      fontSize: '1.1em',
      padding: '3px',
      borderRadius: '5px'

    },
    label: {
      display: 'inline',
      fontSize: '0.8em',
      padding: '3px'
    },
    select: {
      
    },
    options: {
      color: 'black',
    },
    '@media (max-width: 600px)':
    {
      navLink:{
        paddingRight:'10px',
        paddingLeft:'15px',
        textDecoration: 'none',
        color:"#fff"
      },
    },

    '@media (max-width: 450px)':
    {
      navLink:{
        padding:'24px 3px',
        textDecoration: 'none',
        color:"#fff",
        fontSize:"0.825rem"
      },
    },

    bringToFront:{
      zIndex:99
    }
  };

  const imageLogo={
    height:'100%',
    withd:'auto'
    }
  const imageRoot={
    paddingTop: 0,
    position: 'inherit',
    boxShadow:  {
      x: -15,
      y: 0,
      blur: 100,
      spread: 36,
      color: 'rgb(6,13,22)',
      inset: 'inset'
    }
  }


function Header(props){
    const { classes } = props;
  return (
    <Subscribe to={[ResultsContainer]}>
      {(results) => (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                
                <div className={classes.grow}>
                
                  <span className={classes.logo}>S&#423;</span>
                  <Link to='/'>
                  <Image src={require('../dist/SanaTitle.svg')} color="transparent" style={imageRoot} imageStyle={ imageLogo }/>
                  </Link>
                </div>
                
                <div className={classes.bringToFront}>
                  <form  autoComplete="off" className={classes.navLink}>
                    <FormControl className={classes.form}>
                      <p className={classes.label}>Language: </p>
                      <Select
                        className={classes.select}
                        value={results.state.language}
                        onChange={(event) => results.handleLanguageChange(event)}
                        inputProps={{
                          name: 'language',
                          id: 'languageSelection',
                        }}
                      >
                        <MenuItem className={classes.options} value={'english'}>English</MenuItem>
                        <MenuItem className={classes.options} value={'spanish'}>Spanish</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                  <Link to='/quiz/question/0' className={classes.navLink}>Quiz</Link>
                  <Link to='/about' className={classes.navLink}>About</Link>
                </div>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </Subscribe>
  );
}


Header.propTypes ={
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);