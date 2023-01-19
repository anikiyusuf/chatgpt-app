// import logo from './logo.svg';
import './App.css';
 import React from 'react';

function App() {

  const [input , setInput] = React.useState("")
  const [chatLog , setChatLog] = React.useState([{
    user:"gpt",
    message:"We are writing code"
  } ]);



 //clearbutton
function clearChat(){
    setChatLog([])
}

 async  function  handleSubmit(e){
     e.preventDefault();
     setChatLog([...chatLog, {user:"me", message:`${input}`}])
     setInput("");
 const response = await fetch("http://localhost:3334/",{
  method:"POST",
  header:{
    "content-Type":"application/json"
  },
  body:JSON.stringify({
    message:chatLog.map((message)=> message.message).join("")
  })
 })
 const data = await response.json();
 setChatLog([...chatLog, {user:"gpt", message:`${data.message}`}])
}

  return (
    <div className="App">
        <aside className="sideMenu">
          <div className="side-menu-button" onClick={clearChat}>
           <span></span>
           New chat
           </div>
          </aside>
       <section className="chat-space">
       <div className="chat-log">
              {chatLog.map((message, index)=> (
                <ChatMessage  key={index}  message={message}/>
              ))}
        <div className="chat-message chatgpt">
        <div className="chat-message-center">
          <div className="avatar chatgpt">
          
          </div>
          <div className="message">
             I am an AI
          </div>
          </div>
        </div>
       </div>
          <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input 
              row="1" 
               value={input}
               onChange={(e)=> setInput(e.target.value)}
               className="chat-input-textarea"
              ></input>
            </form>
          </div>
       </section>
    </div>
  );
}


const ChatMessage=({ message }) =>{
  return(
    <div className={`chat-message ${message.user === "gpt" && "chatgpt" } `}>
        <div className="chat-message-center">
          <div className={`avatar ${message.user === "gpt" && "chatgpt" } `}>
          
          </div>
          <div className="message">
            {message.message}
          </div>
          </div>
        </div>
  )
}
export default App;