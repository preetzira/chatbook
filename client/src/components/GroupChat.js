
import React, { useState, useEffect } from 'react'
import Navbar from './sharedComponents/Navbar'
import ListGroup from './sharedComponents/ListGroup'
import ListItem from './sharedComponents/ListItem'
import InputGroup from './sharedComponents/InputGroup'
import Input from './sharedComponents/Input'
import Label from './sharedComponents/Label'
import Button from './sharedComponents/Button'
import Spinner from './sharedComponents/Spinner'
import Custom from './sharedComponents/Custom'
import ChatMessage from './ChatMessage'
import { Picker } from 'emoji-mart'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction, checkLoginStatusAction } from '../actions/index'
import { socket } from '../actions/groupchat'
import getEmotion from '../helpers/helper'
import 'emoji-mart/css/emoji-mart.css'

class GroupChat extends React.PureComponent {
  state = {
    message:"",
    messages:[],
    userTyping:"",
    visibleEmoji:false,
    isLoading:false,
    polaritySymbols: {positive:"😄",negative:"☹️",neutral:"🙂"},
    emotionSwitch:false
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

  toggleShowEmoji = () =>{
    this.setState({visibleEmoji:!this.state.visibleEmoji})
  }

  insertEmoji = emoji => {
    this.setState({message:`${this.state.message}${emoji.native}`})
  }

  toggleEmotionDetection = e => {
    this.setState({
      emotionSwitch:!this.state.emotionSwitch
    })
  }

  handleSubmit = (e) =>{
    if(!this.state.message) return
    this.setState({isLoading:true})
    const messageData = {
      group:this.group,
      message:this.state.message,
      user:this.user,
      time : Date.now()
    }
    if(this.state.emotionSwitch){
      Promise.resolve(getEmotion(this.state.message)).then((response)=>{
        messageData.message = `${this.state.message} ${this.state.polaritySymbols[response.polarity]}`
        socket.emit('group-message',messageData)
        this.setState({messages:[...this.state.messages,{...messageData,type:'sent'}],message:"",isLoading:false})
      })
    } else {
      socket.emit('group-message',messageData)
      this.setState({messages:[...this.state.messages,{...messageData,type:'sent'}],message:"",isLoading:false})
    }
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
                <div className="col-md-6 col-sm-12 mx-auto">
                  <ListGroup>
                    <ListItem>
                      <div className="clearfix">
                        <span className="float-left">{this.group}</span>
                        <Custom className="custom-switch float-right">
                          <Input type="checkbox"
                                 className="custom-control-input"
                                 id="toggle-emotion-detection"
                                 onChange={this.toggleEmotionDetection}
                                 checked={this.state.emotionSwitch}
                          />
                          <Label className="custom-control-label" htmlFor="toggle-emotion-detection" value="Emotion detection"/>
                        </Custom>
                      </div>
                    </ListItem>
                    <ListItem>
                      <ChatMessage user={this.user} data={this.state.messages}/>
                    </ListItem>
                    {this.state.isLoading ? <ListItem><Spinner className="border d-flex mx-auto text-primary" /></ListItem>: "" }
                    <ListItem>
                      <InputGroup left={
                          <div className="input-group-prepend">
                            <span className="input-group-text btn" onClick={this.toggleShowEmoji}>😄</span>
                          </div>
                        }
                        center={
                          <Input type="text"
                                 value={this.state.message}
                                 name="message"
                                 className="form-control"
                                 placeholder={this.state.userTyping ? this.state.userTyping : 'enter your message here'}
                                 onChange={this.handleChange}
                                 onKeyPress={this.handleEvent}
                                 autoFocus
                          />
                        }
                        right={
                          <div className="input-group-append">
                            <Button className="outline-info" value="Send" onClick={this.handleSubmit} />
                          </div>
                        }
                      />
                      { this.state.visibleEmoji ? <Picker onSelect={this.insertEmoji} style={{position:'absolute'}}/> : '' }
                    </ListItem>
                  </ListGroup>
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
