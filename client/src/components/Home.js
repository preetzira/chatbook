
import React, { useEffect } from 'react'
import Navbar from './sharedComponents/Navbar'
import ListItem from './sharedComponents/ListItem'
import Button from './sharedComponents/Button'
import Spinner from './sharedComponents/Spinner'
import Groups from './Groups'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchGroupsAction, logoutAction, flushErrorMessageAction } from '../actions/index'
// import { socket } from '../actions/groupchat'

const Home = (props) => {

  useEffect(()=>{
    props.dispatch(fetchGroupsAction())
    props.dispatch(flushErrorMessageAction())
  },[])

  // if(!props.isLoggedIn){
  //   return <Redirect to="/login" />
  // }

  return <>
          <Navbar className="navbar-light bg-light mb-5" justifyLinks="end" brand="chatbook" link="/home" expand="sm">
            <ListItem className="nav-item">
              <Button className="danger btn-lg br-0 sign-out" onClick={ () => props.dispatch( logoutAction() ) } value={props.isLoading ? <Spinner className="border small"/> : 'Sign out' } disabled={props.isLoading ? true : false } />
            </ListItem>
          </Navbar>
          <div className="container">
            <div className="row mt-4">
                <div className="col-12">
                  <h3>Groups available</h3>
                </div>
                { props.groups.length ? <Groups groups={props.groups}/> : <Spinner className="border text-info mx-auto mt-5" style={{height:100,width:100}}/> }
             </div>
          </div>
         </>
}

function mapStateToProps({state}){
  const { isLoading, isLoggedIn, groups } = state
  return { isLoading, isLoggedIn, groups }
}

export default connect(mapStateToProps)(Home);
