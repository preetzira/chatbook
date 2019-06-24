import React from 'react'

const ListGroup = (props) => {
  return <ul className={props.className ? props.className : 'list-group' }>
            {props.children}
         </ul>
}

export default ListGroup
