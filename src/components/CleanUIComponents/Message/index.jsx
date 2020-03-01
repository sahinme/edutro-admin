import React from 'react'
import { message } from 'antd'

export const error = content => {
  message.error(content)
}

export const success = content => {
  message.success(content)
}
