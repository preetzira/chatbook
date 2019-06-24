import React from 'react'

const FormGroup = (props) => {
  return <div className={props.className ? props.className : `from-group`}>
            {props.children}
         </div>
}

export default FormGroup
