
import React, { useState, useEffect } from 'react'
import Card from './sharedComponents/Card'
import FormGroup from './sharedComponents/FormGroup'
import Label from './sharedComponents/Label'
import Input from './sharedComponents/Input'
import Button from './sharedComponents/Button'
import Alert from './sharedComponents/Alert'
import Spinner from './sharedComponents/Spinner'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction, checkLoginStatusAction } from '../actions/index'

require('../actions/groupchat')

const Login = (props) => {
  const [userName,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [isVisible,setVisible] = useState(false)

  function validateFunc() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }
  useEffect(()=>{
    props.dispatch( checkLoginStatusAction() )
    window.addEventListener('load',validateFunc())
  },[])

  const handleChange = e => {
    if(e.target.name=="username"){
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = e => {
    if(userName !== "" && password !== ""){
      props.dispatch(loginAction({userName,password}))
    }
  }

  if(props.isLoggedIn){
    return <Redirect to="/home" />
  }

  return <div className="row no-gutters">
          <div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto mt-5">
            <Card className="px-1 py-5"
              top={
                <>
                  <h3 className="text-secondary text-center mb-5">Sign in here</h3>
                  {props.isSignedUp ? <Alert className="success fade show" content={<><b>Success! </b>Your account has been created successfully, kindly login here</>} closable/> : null}
                  {props.loginError ? <Alert className="danger fade show" content={<><b>Error! </b>{props.loginError}</>}/> : null}
                </>
              }
              body={
                <form action="javascript:void(0)" onSubmit={handleSubmit} method="POST" className="needs-validation" noValidate>
                  <div className="col-md-10 col-10 mx-auto">
                    <FormGroup className="form-label-group">
                      <Input value={userName} onChange={handleChange} type="text" id="username" name="username" className="form-control form-control-custom" placeholder="Enter your username here" aria-describedby="inputGroupPrepend" required/>
                      <Label htmlFor="username" value="Enter your username here"/>
                      <div className="invalid-tooltip">
                        Please enter the required field.
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-10 col-10 mx-auto">
                    <FormGroup className="form-label-group">
                      <span className={`view ${isVisible ? 'slash':''}`} onClick={()=>setVisible(!isVisible)}>{isVisible ? <>&#128065;</> : <>&#128065;</>}</span>
                      <Input value={password} onChange={handleChange} type={isVisible ? "text": "password"} id="password" name="password" className="form-control form-control-custom" placeholder="Enter your password here" aria-describedby="inputGroupPrepend" required/>
                      <Label htmlFor="password" value="Enter your password here"/>
                      <div className="invalid-tooltip">
                        Please enter the required field.
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-10 col-10 mx-auto">
                    <Button type="submit" className="outline-primary btn-lg form-control-custom" value={props.isLoading ? <Spinner className="border"/> : 'Sign in' } disabled={props.isLoading ? true : false }/>
                  </div>
                </form>
              }
              bottom={
                <div className="col-10 mx-auto mt-4">
                  <small>Need an account? </small><Link to="/signup" style={{fontSize:'15px'}}>Create here</Link>
                </div>
              }
            />
          </div>
         </div>
}

function mapStateToProps({state}){
  const { isLoading, isSignedUp, isLoggedIn, loginError } = state
  return { isLoading, isSignedUp, isLoggedIn, loginError }
}

export default connect(mapStateToProps)(Login);
