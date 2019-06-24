import React from 'react'

const Label = (props) => {
  return <label htmlFor={props.htmlFor}>
            {props.value}
         </label>
}

export default Label
