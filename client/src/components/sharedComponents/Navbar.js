import React from 'react'
import ListGroup from './ListGroup'

const Navbar = (props) => {
  return <nav className={`navbar navbar-expand-${props.expand} ${props.className}`}>
            <a className="navbar-brand" href={props.link}>{props.brand}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-${props.justifyLinks}`} id="navbarNav">
              <ListGroup className="navbar-nav">
                {props.children}
              </ListGroup>
            </div>
         </nav>
}

export default Navbar
