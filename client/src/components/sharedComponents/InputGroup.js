import React from 'react'

const InputGroup = (props) => {
  return <div className="input-group">
            {props.left}
            {props.right}
         </div>
}

export default InputGroup
