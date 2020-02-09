import React from 'react'
import { Button, notification } from 'antd'
import { FormattedMessage } from 'react-intl'
import HomeMenu from './HomeMenu'
import ProjectManagement from './ProjectManagement'
import IssuesHistory from './IssuesHistory'
import LiveSearch from './LiveSearch'
import BitcoinPrice from './BitcoinPrice'
import ProfileMenu from './ProfileMenu'
import LanguageSelector from './LanguageSelector'
import styles from './style.module.scss'
import PriceContactForm from './PriceContactForm'

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  })
}

class TopBar extends React.Component {
  state = {
    visible: false,
  }

  onCreate = () => {
    openNotificationWithIcon('success', 'mesaj', 'aciklama')
    this.setState({ visible: false })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state
    return (
      <div className={styles.topbar}>
        <div className="mr-auto">
          <LiveSearch />
        </div>
        <a target="_blank" rel="noopener noreferrer" className="mr-4 d-none d-sm-inline">
          <Button onClick={() => this.setState({ visible: true })} type="danger">
            Paket Yükselt
          </Button>
        </a>
        <div className="mr-4">
          <BitcoinPrice />
        </div>
        <div className="mr-4">
          <HomeMenu />
        </div>
        <ProfileMenu />
        <PriceContactForm visible={visible} onCreate={this.onCreate} closeModal={this.closeModal} />
      </div>
    )
  }
}

export default TopBar
