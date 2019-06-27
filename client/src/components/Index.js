
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkLoginStatusAction } from '../actions/index'

const Index = (props) => {

  useEffect(()=>{
    props.dispatch( checkLoginStatusAction() )
  },[])

  if(!props.isLoggedIn){
    return <Redirect to="/login" />
  } else {
    return <Redirect to="/home" />
  }
}

function mapStateToProps({state}){
  const { isLoggedIn } = state
  return { isLoggedIn }
}

export default connect(mapStateToProps)(Index);
