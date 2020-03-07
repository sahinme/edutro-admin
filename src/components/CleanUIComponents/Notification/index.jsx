import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'

class NotificationList extends Component {
  render() {
    const { data } = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<NotificationOutlined />} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.content}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default NotificationList
