import React from 'react'
import {withRouter} from "react-router-dom";
import { Helmet } from 'react-helmet'
import {Input} from "antd";
import QuestionCard from 'components/CleanUIComponents/QuestionCard'
import styles from './style.module.scss'

const { Search } = Input

class Questions extends React.Component {

  render() {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    const {history} = this.props;
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
                {data.map(item => (
                  <div className="col-lg-6">
                    <QuestionCard />
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

export default withRouter(Questions) 
