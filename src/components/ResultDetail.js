import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ResultsContainer from '../containers/ResultsContainer';
import ComponentDidMount from '../utils/ComponentDidMount';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

class ResultDetail extends Component {
  constructor(props){
      super(props)

      this.state = {
        elg_info_open: false,
        tab_value:'include',
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
  handleTabChange(value) {
    this.setState({
      tab_value: value,
    });
  };

  render(){
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={()=>{this.handleToggle()}}
      />
    ];
    
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
            <CardTitle className="detail-study-title">{this.state.study.brief_title}</CardTitle>
            <CardText className="detail-description" style={{fontSize:'1.2em'}}>{this.state.study.description}</CardText>
          </Card>

          <div className="row detail-midsection">
            <Card className="col-md-4 detail-phase">
              <CardTitle className="detail-title">Trial Phase</CardTitle>
              <CardText className="detail-study-phase" style={{fontSize: '2em'}}>{this.state.study.phase}</CardText>
            </Card>
            <Card className="col-md-4 detail-eligibility">
              <div>
                <RaisedButton label="Eligibility Info" fullWidth={true} style={{margin:'50px auto'}} onClick={()=>{this.handleToggle()}} />
                <Dialog
                  title="Eligibility Information"
                  actions={actions}
                  modal={true}
                  open={this.state.elg_info_open}
                  autoScrollBodyContent={true}
                  contentStyle={{height:'100%'}}
                >
                  <Tabs
                    value={this.state.tab_value}
                    onChange={()=>{this.handleTabChange()}}
                  >
                    <Tab label="Inclusion Criteria" value="include">
                      <div>
                      {this.state.study.criteria_inc.split(/\s{2,}-/).map((item,i) => <p key={i}>{item}</p>)}
                      </div>
                    </Tab> 
                    <Tab label="Exclusion Criteria" value="exclusion">
                      <div>
                        {this.state.study.criteria_ex.split(/\s{2,}-/).map((item,i) => <p key={i}>{item}</p>)}
                      </div>
                    </Tab>
                  </Tabs>

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
              <CardTitle className="detail-title">Contact Information</CardTitle>
              <CardText>
                <CardTitle style={{padding: '0px'}} subtitleStyle={{fontSize: '1.5em'}} subtitle="Facility Contact" />
                  
                  {this.state.contact.facility_contact_name === null && this.state.contact.pi_name === null ? 
                    <List>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">import_contacts</FontIcon> {this.state.contact.city + ", " + this.state.contact.state + ", "+ this.state.contact.zip + " " + this.state.contact.country}</ListItem>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">store</FontIcon> {this.state.contact.facility_name === null ? 'Please refer to the central contact' : this.state.contact.facility_name}</ListItem>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">phone</FontIcon> {this.state.contact.facility_contact_phone === null ? 'Please refer to the central contact' : this.state.contact.facility_contact_phone}</ListItem>
                    </List>
                    :
                    <List>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">store</FontIcon> {this.state.contact.facility_name}</ListItem>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">person</FontIcon> 
                    {this.state.contact.facility_contact_name === null ? " Primary Investigator: " +this.state.contact.pi_name : this.state.contact.facility_contact_name}</ListItem>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">email</FontIcon> {this.state.contact.facility_contact_email === null ? 'N/A' : this.state.contact.facility_contact_email}</ListItem>
                    <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">phone</FontIcon> {this.state.contact.facility_contact_phone === null ? 'Please refer to the central contact' : this.state.contact.facility_contact_phone}</ListItem>
                    </List>
                  }
            
              </CardText>
              <CardText>
                <CardTitle style={{padding: '0px'}} subtitleStyle={{fontSize: '1.5em'}} subtitle="Central Contact" />
                <List>
                  <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">person</FontIcon> {this.state.contact.central_contact_name === null ? 'N/A' : this.state.contact.central_contact_name}</ListItem>
                  <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">email</FontIcon> {this.state.contact.central_contact_email === null ? 'N/A' : this.state.contact.central_contact_email}</ListItem>
                  <ListItem innerDivStyle={{padding: '3px'}}><FontIcon className="material-icons">phone</FontIcon> {this.state.contact.central_contact_phone === null ? 'N/A' : this.state.contact.central_contact_phone}</ListItem>
                </List>
              </CardText>
            </Card>

            {/* google map */}
            <Card className="col-md-6 detail-map">
              <CardMedia>
          
                {this.state.facility_contact_name ?
                  <iframe
                    title={"result-map"}
                    width={"600"}
                    height={"450"}
                    frameBorder={"0"}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.state.contact.facility_name},${this.state.study.zip}`}
                  >
                  </iframe>
                :
                  <iframe
                  title={"result-map"}
                  width={"600"}
                  height={"450"}
                  frameBorder={"0"}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0&q=${this.state.study.zip}`}>
                  </iframe>
                }

            </CardMedia>
            </Card>
          </div>
          
          <div className="row detail-back-row" style={{fontSize: '20px', fontWeight: 'bold'}}>
            <div className="col-md-3"></div>
            <Link to={`/results`}>
              <FlatButton className="col-md-6 detail-back" style={{backgroundColor: "#6ab6c5", hoverColor: "#b8e2ea", marginTop:"20px"}}>Back to Results</FlatButton>
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