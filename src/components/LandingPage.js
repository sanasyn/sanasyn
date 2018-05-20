import React from 'react';
import Background from '../dist/synapse.jpg';
import FlatButton from 'material-ui/FlatButton';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    	<div>
    		<div className="topStyle row">
    			<Image className="col-sm-6 synapseImage" circle src={Background}/>
    			<div className="col-sm-5 col-sm-offset-1 info" >
	    			<h1 className="healingConn">A Healing Connection</h1>
	 		        <p className="startInfo">We connect you to an Alzheimer’s disease clinical trial that’s right for you.</p>
	 		        <Link to="/quiz">
 		        			<FlatButton style={StyleButton}>Get Started
 		        			</FlatButton>
 		        		</Link>
	 		    </div>
    		</div>
        <div className="stepContainer col-md-offset-3 col-md-6">
          <div className="step">
            <h2 className="stepNumber">1</h2>
            <p className="stepDesc">Click Get Started to begin a short questionnaire.</p>
          </div>
          <div className="step">
            <h2 className="stepNumber">2</h2>
            <p className="stepDesc">Returned list includes relevant studies in locations closest to you.</p>
          </div>
          <div className="step">
            <h2 className="stepNumber">3</h2>
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