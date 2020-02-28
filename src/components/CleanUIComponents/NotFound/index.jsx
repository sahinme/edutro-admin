import React from 'react'
import { Result, Button } from 'antd'

export const NotFound = ({ status, title, subTitle, extra, onClick }) => (
  <div style={{ width: '100%' }}>
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button onClick={onClick} type="primary">
          {extra}
        </Button>
      }
    />
  </div>
)
