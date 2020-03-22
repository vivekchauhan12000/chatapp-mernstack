import React, { Component } from "react";
import io from "socket.io-client";


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




const classes = {
  root: {
   margin:'50px',
    padding:'2 em',
  },
  flex: {
   display:'flex',
   },
  topicWindow: {
    width:'30%',
    height:'500px',
    borderRight:'1px solid gray'
    },
  chatWindow: {
    width:'70%',
    height:'500px',
    padding:'10px',
      },
  chatBox: {
    width:'85%',
    padding:'4px',
        },
  button: {
    width:'15%',
    padding:'1px',
          },
  avatar:{
    display:'flex',
    padding:'10px',
  }    
};


const socket = io.connect("http://localhost:5000");

//const classes = useStyles.theme();
class Sock extends Component {

  
  constructor() {
    super();
    this.state = { msg: "", chat: [], nickname: "" };
  }

  componentDidMount() {
    socket.on("chat message", ({ nickname, msg }) => {
      this.setState({
        chat: [...this.state.chat, { nickname, msg }]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = () => {
    const { nickname, msg } = this.state;
    socket.emit("chat message", { nickname, msg });
    this.setState({ msg: "" });
  };

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ nickname, msg }, idx) => (
      <div className={classes.chatWindow} key={idx}>
          
         
      <div style={classes.avatar}>
          <Chip label={nickname} className={classes.Chip}/>
          <Typography variant="h6" component="h6">
          {msg}
            </Typography>
      </div>
      
      </div>
     
    ));
  }

  render() {
    return (
      <div  style={classes.root}>
          <Paper elevation={3}>
        <Typography variant="h4" component="h4">
          Chatingo
        </Typography>

        <Typography variant="h6" component="h6">
          Topic place holder
        </Typography>
        <div style={classes.flex}>
         
          <div style={classes.topicWindow}>
          <List>
          <Typography variant="h6" component="h6">
            Username
          </Typography>
          <TextField
          name="nickname"
          onChange={e => this.onTextChange(e)}
          value={this.state.nickname}
        />
            </List>


           </div>

          <div style={classes.chatWindow}>
          
           
               <div style={classes.flex}>
                  
                   <Typography variant="h6" component="h6">
                   {this.renderChat()}
                     </Typography>
               </div>
              
            

           </div>

        </div>

        <div style={classes.flex}>
        
         
      <TextField style={classes.chatBox}
     
      value={this.state.msg}
      onChange={e => this.onTextChange(e)}
      name="msg"
      label="send message" />
      
   
        <Button onClick={this.onMessageSubmit} style={classes.Button} variant="contained" color="primary">
        Send
      </Button>
      


        </div>


      </Paper>
      </div>
    );
  }
}

export default Sock;