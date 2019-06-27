
import React, { useState, useEffect } from 'react'
import Card from './sharedComponents/Card'
import FormGroup from './sharedComponents/FormGroup'
import Label from './sharedComponents/Label'
import Input from './sharedComponents/Input'
import Button from './sharedComponents/Button'
import Alert from './sharedComponents/Alert'
import Spinner from './sharedComponents/Spinner'
import { Link,Redirect } from 'react-router-dom'
import { signupAction, checkLoginStatusAction } from '../actions/index'
import { connect } from 'react-redux'

const Signup = (props) => {
  const [userName,setUsername] = useState('')
  const [fullName,setFullname] = useState('')
  const [userEmail,setUseremail] = useState('')
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
    if(e.target.name == "username"){
      setUsername(e.target.value)
    } if(e.target.name == "fullname"){
      setFullname(e.target.value)
    } if(e.target.name == "useremail"){
      setUseremail(e.target.value)
    } if(e.target.name == "password") {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    if(userName !== "" && fullName !== "" && (/(.+)@(.+){2,}/.test(userEmail)) && password !== ""){
      props.dispatch(signupAction({userName,fullName,userEmail,password}))
    }
  }

  if(props.isSignedUp){
    return <Redirect to="/login"/>
  }

  if(props.isLoggedIn){
    return <Redirect to="/"/>
  }

  return <div className="row no-gutters">
          <div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto mt-5">
            <Card className="px-1 py-5"
              top={
                <>
                  <h3 className="text-secondary text-center mb-5">Sign up here</h3>
                  {props.signupError ? <Alert className="danger fade show" content={<><b>Error! </b>{props.signupError}</>}/> : null}
                </>
              }
              body={
                <form action="javascript:void(0)" onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                      <Input value={fullName} onChange={handleChange} type="text" id="fullname" name="fullname" className="form-control form-control-custom" placeholder="Enter your fullname here" aria-describedby="inputGroupPrepend" required/>
                      <Label htmlFor="fullname" value="Enter your fullname here"/>
                      <div className="invalid-tooltip">
                        Please enter the required field.
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-10 col-10 mx-auto">
                    <FormGroup className="form-label-group">
                      <Input value={userEmail} onChange={handleChange} type="email" id="useremail" name="useremail" className="form-control form-control-custom" placeholder="Enter your email address here" aria-describedby="inputGroupPrepend" required/>
                      <Label htmlFor="useremail" value="Enter your email address here"/>
                      <div className="invalid-tooltip">
                        Please enter a vaild email address.
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
                    <Button type="submit" className="outline-primary btn-lg form-control-custom" value={props.isLoading ? <Spinner className="border"/> : 'Sign up' } disabled={props.isLoading ? true : false }/>
                  </div>
                </form>
              }
              bottom={
                <div className="col-10 mx-auto mt-4">
                  <small>Already have an account? </small><Link to="/login" style={{fontSize:'15px'}}>Sign in here</Link>
                </div>
              }
            />
          </div>
         </div>
}

function mapStateToProps({state}){
  console.log(state);
  const { isLoading, isLoggedIn, isSignedUp, signupError } = state
  return { isLoading, isLoggedIn, isSignedUp, signupError }
}

export default connect(mapStateToProps)(Signup)
