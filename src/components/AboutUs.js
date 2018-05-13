import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

class About extends Component {
  render(){
    return(
      <div>
        <Card className="aboutCard">
          <CardTitle className="aboutTitle" title="Current state of affairs"/>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            In the last 20 years basic science research has made great strides in understanding Alzheimer’s 
            disease and Alzheimer’s like diseases providing an exciting plethora of new targets along with technological 
            advances to aid in the process. The road to completely tested and safe pharmacotherapy however is long and 
            arduous; with recruitment for clinical trials being one of the major, persistent bottlenecks in successfully getting 
            a clinical trial done within its set timeline. In fact, it is common knowledge that recruitment for clinical 
            trials often takes longer than the clinical trial itself.
          </CardText>
          <hr/>
          <CardTitle className="aboutTitle" title="Why is recruitment a bottleneck?"/>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            This is a two-pronged problem with issues that need to be addressed at the recruitment/clinical trial side 
            and the participant side.  One of the biggest barriers is connecting the right participant to the right trial. 
            Clinicaltrials.gov, a resource provided by the U.S. National Library of Medicine, is one of the largest clinical trials 
            websites cataloging clinical research studies/trials in all 50 states and in 203 countries.  The problem with such a 
            large inclusive site is a potential volunteer may be inundated with information that may not interest her/him and take 
            them longer to find the right trial.
          </CardText>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            There has been a surge of web/internet registries to curb this issue. While it may be easy to use online registries 
            to get younger participants to sign up, it is a lot harder to sign up elderly participants. Some may not be actively 
            using their email addresses and most prefer a simpler paper and pen survey.
          </CardText>
          <hr/>
          <CardTitle className="aboutTitle" title="Why SanaSyn?"/>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            SanaSyn is a specialized app version of a simplified survey like questionnaire which returns a collection of actively 
            recruiting clinical trial studies which a person with Alzheimer's/mild cognitive impairment, caregivers or even a healthy 
            volunteer qualifies for. Our goal is to make trial finding easier for anyone and everyone interested in participating. 
          </CardText>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            One of the main reasons behind the simplistic design of this website is to give potential participants a feel of a virtual 
            paper and pen survey with real time results. We have also decided for the time being to cover only currently recruiting 
            Alzheimer’s disease clinical trials as we want to establish specificity within searches for one disease. As we actively 
            collect participant feedback, our plan is to integrate the suggestions from current users and add other neurodegenerative 
            and geriatric disease clinical trials/studies in our app.
          </CardText>
          <hr/>
          <CardTitle className="aboutTitle" title="What does SanaSyn mean?"/>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            Sana in latin means heal and syn is from synapse which by definition is the a junction between two nerve cells allowing for 
            the passage of neurotransmitters. A combination of those two words gives us SanaSyn. The word is the core mission of our app: 
            we want to connect you to the right study so you can be a part of the medical community trying to validate new therapies to 
            heal Alzheimer’s disease.
          </CardText>
          <hr/>
          <CardTitle className="aboutTitle" title="The SanaSyn team"/>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            We are a small team of 4 STEM professionals based in the great state of Texas who are taking an active approach to addressing 
            some of the pressing issues affecting recruitment for Alzheimer’s disease. 
          </CardText>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            More updates in this section in the near future so come back to check us out! 
          </CardText>
          <hr/>
          <CardTitle className="aboutTitle" title="Contact Us"/>
          <CardText style={{padding:'0 16px 1em 16px'}}>
            We are yet to have a super savvy web bot or a telephone number but we are available via <a href="mailto:team.1@sanasyn.com">team.1@sanasyn.com</a> 24/7 to 
            answer your queries and read your suggestions. 
          </CardText>
        </Card>
      </div>
    )
  }
}

export default About;