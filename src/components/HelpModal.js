import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
        const actions = [
        <FlatButton
            primary={true}
            onClick={this.handleClose}
            style={{backgroundColor: "#3b4e8c", hoverColor: "#20759c", marginTop:"20px", margin:"10px", color:'#fff'}}
        >
            Close
        </FlatButton>
        ];

        return (
        <div style={{marginTop:'20px'}}>
            <a
                onClick={this.handleOpen}
                style={{color: "#21749b",fontSize:"2em"}}
             >
                What does this question mean?
             </a>
            <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentStyle={{width: "60%", maxWidth:"60%",fontSize: '2em'}}
            >
                <h2 style={{fontSize: '2em', fontWeight:'bold'}}>What does this question mean?</h2>
                {this.props.helpText.map((help, i) => (
                    <p key={i} style={{fontSize: '1.8em'}}>
                        {help}
                    </p>
                ))}
            </Dialog>
        </div>
        );
    }
}