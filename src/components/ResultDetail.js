import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ResultsContainer from '../containers/ResultsContainer';
import ComponentDidMount from '../utils/ComponentDidMount';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import StoreIcon from '@material-ui/icons/Store';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EmailModal from './EmailModal';

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
    return (
      <div className="row detail-container">
        <ComponentDidMount
          handler={() => {
            this.getStudy({facility_id: Number(this.props.match.params.facilityId)});
          }}
        >
        {!this.state.gettingStudy ? (
          <div>
            <Card className="col-md-12 detail-topsection">

            <EmailModal study={this.state.study} contact={this.state.contact} />

            <CardContent>

              <Typography gutterBottom variant="headline" component="h2" className="detail-study-title">{this.state.study.brief_title}</Typography>
              <Typography component="p" className="detail-description" style={{fontSize:'1.2em'}}>{this.state.study.description}</Typography>
            </CardContent>
          </Card>

          <div className="row detail-midsection">
            <Card className="col-md-4 detail-phase">
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2"  className="detail-title">Trial Phase</Typography>
                <Typography component="p"  className="detail-study-phase" style={{fontSize: '2em'}}>{this.state.study.phase}</Typography>
              </CardContent>
            </Card>
            <Card className="col-md-4 detail-eligibility">
              <div>
                <Button
                  fullWidth={true} 
                  style={{margin:'50px auto'}} 
                  onClick={()=>{this.handleToggle()}}
                >
                  Eligibility Info
                </Button>
                <Dialog
                  title="Eligibility Information"
                  open={this.state.elg_info_open}
                  scroll="paper"
                  style={{height:'100%'}}
                >
                  <Tabs
                    value={this.state.tab_value}
                    id={this.state.tab_value}
                    onChange={(event, value) => this.handleTabChange(event, value)}
                  >
                    <Tab value={0} label="Inclusion Criteria"/> 
                    <Tab value={1} label="Exclusion Criteria"/>
                  </Tabs>
                  {this.state.tab_value === 0 && 
                  <div className="criteriaDiv">
                    {this.state.study.criteria_inc.split(/\s{2,}-/).map((item,i) => <p key={i}>{item}</p>)}
                  </div>
                    }
                    {this.state.tab_value === 1 && 
                  <div className="criteriaDiv">
                    {this.state.study.criteria_ex.split(/\s{2,}-/).map((item,i) => <p key={i}>{item}</p>)}
                  </div>
                    }
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{this.handleToggle()}}
                  >
                    Ok
                  </Button>
                </Dialog>
              </div>
            </Card>
            <Card className="col-md-4 detail-studylink">
              <a target="_blank" href={`https://clinicaltrials.gov/ct2/show/${this.state.study.nct_id}`}>
                Clinical Trials Page for {this.state.study.nct_id}
              </a>
            </Card>
          </div>

          <div className="row detail-endsection">
            {/* Contact Info Section */}
            <Card className="col-md-6 detail-contact">
              <Typography gutterBottom variant="headline" component="h2" className="detail-title">Contact Information</Typography>
              <CardContent>
                <Typography variant="subheading" style={{padding: '0px', fontSize: '1.5em' }}>Facility Contact</Typography>
                  
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
                <Typography variant="subheading" style={{padding: '0px'}} style={{fontSize: '1.5em'}}>Central Contact</Typography>
                <List>
                  <ListItem style={{padding: '3px'}}><ListItemIcon className="material-icons"><StoreIcon /></ListItemIcon> {this.state.contact.central_contact_name === null ? 'N/A' : this.state.contact.central_contact_name}</ListItem>
                  <ListItem style={{padding: '3px'}}><ListItemIcon className="material-icons"><EmailIcon /></ListItemIcon> {this.state.contact.central_contact_email === null ? 'N/A' : this.state.contact.central_contact_email}</ListItem>
                  <ListItem style={{padding: '3px'}}><ListItemIcon className="material-icons"><PhoneIcon /></ListItemIcon> {this.state.contact.central_contact_phone === null ? 'N/A' : this.state.contact.central_contact_phone}</ListItem>
                </List>
              </CardContent>
            </Card>

            {/* google map */}
            <Card className="col-md-6 detail-map">
                  <iframe
                    title={"result-map"}
                    width={"600"}
                    height={"450"}
                    frameBorder={"0"}
                    src={this.state.facility_contact_name ?`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.state.contact.facility_name},${this.state.study.zip}` : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.state.study.zip}`}
                  >
                  </iframe>
            </Card>
          </div>
          
          <div className="row detail-back-row" style={{fontSize: '20px', fontWeight: 'bold'}}>
            <div className="col-md-3"></div>
            <Link to={`/results`}>
              <Button className="col-md-6 detail-back" style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}}>Back to Results</Button>
            </Link>
          </div>
        </div>

        ) : null }
        
        </ComponentDidMount>
      </div>
      
    )
  }
}

export default ResultDetail;