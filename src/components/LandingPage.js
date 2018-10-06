import React from 'react';
import Background from '../dist/synapse.jpg';
import Button from '@material-ui/core/Button';
import QuestionIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import LocationIcon from '@material-ui/icons/LocationOnTwoTone';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import { Image } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

export default () => {
	const StyleButton = {
		backgroundColor: "#174886",
  	color: "#fff",
  	fontSize: "2em",
  	margin: "20px 10px",
  	padding: "5px",
  	height: "44px",
	}

    return (
    	<div className="landingPage">
    		<div className="topStyle row">
    			<div className="col-sm-6 synapseImage"></div>
    			<div className="col-sm-5 col-sm-offset-1 info" >
	    			<h1 className="healingConn">A Healing Connection</h1>
	 		        <p className="startInfo">We connect you to an Alzheimer’s disease clinical trial that’s right for you.</p>
	 		        <Link to={`/quiz/question/0`}>
 		        			<Button style={StyleButton}>Get Started
 		        			</Button>
 		        		</Link>
	 		    </div>
    		</div>
        <div className="stepContainer">
          <div className="col-md-4 step">
						<QuestionIcon 
							className="stepNumber"
							fontSize="large"
							/>
            <p className="stepDesc">Click Get Started to begin a short questionnaire.</p>
          </div>
          <div className="col-md-4 step">
					<LocationIcon 
							className="stepNumber"
							fontSize="large"
							/>
            <p className="stepDesc">Returned list includes relevant studies in locations closest to you.</p>
          </div>
          <div className="col-md-4 step">
					<PeopleIcon 
							className="stepNumber"
							fontSize="large"
							/>
            <p className="stepDesc">Click on study title for important details including study contact information.</p>
          </div>
        </div>
        <footer className='footer'>
            <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link> | 
            <Link className="aboutLink" to='/about' style={{textDecoration: "none"}}> About Us</Link>
        </footer>
    	</div>

    )
}