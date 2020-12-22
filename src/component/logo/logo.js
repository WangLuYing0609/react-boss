import React from 'react'
import logoImg from './logo.png'
import './logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className='logo-containter'>
        <img src={logoImg} alt="err"/> 
      </div>
    )
  }
}

export default Logo