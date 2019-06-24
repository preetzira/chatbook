import React from 'react'

const ListItem = (props) => {
  return <li className={props.className ? props.className : 'list-group-item'}>
            {props.children}
         </li>
}

export default ListItem
