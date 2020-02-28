import React from 'react'
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { Input, Result, Button } from "antd";
import { QuestionOutlined } from '@ant-design/icons';
import QuestionCard from 'components/CleanUIComponents/QuestionCard'
import { getEntityQuestionsRequest } from "../../redux/questions/actions";
import styles from './style.module.scss'

const { Search } = Input

@connect(({ questions }) => ({ questions }))
class Questions extends React.Component {

  componentDidMount() {
    debugger;
    const { getEntityQuestions } = this.props;
    getEntityQuestions({})
  }

  render() {
    const { questions } = this.props;
    const renderNoQuestion = (
      <Result
        style={{ width: "100%" }}
        icon={<QuestionOutlined />}
        title="Henüz soru sorulmamış"
      />
    )
    return (
      <div>
        <Helmet title="Soru-Cevap" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Soru-Cevaplar</strong>
            </div>
          </div>
          <div className="card-body">
            <Search placeholder="mesajlari arayin..." style={{ width: '100%' }} />
            <div className={styles.feed}>
              <div className="row">
                {questions && questions.data ? questions.data.map(item => (
                  <div className="col-lg-6">
                    <QuestionCard />
                  </div>
                )) : renderNoQuestion}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getEntityQuestions: payload => dispatch(getEntityQuestionsRequest(payload))
})

export default compose(connect(null, mapDispatchToProps), withRouter)(Questions)
