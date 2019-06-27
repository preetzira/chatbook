
import React, { useState, useEffect } from 'react'
import Navbar from './sharedComponents/Navbar'
import ListGroup from './sharedComponents/ListGroup'
import ListItem from './sharedComponents/ListItem'
import InputGroup from './sharedComponents/InputGroup'
import Input from './sharedComponents/Input'
import Button from './sharedComponents/Button'
import Spinner from './sharedComponents/Spinner'
import Custom from './sharedComponents/Custom'
import ChatMessage from './ChatMessage'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction, checkLoginStatusAction } from '../actions/index'
import { socket } from '../actions/groupchat'

class GroupChat extends React.PureComponent {
  state = {
    message:"",
    messages:[],
    userTyping:""
  }

  componentDidMount(){
    if(!this.props.isLoggedIn){
        this.props.dispatch( checkLoginStatusAction() )
    }
    socket.on('new-group-message', (newMessage) => {
      if(newMessage.group === this.group){
        this.setState({messages:[...this.state.messages,{...newMessage,type:'received'}],userTyping:""})
      }
    })
    socket.on('user-typing',(user)=>{
      this.setState({userTyping:`${user} is typing...`})
    })
  }

  group = this.props.match.params.name
  user = Date.now().toString(32).substr(5)

  handleEvent = (e) =>{
    if(e.which == 13 && this.state.message.length){
      this.handleSubmit()
    } else {
      socket.emit('typing',this.user)
    }
  }

  handleChange = e => {
    this.setState({message:e.target.value})
  }


  handleSubmit = (e) =>{
    const messageData = {
      group:this.group,
      message:this.state.message,
      user:this.user,
      time : Date.now()
    }
    socket.emit('group-message',messageData)
    this.setState({messages:[...this.state.messages,{...messageData,type:'sent'}]})
    this.setState({message:""})
  }

render(){

  if(!this.props.isLoggedIn){
    return <Redirect to="/login" />
  }

  return <>
          <Navbar className="navbar-light bg-light mb-5" justifyLinks="end" brand="chatbook" link="/home" expand="sm">
            <ListItem className="nav-item">
              <Button className="danger btn-lg br-0 sign-out" onClick={ () => this.props.dispatch( logoutAction() ) } value={this.props.isLoading ? <Spinner className="border small"/> : 'Sign out' } disabled={this.props.isLoading ? true : false } />
            </ListItem>
          </Navbar>
          <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-3 col-sm-12">
                </div>
                <div className="col-md-6 col-sm-12">
                  <ListGroup>
                    <ListItem>
                      {this.group}
                    </ListItem>
                    <ListItem>
                      <ChatMessage user={this.user} data={this.state.messages}/>
                    </ListItem>
                    <ListItem>
                      <InputGroup left={
                          <Input value={this.state.message} type="text" placeholder={this.state.userTyping ? this.state.userTyping : 'enter your message here'} name="message" className="form-control" onChange={this.handleChange} onKeyPress={this.handleEvent} autoFocus/>
                        }
                        right={
                          <div className="input-group-append">
                            <Button className="outline-info" value="Send" onClick={this.handleSubmit} />
                          </div>
                        }
                      />
                    </ListItem>
                  </ListGroup>
                </div>
                <div className="col-md-3 col-sm-12">
                </div>
             </div>
          </div>
         </>
}}

function mapStateToProps({state}){
  const { isLoading, isLoggedIn } = state
  return { isLoading, isLoggedIn }
}

export default connect(mapStateToProps)(GroupChat);
