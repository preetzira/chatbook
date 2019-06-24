import React, { useState, useEffect } from 'react'

const Textarea = (props) => {
  const { onUpdate, ...prop } = props
  const [message,setMessage] = useState('')
  useEffect(()=>{
    if(onUpdate){
      props.onUpdate(message)
    }
  },[message])
  return <textarea className="form-control" onChange={(e)=>setMessage(e.target.value)} {...prop}></textarea>
}

export default Textarea
