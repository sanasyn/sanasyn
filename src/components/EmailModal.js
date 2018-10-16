import React,{Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */


const styles = {
  fontBlack:{
    color:"black"
  }
}


 class EmailModal extends Component {
    constructor(props){
      super(props)

      this.state = {
          open: false,
          emailStored: false,
          editEmail: false,
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

    editEmail() {
      this.setState({ editEmail:true })
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
      this.setState({ emailStored: true, editEmail:false })
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
      const { classes } = this.props;
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
              open={this.state.open}
              onClose={() => this.handleClose()}
              >
                <DialogTitle id="alert-dialog-title" color="inherit">{"Email Me!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" color="inherit">
                    To get this study information, please enter your email address below.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    InputProps={{disableUnderline: true, className:classes.fontBlack}}
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color='primary'
                    onClick={() => this.handleSubmitEmail()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Submit Email
                  </Button>
                  <Button
                    color='primary'
                    onClick={() => this.handleClose()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              :
              !this.state.editEmail ?
              <Dialog
              open={this.state.open}
              onClose={() => this.handleClose()}
              >
                <DialogTitle color="inherit">{"Send email to "}{this.state.value}{"?"}</DialogTitle>
                <DialogActions>
                  <Button
                    color='primary'
                    onClick={() => this.emailUser()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Yes, send email
                  </Button>,
                  <Button
                    color='primary'
                    onClick={() => this.editEmail()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Edit email
                  </Button>,
                  <Button
                    color='primary'
                    onClick={() => this.handleClose()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              :
              <Dialog
              open={this.state.open}
              onClose={() => this.handleClose()}
              >
                <DialogTitle>{"Edit email your email below"}</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    InputProps={{disableUnderline: true,className:classes.fontBlack}}
                    value={this.state.value}
                    onChange={this.handleChange}
                    className={classes.fontBlack}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color='primary'
                    onClick={() => this.handleSubmitEmail()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Submit Email
                  </Button>
                  <Button
                    color='primary'
                    onClick={() => this.handleClose()}
                    variant="contained"
                    // style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                  >
                    Close
                  </Button>
                </DialogActions>           
              </Dialog>
             }
        </div>
        );
    }
}

export default withStyles(styles)(EmailModal);