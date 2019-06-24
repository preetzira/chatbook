import React from 'react'

const Image = (props) => {
  const {alt,src, ...prop} = props
  return  <img src={src} alt={alt} {...prop}/>
}

export default Image
