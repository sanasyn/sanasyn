import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ComponentDidMount from '../utils/ComponentDidMount';

import {Button, Card,CardContent,Typography,Grid,Paper} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import StoreIcon from '@material-ui/icons/Store';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EmailModal from './EmailModal';

const styles = {
  resultDetails: {
    background: '#d4d2d2'
  },
  card: {
    marginTop:'15px'
  },
  title: {
    fontSize: '2.6em',
    fontWeight: 'bold'
  },
  heading: {
    fontSize: '1.9em',
    fontWeight: 'bold',
    margin: '10px'
  },
  description: {
    fontSize: '1.3em',
    margin: '8px'
  }
}

class ResultDetail extends Component {
  constructor(props){
      super(props)

      this.state = {
        elg_info_open: false,
        tab_value: 0,
        study: '',
        contact: '',
        gettingStudy: true
      }
  }

  getStudy(facilityId) {
    axios.post("/api/resultDetails", facilityId)
      .then((results) => {
        this.setState({ 
          study: results.data.study[0],
          contact: results.data.contact[0],
        });
        this.setState({
          gettingStudy: false
        })
      })
  }

  handleToggle() {
    const currStat=this.state.elg_info_open;
    this.setState({elg_info_open: !currStat});
  };
  handleTabChange(event, value) {
    this.setState({
      tab_value: value,
    });
  };

  render(){
    const { classes } = this.props;
    return (
      <Grid container>
        <ComponentDidMount
          handler={() => {
            this.getStudy({facility_id: Number(this.props.match.params.facilityId)});
          }}
        >
        {!this.state.gettingStudy ? (
          <Paper style={{width:'100%'}} className={classes.resultDetails}>
            <Grid item xs>
              <Card className={classes.card}>
               <CardContent>

                  <Typography gutterBottom variant="h2" color="inherit" className={classes.title}>{this.state.study.brief_title}</Typography>
                  
                  <Typography component="body1" color="inherit" className={classes.description}>{this.state.study.description}</Typography>
                  <Typography variant="subtitle1" component="p" color="inherit" className={classes.description}>Trial Phase: {this.state.study.phase}</Typography>
                  <Typography component="body1" className="study-link" color="inherit" className={classes.description}>For more information visit: 
                  <a target="_blank" href={`https://clinicaltrials.gov/ct2/show/${this.state.study.nct_id}`}>
                  {` https://clinicaltrials.gov/ct2/show/${this.state.study.nct_id}`}
                  </a></Typography>
                  
                  <EmailModal study={this.state.study} contact={this.state.contact} />  
              </CardContent>
        
              </Card>
            </Grid>
          
            <Grid item xs>
              <ExpansionPanel className={classes.card}>
                <ExpansionPanelSummary className="incExTitle" expandIcon={<ExpandMoreIcon />}>
                    Click to view the Criteria for Participating in this study
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="criteria">
                  {this.state.study.criteria_inc.split(/\s{2,}-/).map((item,i) => <p key={i}>{item}</p>)} 
                  </div>
                  <div className="criteria">
                  {this.state.study.criteria_ex.split(/\s{2,}-/).map((item,i) => <p key={i}>{item}</p>)}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>

          <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            {/* Contact Info Section */}
            <Card className={classes.card}>
              <Typography gutterBottom variant="h2" color="inherit" className={classes.heading}>Contact Information</Typography>
              <CardContent>
                <Typography variant="subtitle2" style={{padding: '0px', fontSize: '1.5em' }} color="inherit">Facility Contact</Typography>
                  
                  {this.state.contact.facility_contact_name === null && this.state.contact.pi_name === null ? 
                    <List>
                      <ListItem style={{padding: '3px'}}>
                        <ListItemIcon className="material-icons">
                          <LocationIcon />
                        </ListItemIcon> 
                          {this.state.contact.city + ", " + this.state.contact.state + ", "+ this.state.contact.zip + " " + this.state.contact.country}
                      </ListItem>
                      <ListItem style={{padding: '3px'}}>
                        <ListItemIcon className="material-icons">
                          <StoreIcon />
                        </ListItemIcon> 
                          {this.state.contact.facility_name === null ? 'Please refer to the central contact' : this.state.contact.facility_name}
                      </ListItem>
                      <ListItem style={{padding: '3px'}}>
                        <ListItemIcon className="material-icons">
                          <PhoneIcon />
                        </ListItemIcon> 
                        {this.state.contact.facility_contact_phone === null ? 'Please refer to the central contact' : this.state.contact.facility_contact_phone}
                      </ListItem>
                    </List>
                    :
                    <List>
                      <ListItem style={{padding: '3px'}}>
                        <ListItemIcon className="material-icons">
                          <PersonIcon />
                        </ListItemIcon> 
                        {this.state.contact.facility_contact_name === null ? " Primary Investigator: " +this.state.contact.pi_name : this.state.contact.facility_contact_name}
                      </ListItem>
                      <ListItem style={{padding: '3px'}}>
                        <ListItemIcon className="material-icons">
                          <EmailIcon />
                        </ListItemIcon> {this.state.contact.facility_contact_email === null ? 'N/A' : this.state.contact.facility_contact_email}
                      </ListItem>
                      <ListItem style={{padding: '3px'}}>
                        <ListItemIcon className="material-icons">
                          <PhoneIcon />
                        </ListItemIcon> 
                        {this.state.contact.facility_contact_phone === null ? 'Please refer to the central contact' : this.state.contact.facility_contact_phone}
                      </ListItem>
                    </List>
                  }
            
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" style={{padding: '0px',fontSize: '1.5em'}} color="inherit">Central Contact</Typography>
                <List>
                  <ListItem style={{padding: '3px'}}><ListItemIcon className="material-icons"><StoreIcon /></ListItemIcon> {this.state.contact.central_contact_name === null ? 'N/A' : this.state.contact.central_contact_name}</ListItem>
                  <ListItem style={{padding: '3px'}}><ListItemIcon className="material-icons"><EmailIcon /></ListItemIcon> {this.state.contact.central_contact_email === null ? 'N/A' : this.state.contact.central_contact_email}</ListItem>
                  <ListItem style={{padding: '3px'}}><ListItemIcon className="material-icons"><PhoneIcon /></ListItemIcon> {this.state.contact.central_contact_phone === null ? 'N/A' : this.state.contact.central_contact_phone}</ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            {/* google map */}
            <Card className={classes.card}>
                  <iframe
                    title={"result-map"}
                    width={"600"}
                    height={"450"}
                    frameBorder={"0"}
                    src={this.state.facility_contact_name ?`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.state.contact.facility_name},${this.state.study.zip}` : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.state.study.zip}`}
                  >
                  </iframe>
            </Card>
          </Grid>
            <Grid item xs={12}>
              
              <Link to={`/results`}>
                <Button style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}} variant="extendedFab" size="large" fullWidth>Back to Results</Button>
              </Link>
            
            </Grid>
          </Grid>
        </Paper>

        ) : null }
        
        </ComponentDidMount>
      </Grid>
      
    )
  }
}

export default withStyles(styles)(ResultDetail);