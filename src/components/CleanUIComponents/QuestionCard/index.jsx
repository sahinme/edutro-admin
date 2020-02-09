import React, { Component } from 'react'
import { Card } from 'antd'

class QuestionCard extends Component {
  render() {
    return (
      <div>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="NLP Egitimi hakkinda"
          extra={<a style={{color:"blue"}} href="#">Detaylar</a>}
        >
          kac para abi bi egitim
        </Card>
      </div>
    )
  }
}

export default QuestionCard
