import React from 'react'

const Custom = (props) => {
  return <div className={props.className}>
            {props.children}
         </div>
}

export default Custom
