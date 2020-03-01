import React from 'react'
import { Button, Table } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter, Link } from "react-router-dom";
import ChartCard from 'components/CleanUIComponents/ChartCard'
import CourseCard from 'components/CleanUIComponents/CourseCard'
import { getTenantCoursesRequest } from "redux/course/actions";
import { tableData } from './data.json'

@connect(({ courses }) => ({ courses }))
class DashboardAlpha extends React.Component {

  componentDidMount() {
    const { getTenantCourses } = this.props;
    getTenantCourses({})
  }

  render() {
    const { courses, history } = this.props;
    const tableColumns = [
      {
        title: 'Başlık',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Açıklama',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Tarih',
        dataIndex: 'createdDateTime',
        key: 'createdDateTime',
        sorter: (a, b) => a.createdDateTime - b.createdDateTime,
      },
    ]
    const { data } = courses;
    return (
      <React.Fragment>
        <Helmet title="Kontrol Paneli" />
        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Genel Veriler</strong>
        </div>
        <div className="row">
          <div className="col-xl-4">
            <ChartCard
              title="Tüm Eğitimler"
              amount="13"
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [2, 11, 8, 14, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-xl-4">
            <ChartCard
              title="Aktif Eğitimler"
              amount="5"
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [20, 80, 67, 120, 132, 66, 97],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-xl-4">
            <ChartCard
              title="Bildirimler"
              amount="8"
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [42, 40, 80, 67, 84, 20, 97],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Soru & Mesajlar</strong>
                  <Button onClick={() => history.push('/sorular')} className="ml-3">Tümünü Gör</Button>
                </div>
              </div>
              <div className="card-body">
                <Table
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  columns={tableColumns}
                  dataSource={tableData}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Eğitimlerim (3)</strong>
          <Button className="ml-3">Tümünü Gör</Button>
        </div>
        <div className="row">
          {data && data.length > 0 ? data.slice(0, 3).map(item => {
            return (
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
            )
          }) : <p>Aktif Eğitiminiz Bulunmamaktadır.</p>}
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getTenantCourses: payload => dispatch(getTenantCoursesRequest(payload))
})

export default compose(connect(null, mapDispatchToProps), withRouter)(DashboardAlpha)