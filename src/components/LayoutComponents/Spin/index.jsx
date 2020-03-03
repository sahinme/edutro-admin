import React, { Component } from 'react'
import { Spin } from 'antd'

class SpinLoader extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '4px',
          marginBottom: '20px',
          padding: '30px 50px',
          margin: '20px 0',
          top: '50%',
        }}
        className="example"
      >
        <Spin />
      </div>
    )
  }
}

export default SpinLoader
