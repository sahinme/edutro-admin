import React from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { Helmet } from 'react-helmet'
import { withRouter } from "react-router-dom";
import CourseCard from 'components/CleanUIComponents/CourseCard'
import { getTenantCoursesRequest } from "../../redux/course/actions";
import styles from './style.module.scss'
import RemoveCourseModal from './components/removeCourseModal'


@connect(({ courses }) => ({ courses }))
class Courses extends React.Component {
  state = {
    visible: false,
  }

  componentDidMount() {
    const { getTenantCourses } = this.props;
    getTenantCourses({});
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

const mapDispatchToProps = dispatch => ({
  getTenantCourses: payload => dispatch(getTenantCoursesRequest(payload))
})

export default compose(connect(null, mapDispatchToProps), withRouter)(Courses)