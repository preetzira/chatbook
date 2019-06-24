import React from 'react'

const Collapse = (props) => {
  return <div className="collapse" id={props.id}>
      {props.children}
    </div>
}

export default Collapse
