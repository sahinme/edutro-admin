import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Divider } from 'antd'

class QuestionCard extends Component {
  render() {
    const { history } = this.props

    return (
      <div>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="NLP Egitimi hakkinda"
          extra={
            <div>
              <a
                style={{ color: 'blue' }}
                onClick={() => history.push('/sorular/soru-detay')}
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
            </div>
          }
        >
          kac para abi bi egitim
        </Card>
      </div>
    )
  }
}

export default withRouter(QuestionCard)
