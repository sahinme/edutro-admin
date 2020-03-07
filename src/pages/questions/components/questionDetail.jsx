import React from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Avatar, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import moment from 'moment'
import { getSelectedQuestionRequest, createAnswerRequest } from 'redux/questions/actions'
import style from './style.module.scss'

const { Search } = Input
const { TextArea } = Input

const Message = ({ title, description, userName, createdDate, entityType }) => (
  <div className={`${style.message} ${entityType === (10 || 20) ? style.me : style.companion}`}>
    <div>
      <Avatar size="50" border="false" />
    </div>
    <div className={style.messageContent}>
      <strong>{userName}</strong>
      <strong className={style.date_time}>{moment(createdDate).format('LLL')}</strong>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  </div>
)

@connect(({ selectedQuestion }) => ({ selectedQuestion }))
class QuestionDetail extends React.Component {
  state = {
    description: '',
  }

  componentDidMount() {
    moment.locale('tr')
    const { match: { params: { id } = {} } = {}, getSelectedQuestion } = this.props
    getSelectedQuestion({ id })
  }

  onChange = e => {
    this.setState({ description: e.target.value })
  }

  onClick = () => {
    const { match: { params: { id } = {} } = {}, sendMessage } = this.props
    const { description } = this.state
    const values = { questionId: id, description }
    sendMessage(values)
  }

  render() {
    const { selectedQuestion } = this.props
    const { data } = selectedQuestion
    return (
      <div>
        <Helmet title="Soru-Cevap" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Soru-Cevap Detayi</strong>
            </div>
          </div>
          <div className="card-body">
            <Search placeholder="mesajlari arayin..." style={{ width: '100%' }} />
            {data && (
              <Message
                entityType={30}
                userName={data.userName}
                createdDate={data.createdDate}
                description={data.description}
                title={data.title}
              />
            )}
            {data &&
              data.answers &&
              data.answers.map(item => {
                return (
                  <Message
                    id={item.id}
                    userName={item.userName}
                    createdDate={item.createdDate}
                    description={item.description}
                    entityType={item.entityType}
                    title={item.title}
                  />
                )
              })}
            <div className="form-group">
              <TextArea
                maxlength="160"
                placeholder="Eğitim hakkında kısa-özet bilgi"
                rows={3}
                onChange={this.onChange}
                id="shortDescription"
              />
            </div>
            <div className="col-lg-12">
              <div className="form-actions">
                <Button
                  style={{ float: 'right' }}
                  onClick={this.onClick}
                  type="primary"
                  className="mr-2"
                >
                  Mesaj Gönder
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getSelectedQuestion: payload => dispatch(getSelectedQuestionRequest(payload)),
  sendMessage: payload => dispatch(createAnswerRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(QuestionDetail)
