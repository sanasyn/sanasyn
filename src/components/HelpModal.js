import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class HelpModal extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            open: false,
          };

        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
  
    

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    render() {
        return (
        <div style={{marginTop:'20px'}}>
            <a
                onClick={this.handleOpen}
                style={{color: "#21749b",fontSize:"2em"}}
             >
                What does this question mean?
             </a>
            <Dialog
                modal={false}
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogTitle 
                    id="alert-dialog-title"
                >
                    {"What does this question mean?"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {this.props.helpText.map((help, i) => (
                    <div className="helpText" key={i}>
                        {help}
                    </div>
                ))}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={this.handleClose}
                        style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
                    >
                        Close
                    </Button>
                </DialogActions>

                
            </Dialog>
        </div>
        );
    }
}