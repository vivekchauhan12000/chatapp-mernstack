import React,{useReducer} from 'react'
export const CTX = React.createContext();


/*
msg{
  from:'user'
  msg:'hi'
  topic:'general'
}
state{
  general{
{msg},{msg},{msg}
  }
   topic2{
{msg},{msg},{msg}
  }

}
*/
const initState={
  general:[
    {from:'user1',msg:'hi'},
    { from:'user2',msg:'hi'},
    { from:'user3',msg:'hi'},
    { from:'user4',msg:'hi'},
  ],
       topic2:[
        {from:'user1',msg:'hi'},
        { from:'user2',msg:'hi'},
        { from:'user3',msg:'hi'},
        { from:'user4',msg:'hi'},

       ]
   
}

const reducer = (state,action)=>{
  const {from,msg,topic}=action.payload
  switch(action.type){
    case'RECEIVE_MESSAGE':
    return{
          ...state,
          [topic]: [
           ...state[topic],
           {from:msg}
          ]
    }
    default:
        return state
  }
}

 function store(props) {

  const reducerHook = useReducer(reducer,initState);


  return (
    <CTX.Provider value={reducerHook}>
    {props.children}
    </CTX.Provider>
    
  )
}
export default store
