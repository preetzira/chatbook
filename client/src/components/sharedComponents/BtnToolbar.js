import React from 'react'

const ButtonToolbar = (props) => {
  return <div
            className={`btn-toolbar ${props.className}`}
            role="toolbar"
            aria-label={props.ariaLabel ? props.ariaLabel : ""}
         >
            {props.children}
         </div>
}

export default ButtonToolbar
