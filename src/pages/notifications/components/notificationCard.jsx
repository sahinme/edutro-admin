import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { markAsReadNotificationRequest } from 'redux/notification/actions'

class NotificationCard extends Component {
  onMarkAsRead = () => {
    const { id, markAsReadNotification } = this.props
    markAsReadNotification({ id })
  }

  render() {
    const { title, content, isRead, id } = this.props
    return (
      <Card
        key={id}
        title={title}
        extra={
          <Button onClick={this.onMarkAsRead} key={id} type="primary" disabled={isRead}>
            Okundu Olarak İşaretle
          </Button>
        }
        bordered={true}
      >
        {content}
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  markAsReadNotification: payload => dispatch(markAsReadNotificationRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(NotificationCard)
