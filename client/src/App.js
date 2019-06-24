import React from 'react';
import './App.css';
import './assets/floating-labels.css'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import GroupChat from './components/GroupChat'
import Index from './components/Index'
// import Button from './components/sharedComponents/Button'
// import Alert from './components/sharedComponents/Alert'
// import Badge from './components/sharedComponents/Badge'
// import ButtonGroup from './components/sharedComponents/BtnGroup'
// import ButtonToolbar from './components/sharedComponents/BtnToolbar'
// import Card from './components/sharedComponents/Card'
// import Image from './components/sharedComponents/Image'
// import CardBody from './components/sharedComponents/CardBody'
// import Header from './components/sharedComponents/Header'
// import Footer from './components/sharedComponents/Footer'
// import Collapse from './components/sharedComponents/Collapse'
// import Dropdown from './components/sharedComponents/Dropdown'
// import DropMenu from './components/sharedComponents/DropMenu'
// import Divider from './components/sharedComponents/Divider'
// import Input from './components/sharedComponents/Input'
// import Modal from './components/sharedComponents/Modal'
// import Navbar from './components/sharedComponents/Navbar'
// import ListGroup from './components/sharedComponents/ListGroup'
// import ListItem from './components/sharedComponents/ListItem'
// import Spinner from './components/sharedComponents/Spinner'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/group/:name" component={GroupChat} />
    </Router>
  );
}

export default App;
