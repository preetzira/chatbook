
import React from 'react'

const Message = (props) => {
  return <div className="row no-gutters m-2">
            <div className={`col-12 ${props.className}`}>
              <span className={`message br-2`} style={{maxWidth:"60%"}}>Hello</span>
            </div>
         </div>
}

const ChatMessage = (props) =>{
  return <div {...props}>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
          <Message className="sent"/>
          <Message className="received"/>
         </div>
}

export default ChatMessage
