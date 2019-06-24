import React from 'react'
import Button from './Button'

const Alert = (props) => {
  return <div  className={`alert alert-${props.className}`} role="alert">
    {props.content}
    {props.closable ?
      <Button type="button" className=" close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></Button>
      : null}
  </div>
}

export default Alert
