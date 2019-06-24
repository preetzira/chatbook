
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
import { logoutAction } from '../actions/index'
// import { sendGroupMessage, subscribeToTimer } from '../actions/groupchat'

const GroupChat = (props) => {

  const [message,setMessage] = useState('')

  if(!props.isLoggedIn){
    return <Redirect to="/login" />
  }

  return <>
          <Navbar className="navbar-light bg-light mb-5" justifyLinks="end" brand="chatbook" link="/home" expand="sm">
            <ListItem className="nav-item">
              <Button className="danger btn-lg br-0 sign-out" onClick={ () => props.dispatch( logoutAction() ) } value={props.isLoading ? <Spinner className="border small"/> : 'Sign out' } disabled={props.isLoading ? true : false } />
            </ListItem>
          </Navbar>
          <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-3 col-sm-12">
                </div>
                <div className="col-md-6 col-sm-12">
                  <ListGroup>
                    <ListItem>
                      group name
                    </ListItem>
                    <ListItem>
                      <ChatMessage style={{height:'300px',maxHeigt:'300px',overflowY:'auto',padding: '0px 5px',overflowX:'hidden'}} />
                    </ListItem>
                    <ListItem>
                      <InputGroup left={
                          <Input type="text" name="message" className="form-control" onUpdate={ (message) => setMessage(message) }/>
                        }
                        right={
                          <div className="input-group-append">
                            <Button className="outline-info" value="Send" onClick={ () => {} } />
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
}

function mapStateToProps({state}){
  const { isLoading, isLoggedIn } = state
  return { isLoading, isLoggedIn }
}

export default connect(mapStateToProps)(GroupChat);
