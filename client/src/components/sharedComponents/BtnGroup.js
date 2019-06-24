import React from 'react'

const ButtonGroup = (props) => {
  return  <div className={`btn-group ${props.className}`}
               role="group"
               aria-label={props.ariaLabel ? props.ariaLabel : ""}
           >
               {props.children}
          </div>
}

export default ButtonGroup
