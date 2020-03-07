import React from 'react'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { Input } from 'antd'
import { getEntityNotificationsRequest } from 'redux/notification/actions'
import { NotFound } from 'components/CleanUIComponents/NotFound'
import styles from './style.module.scss'
import NotificationCard from './components/notificationCard'

@connect(({ notifications }) => ({ notifications }))
class Notifications extends React.Component {
  componentDidMount() {
    const { getEntityNotifications } = this.props
    getEntityNotifications({})
  }

  render() {
    const { notifications } = this.props

    return (
      <div>
        <Helmet title="Bildirimler" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Bildirimler</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.feed}>
              <div className="row">
                {notifications && notifications.data && notifications.data.length > 0 ? (
                  notifications.data.map(item => (
                    <div className="col-lg-12">
                      <NotificationCard
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        isRead={item.isRead}
                      />
                    </div>
                  ))
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getEntityNotifications: payload => dispatch(getEntityNotificationsRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(Notifications)
