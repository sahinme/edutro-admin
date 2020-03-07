import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter } from "react-router-dom";
import { Menu, Dropdown } from 'antd'
import { getEntityNotificationsRequest } from "redux/notification/actions";

import styles from './style.module.scss'

@connect(({ notifications }) => ({ notifications }))
class HomeMenu extends React.Component {

  componentDidMount() {
    const { getEntityNotifications } = this.props;
    getEntityNotifications({});
  }

  render() {
    const { notifications } = this.props;

    const menuItem = (props) => {
      return <Menu.Item key={props.index} className={styles.item}>
        <i className={`${styles.icon} icmn-star-full`} />
        <div className={styles.inner}>
          <div className={styles.title}>
            <span className="pull-right">now</span>
            <a href="javascript: void(0);">
              {props.title}
            </a>
          </div>
          <div className={styles.descr}>
            {props.content}
          </div>
        </div>
      </Menu.Item>
    }

    const menu = (
      <Menu selectable={false} className={styles.activity}>
        {notifications && notifications.data && notifications.data.map((item, index) => {
          return menuItem({ ...item, index })
        })}
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          <i className="icmn-bubbles topbar__dropdownIcon" />
        </div>
      </Dropdown>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getEntityNotifications: payload => dispatch(getEntityNotificationsRequest(payload))
})

export default compose(connect(null, mapDispatchToProps), withRouter)(HomeMenu)
