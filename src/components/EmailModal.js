import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class EmailModal extends React.Component {
    constructor(props){
      super(props)

      this.state = {
          open: false,
          emailStored: false,
          value: ''
        };

      this.handleChange = this.handleChange.bind(this);
    }
  
    checkStorageEmail() {
      let email = sessionStorage.getItem('sanasynEmail');
      if (email !== null) {
        this.setState({ emailStored: true, value: email})
      }
      else this.setState({ emailStored: false })
    }

    handleOpen() {
      this.checkStorageEmail();
      this.setState({open: true});
    };

    handleClose() {
      this.setState({open: false});
    };

    handleSubmitEmail(){
      sessionStorage.setItem('sanasynEmail', this.state.value);
      this.setState({ emailStored: true })
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    emailUser() {
      console.log("trying to email user....");
      let studyInfo = {
        study: this.props.study,
        contact: this.props.contact,
        userEmail: this.state.value
      }
      axios.post("/api/emailUser", studyInfo)
        .then(() => {
          console.log("Emailed user!")
          this.handleClose();
        })
    }

    render() {
        const actions1 = [
        <FlatButton
          primary={true}
          onClick={() => this.handleSubmitEmail()}
        style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
        >
          Submit Email
        </FlatButton>,
        <FlatButton
          primary={true}
          onClick={() => this.handleClose()}
          style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
        >
          Close
        </FlatButton>
        ];

        const actions2 = [
          <FlatButton
            primary={true}
            onClick={() => this.emailUser()}
            style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
          >
            Yes, send email
          </FlatButton>,
          <FlatButton
            primary={true}
            onClick={() => this.handleClose()}
            style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
          >
            Cancel
          </FlatButton>
          ];

        return (
        <div style={{marginTop:'20px'}}>
            <a
                onClick={() => this.handleOpen()}
                style={{color: "#21749b",fontSize:"2em"}}
             >
                Email this study to me
             </a>
             {
               !this.state.emailStored ?
              <Dialog
              actions={actions1}
              modal={false}
              open={this.state.open}
              onRequestClose={() => this.handleClose()}
              contentStyle={{width: "60%", maxWidth:"60%",fontSize: '2em'}}
              >
                <h2 style={{fontSize: '2em', fontWeight:'bold'}}>Email Me!</h2>
                <p style={{fontSize: '2em'}}>
                  To get this study information, please enter your email address here.</p>
                <input 
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Dialog>
              :
              <Dialog
              actions={actions2}
              modal={false}
              open={this.state.open}
              onRequestClose={() => this.handleClose()}
              contentStyle={{width: "60%", maxWidth:"60%",fontSize: '2em'}}
              >
                  <h2 style={{fontSize: '2em', fontWeight:'bold'}}>Send email to {this.state.value}?</h2>
              </Dialog>
             }
        </div>
        );
    }
}