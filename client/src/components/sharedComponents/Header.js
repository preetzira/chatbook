import React from 'react'

const Header = (props) => {
  return <div className={props.className}>
            {props.content}
         </div>
}

export default Header
