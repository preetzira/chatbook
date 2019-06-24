import React from 'react'

const Button = (props) => {
  const {value,className, ...propValues} = props
  return  <button
              className={`btn btn-${className}`}
              {...propValues}
          >
              {props.children ? props.children : value}
          </button>
}

export default Button
