import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {CTX} from './store';


const useStyles = makeStyles(theme => ({
  root: {
   margin:'50px',
    padding:'2 em',
  },
  flex: {
   display:'flex',
   },
  topicWindow: {
    width:'30%',
    height:'300px',
    borderRight:'1px solid gray'
    },
  chatWindow: {
    width:'70%',
    height:'300px',
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
}));



export default function Dashboard() {
  const classes = useStyles();
  const [allChats]=React.useContext(CTX);

  const topics= Object.keys(allChats);

  console.log(allChats);
  const [textValue,changeTextValue]=useState('');

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h4" component="h4">
          Chatingo
        </Typography>

        <Typography variant="h6" component="h6">
          Topic place holder
        </Typography>
        <div className={classes.flex}>
         
          <div className={classes.topicWindow}>
          <List>
           {
             topics.map(topic=>( <ListItem key={topic} button>
                <ListItemText primary={topic}/>
              </ListItem>))
            }
             
            </List>


           </div>

          <div className={classes.chatWindow}>
          {
             [{from:'user',msg:'hello'}].map((chat, i)=>(
               <div className={classes.flex} key={i}>
                   <Chip label={chat.from } className={classes.Chip}/>
                   <Typography variant="h6" component="h6">
                     {chat.msg}
                     </Typography>
               </div>
              ))
            }

           </div>

        </div>

        <div className={classes.flex}>
        
         
      <TextField
      className={classes.chatBox} 
       value={textValue} 
       onChange={e=>changeTextValue(e.target.value)}
      label="send message" />
      
   
        <Button variant="contained" color="primary">
        Send
      </Button>
      


        </div>


      </Paper>
     

        
        </div>
    
  )
}
