import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import teamImage from '../dist/groupPic.jpg';
import { Link } from 'react-router-dom';

class About extends Component {  
  render(){
    return(
      <div>
        <Card className="aboutCard">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="aboutTitle">
              Why SanaSyn?
            </Typography>
            <Typography gutterBottom variant="headline" component="p" className="aboutCrdEle">
            SanaSyn is a specialized app version of a simplified survey like questionnaire which returns a collection of actively 
            recruiting clinical trial studies which a person with Alzheimer's/mild cognitive impairment, caregivers or even a healthy 
            volunteer qualifies for. Our goal is to make trial finding easier for anyone and everyone interested in participating. 
            </Typography>

            <Typography gutterBottom variant="headline" component="p" className="aboutCrdEle">
            One of the main reasons behind the simplistic design of this website is to give potential participants a feel of a virtual 
            paper and pen survey with real time results. We have also decided for the time being to cover only currently recruiting 
            Alzheimer’s disease clinical trials as we want to establish specificity within searches for one disease. As we actively 
            collect participant feedback, our plan is to integrate the suggestions from current users and add other neurodegenerative 
            and geriatric disease clinical trials/studies in our app.
            </Typography>
          </CardContent>
        </Card>

        <Card className="aboutCard">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="aboutTitle">
              Meet the Team
            </Typography>
            <Typography gutterBottom variant="headline" component="p" className="aboutCrdEle">
            We are a small team of 4 STEM professionals based in the great state of Texas who are taking an active approach to addressing 
              some of the pressing issues affecting recruitment for Alzheimer’s disease clinical trials. 
              </Typography>
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                  <img src={teamImage} className="picwidth100"/>
                  <p> THE TEAM</p>
                  <p><span>From left to right: </span><a href="https://www.linkedin.com/in/marjanasarker/" target="_blank">Marjana Sarker, PhD.</a>  <b>Founder</b> ,<a href="https://www.linkedin.com/in/aelly-liu/" target="_blank">Aelly Liu</a>,<a href="https://www.linkedin.com/in/marissa-pels/" target="_blank">Marissa Pels</a>, <a href="https://www.linkedin.com/in/whitney-wong/" target="_blank">Whitney Wong</a></p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="aboutCard">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="aboutTitle">
              Contact Us
            </Typography>
            <Typography gutterBottom variant="headline" component="p" className="aboutCrdEle">
            We are yet to have a super savvy web bot or a telephone number but we are available via <a href="mailto:team.1@sanasyn.com">team.1@sanasyn.com</a> We are here 24/7 to 
            answer your queries and read your suggestions. 
              </Typography>
          </CardContent>
          </Card>

          <Card className="aboutCard">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="aboutTitle">
              Contact Us
            </Typography>
            <Typography gutterBottom variant="headline" component="p" className="aboutCrdEle">
            We are yet to have a super savvy web bot or a telephone number but we are available via <a href="mailto:team.1@sanasyn.com">team.1@sanasyn.com</a> We are here 24/7 to 
            answer your queries and read your suggestions. 
              </Typography>
          </CardContent>
          </Card>

          <Card className="aboutCard">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="aboutTitle">
            What does SanaSyn mean?
            </Typography>
            <Typography gutterBottom variant="headline" component="p" className="aboutCrdEle">
            Sana in latin means heal and syn is from synapse which by definition is the junction between two nerve cells allowing for 
            the passage of neurotransmitters. A combination of those two words gives us SanaSyn. The word is the core mission of our app: 
            we want to connect you to the right study so you can be a part of the medical community trying to validate new therapies to 
            heal Alzheimer’s disease. 
              </Typography>
          </CardContent>
          </Card>

        <footer className='footer'>
      <Link className='footerLogo' to='/' style={{textDecoration: "none"}}>SanaSyn</Link>
      </footer>
      </div>

      
    )
  }
}

export default About;