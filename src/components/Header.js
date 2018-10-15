//presentation component for header

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar,Typography, Button} from '@material-ui/core';
import headerImage from '../dist/SanaTitle.svg';
import Image from 'material-ui-image';
import {Link} from 'react-router-dom';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1 
    },
    logo:{
        color: '#eeff7b',
        letterSpacing: '-2px'
    },
    title:{
        height:'100%',
        width:'auto',
        boxSizing:'content-box'
    },
    navLink:{
      padding:'24px',
      textDecoration: 'none',
      color:"#fff"
    },


    '@media (max-width: 400px)':
    {
      navLink:{
        padding:'24px 3px',
        textDecoration: 'none',
        color:"#fff",
        fontSize:"0.825rem"
      },
    },

    '@media (min-width: 600px)':
    {
      navLink:{
        paddingRight:'10px',
        paddingLeft:'15px',
        textDecoration: 'none',
        color:"#fff"
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
    position: 'inherit'
  }


function Header(props){
    const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            
            <div className={classes.grow}>
            
              <span className={classes.logo}>S &#423;</span>
              <Link to='/'>
              <Image src={require('../dist/SanaTitle.svg')} color="transparent" style={imageRoot} imageStyle={ imageLogo }/>
              </Link>
            </div>
            
            <div className={classes.bringToFront}>
                <Link to='/quiz/question/0' className={classes.navLink}>Quiz</Link>
                <Link to='/about' className={classes.navLink}>About</Link>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


Header.propTypes ={
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);