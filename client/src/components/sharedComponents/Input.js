import React, { useState,useEffect } from 'react'

const Input = (props) => {
  const { onUpdate, ...prop } = props
  const [value,setValue] = useState(props.value?props.value:"");
  const handleChange = e => {
    setValue(e.target.value)
  }
  useEffect(()=>{
    if(onUpdate){
      props.onUpdate(value)
    }
  })
  return  <input value={value} onChange={handleChange} {...prop}/>
}

export default Input
