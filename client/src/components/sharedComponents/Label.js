import React from 'react'

const Label = (props) => {
  return <label {...props}>
            {props.value}
         </label>
}

export default Label
