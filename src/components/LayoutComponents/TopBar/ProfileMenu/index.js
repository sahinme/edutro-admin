import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { withRouter } from "react-router-dom";
import { compose } from 'lodash/fp'
import { removeLocalStorage, readLocalStorage } from 'helpers';
import { getProfileInfoRequest } from "redux/profile/actions";

import styles from './style.module.scss'

@connect(({ profile }) => ({ profile }))
class ProfileMenu extends React.Component {
  state = {
    count: 7,
    entityData: {}
  }

  componentDidMount() {
    const loginInfo = readLocalStorage('loginInfo').entityData;
    this.setState({ entityData: loginInfo })
    const { getProfileInfo } = this.props;
    getProfileInfo({})
  }


  logout = () => {
    const { history } = this.props
    removeLocalStorage("loginInfo");
    history.push("/user/login");
  }

  render() {
    const { profile, history } = this.props
    const { entityData } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            Merhaba, {profile && profile.data && profile.data.tenantName}
          </strong>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              E-Posta:
            </strong>
            {" " + profile && profile.data && profile.data.email}
            <br />
            <strong>
              Telefon:
            </strong>
            {profile && profile.data && profile.data.phoneNumber || '-'}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={() => history.push("/profile")}>
            <i className={`${styles.menuIcon} icmn-user`} />
            Profili Düzenle
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.logout}>
            <i className={`${styles.menuIcon} icmn-exit`} />
            Çıkış Yap
          </a>
        </Menu.Item>

      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          <Badge count={2}>
            <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} size="large">
              {profile && profile.data && profile.data.tenantName.slice(0, 2)}
            </Avatar>
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileInfo: payload => dispatch(getProfileInfoRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(ProfileMenu)