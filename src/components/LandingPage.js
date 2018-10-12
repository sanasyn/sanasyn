import React, {Fragment} from 'react';
import Background from '../dist/synapse.jpg';
import QuestionIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import LocationIcon from '@material-ui/icons/LocationOnTwoTone';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import { Link, withRouter } from 'react-router-dom';
import {Grid, Button, Typography} from '@material-ui/core';
import Image from 'material-ui-image';



export default () => {
	const StyleButton = {
		backgroundColor: "#174886",
  	color: "#fff",
  	fontSize: "2em",
  	margin: "20px 10px",
  	padding: "5px",
  	height: "44px",
	}

	const introBk={
		backgroundColor:'#060d16',

	}

	const imageLogo={
    height:'100%',
		withd:'auto',
		position:'inherit',
		
    }
  const imageRoot={
    paddingTop: 0,
		position: 'inherit',
		
  }

    return (
			<Grid container>
				<Grid item sm style={introBk}>
					<Image src={require('../dist/synapse.jpg')} color="black" style={imageRoot} imageStyle={ imageLogo }/>
				</Grid>
				<Grid item sm style={introBk}>
				
						<Typography variant="h2" gutterBottom align="center" color="textPrimary">
							A Healing Connection
						</Typography>
						<Typography variant="h4" gutterBottom align="center" color="textSecondary">
						We connect you to an Alzheimer’s disease clinical trial that’s right for you.
						</Typography>
						<Link to={`/quiz/question/0`}>
							<Button>Get Started</Button>
						</Link>
					 
				</Grid>
			</Grid>

    	// <div className="landingPage">
    	// 	<div className="topStyle row">
    	// 		<div className="col-sm-6 synapseImage"></div>
    	// 		<div className="col-sm-5 col-sm-offset-1 info" >
	    // 			<h1 className="healingConn">A Healing Connection</h1>
	 		//         <p className="startInfo">We connect you to an Alzheimer’s disease clinical trial that’s right for you.</p>
	 		//         <Link to={`/quiz/question/0`}>
 		  //       			<Button style={StyleButton}>Get Started
 		  //       			</Button>
 		  //       		</Link>
	 		//     </div>
    	// 	</div>
      //   <div className="stepContainer">
      //     <div className="col-md-4 step">
			// 			<QuestionIcon 
			// 				className="stepNumber"
			// 				fontSize="large"
			// 				/>
      //       <p className="stepDesc">Click Get Started to begin a short questionnaire.</p>
      //     </div>
      //     <div className="col-md-4 step">
			// 		<LocationIcon 
			// 				className="stepNumber"
			// 				fontSize="large"
			// 				/>
      //       <p className="stepDesc">Returned list includes relevant studies in locations closest to you.</p>
      //     </div>
      //     <div className="col-md-4 step">
			// 		<PeopleIcon 
			// 				className="stepNumber"
			// 				fontSize="large"
			// 				/>
      //       <p className="stepDesc">Click on study title for important details including study contact information.</p>
      //     </div>
      //   </div>
      //   <footer className='footer'>
      //       <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link> | 
      //       <Link className="aboutLink" to='/about' style={{textDecoration: "none"}}> About Us</Link>
      //   </footer>
    	// </div>

    )
}