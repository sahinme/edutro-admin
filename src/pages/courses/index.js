import React from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { Helmet } from 'react-helmet'
import { withRouter, Link } from "react-router-dom";
import CourseCard from 'components/CleanUIComponents/CourseCard'
import { NotFound } from 'components/CleanUIComponents/NotFound'
import { getTenantCoursesRequest } from "../../redux/course/actions";
import styles from './style.module.scss'
import RemoveCourseModal from './components/removeCourseModal'


export const durationTypes = [{ name: "saat", id: 1 }, { name: "gün", id: 2 }, { name: "hafta", id: 3 }, { name: "ay", id: 4 }, { name: "yıl", id: 5 }]

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
    const { courses, history } = this.props;
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
                {courses && courses.data && courses.data.length > 0 ? courses.data.map(item => (
                  <div className="col-lg-4">
                    <CourseCard
                      onDelete={this.handleDelete}
                      id={item.id}
                      icon="lnr lnr-bookmark"
                      title={item.title}
                      locationName={item.locationName}
                      shortDescription={item.shortDescription}
                      price={item.price}
                      createdDate={item.createdDate}
                    />
                  </div>
                )) : <NotFound onClick={() => history.push('/egitimler/egitim-olustur')} title="Oluşturulmuş eğitiminiz yok" subTitle="Eğitimleriniz duyurmaya hemen başlayın" status="404" extra="Eğitim Oluştur" />}
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