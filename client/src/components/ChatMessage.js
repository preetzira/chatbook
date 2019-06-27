
import React from 'react'

class Message extends React.Component {
  shouldComponentUpdate(nextProps){
    return this.props.time !== nextProps.time
  }
  render(){
    const date = new Date(this.props.time)
    const time = `${date.toDateString()} ${date.toLocaleTimeString()}`
  return <div className="row no-gutters m-2">
            <div className={`col-12 ${this.props.type}`}>
              <span className={`message br-2`} style={{maxWidth:"60%"}}>
                { this.props.type== 'sent' ? "" : <small className="text-primary d-block">@{this.props.user}</small>}
                  {this.props.message}
                <small className="text-grey d-block" style={{fontSize:'8px'}}>{time}</small>
              </span>
            </div>
         </div>
       }
}

class ChatMessage extends React.Component{
  shouldComponentUpdate(nextProps){
    return this.props.data.length !== nextProps.data.length
  }
  componentDidUpdate(){
    const obj = document.getElementById('chats')
    obj.scrollTop = obj.scrollHeight
  }
  render(){
  return <div id="chats" style={{height:'350px',padding:"10px 20px",overflowY:'auto',overflowX:'hidden'}}>
            {this.props.data.map((data,id)=>{
              return <Message key={id} id={id} {...data}/>
            })}
         </div>
       }
}

export default ChatMessage
