import React, {Fragment} from 'react';
import Background from '../dist/synapse.jpg';
import QuestionIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import LocationIcon from '@material-ui/icons/LocationOnTwoTone';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import { Link, withRouter } from 'react-router-dom';
import {Grid, Button, Typography, Paper, Hidden} from '@material-ui/core';
import Image from 'material-ui-image';
import { withStyles } from '@material-ui/core/styles';

const styles={
	getStartedButton: {
		fontSize: "2rem",
		margin: "20px 10px",
		padding: "10px"
	},

	'@media (max-width: 600px)':
	{
		getStartedButton: {
			fontSize:"1.25rem",
			margin: "20px 10px",
			padding: "10px"
		},
	},

	introBk:{
		backgroundColor:'#060d16',
		height: '450px',

	},
	image: {
		height:'inherit',
		display:'block',
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		boxShadow: [
			[-15, 0, 100, 36, 'rgb(6,13,22)', 'inset']
		]
	},

	introInfo:{
		textAlign:'center',
		paddingTop:'20px'
	},

	paper:{
		padding:25,
		height:'100%',
		textAlign:'center',
		border: 'none'
	},

	paperDark:{
		backgroundColor:'#060d16',
		paddingTop:'10%'	
	}
};

export default withStyles(styles)(({classes})=> {
	const imageLogo={
    	height:'95%',
		width:'95%',
		position:'relative',
		left:20
		
	}
	
	const imageRoot={
    	paddingTop: 0,
		position: 'inherit',
		
	}



    return (
			<div>
			<Grid container className={classes.introBk}>
				<Hidden xsDown>
				<Grid item sm={6}>
					{/* <Paper className={classes.introBk}>
						<Image src={require('../dist/synapse.jpg')} color="#060d16" style={imageRoot} imageStyle={ imageLogo }/>
					</Paper>	 */}
					
						<Paper className={classes.introBk}>
							<div className={classes.image}></div>
						</Paper>
        			
				</Grid>
				</Hidden>
				<Grid item sm={6} md={6} className={classes.introInfo}>
					<Paper className={classes.paperDark}>
						<Typography variant="h2" gutterBottom align="center" color="textPrimary">
							A Healing Connection
						</Typography>
						<Typography variant="headline" gutterBottom align="center" color="textPrimary">
						We connect you to an Alzheimer’s disease clinical trial that’s right for you.
						</Typography>

							<Link to='/quiz/question/0'>
								<Button variant="contained" color="secondary" className={classes.getStartedButton}>
									Get Started
								</Button>
							</Link>
					</Paper>
				</Grid>
			</Grid>

			<Grid container spacking={24}>
						<Grid item xs={12} sm={4}>
							<Paper className={classes.paper}>

								<QuestionIcon 
									fontSize="large"
									color="error"
									/>
							
								<Typography 
									variant="h5" 
									gutterBottom
									color="inherit"
									>
										Click Get Started to begin a short questionnaire.
								</Typography>
								
							</Paper>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Paper className={classes.paper}>
								<LocationIcon 
									fontSize="large"
									color="error"
									/>
								
								<Typography 
									variant="h5" 
									gutterBottom 
									color="inherit">
									Returned list includes relevant studies in locations closest to you.
								</Typography>
									
							</Paper>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Paper className={classes.paper}>
								<PeopleIcon
									fontSize="large"
									color="error"
									
									/>
				
								<Typography 
									variant="h5" 
									gutterBottom
									color="inherit"
									>
								Click on study title for important details including study contact information.
								</Typography>
							
							</Paper>
						</Grid>
				
				
					<Grid item xs={12}>
					<footer className='footer'>
                          <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link>
                    </footer>
					</Grid>
				</Grid>
			</div>

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
})