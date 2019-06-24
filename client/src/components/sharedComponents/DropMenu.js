import React from 'react'

const DropMenu = (props) => {
  return <div className="dropdown-menu" {...props}>
    {props.children}
  </div>
}

export default DropMenu
