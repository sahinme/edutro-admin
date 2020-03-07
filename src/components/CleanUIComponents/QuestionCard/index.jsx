import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Divider } from 'antd'
import moment from 'moment'

moment.locale('tr')

class QuestionCard extends Component {
  render() {
    const { history, title, description, createdDateTime, id } = this.props

    return (
      <div>
        <Card
          key={id}
          style={{ marginTop: 16 }}
          type="inner"
          title={title}
          extra={
            <div>
              <a
                style={{ color: 'blue' }}
                onClick={() => history.push(`/sorular/soru-detay/${id}`)}
                href="javascript: void(0);"
              >
                Detaylar
              </a>
              <Divider style={{ backgroundColor: 'black' }} type="vertical" />
              <a
                style={{ color: 'blue' }}
                onClick={() => history.push('/sorular/soru-detay')}
                href="javascript: void(0);"
              >
                Okundu olarak işaretle
              </a>
              <p> {moment(createdDateTime).format('LLL')} </p>
            </div>
          }
        >
          {description}
        </Card>
      </div>
    )
  }
}

export default withRouter(QuestionCard)
