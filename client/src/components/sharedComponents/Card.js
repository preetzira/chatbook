import React from 'react'

const Card = (props) => {
  return <div
            className={`card ${props.className}`}
         >
            {props.top}
            {props.body}
            {props.bottom}
         </div>
}

export default Card
