import React from 'react'
import { Comment, Avatar, Input } from 'antd'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'

const { Search } = Input
const data = [1, 1, 1, 1, 1, 1, 1, 1]
const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    content={
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
)

class QuestionDetail extends React.Component {
  render() {
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
            <div className={styles.feed}>
              <div className="row">
                {data.map(item => (
                  <div className="col-lg-12">
                    <ExampleComment>
                      <ExampleComment>
                        <ExampleComment />
                        <ExampleComment />
                      </ExampleComment>
                    </ExampleComment>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default QuestionDetail
