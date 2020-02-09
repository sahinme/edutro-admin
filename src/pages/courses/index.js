import React from 'react'
import { Pagination } from 'antd'
import { Helmet } from 'react-helmet'
import CourseCard from 'components/CleanUIComponents/CourseCard'
import styles from './style.module.scss'
import RemoveCourseModal from './components/removeCourseModal'

class Courses extends React.Component {
  state = {
    visible: false,
  }

  handleDelete = () => {
    this.setState({ visible: true });
  }

  render() {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    const { visible } = this.state;
    return (
      <div>
        <Helmet title="Eğitimler" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Yayınlanan Eğitimler</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.feed}>
              <div className="row">
                {data.map(item => (
                  <div className="col-lg-4">
                    <CourseCard
                      onDelete={this.handleDelete}
                      icon="lnr lnr-bookmark"
                      name="NLP Eğitimi"
                      number="Ankara - Cankaya"
                      type="NLP"
                      footer="20.02.2020"
                      sum="499.99 ₺"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <Pagination defaultCurrent={1} total={50} />
              </div>
            </div>
          </div> 
          <RemoveCourseModal closeModal={() => this.setState({ visible: false })} onDelete={() => { }} visible={visible} />
        </section>
      </div>
    )
  }
}

export default Courses
