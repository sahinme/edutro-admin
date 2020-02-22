import React from 'react'
import { Radio } from 'antd'
import { user } from './data.json'
import Avatar from '../../../components/CleanUIComponents/Avatar';
import styles from './style.module.scss'

class EducatorCard extends React.Component {
  static defaultProps = {
    type: '',
  }

  render() {
    const { type } = this.props
    return (
      <div
        className={`${styles.userCard} px-3 py-5 ${
          type.length > 0 ? `${styles.typed} bg-${type}` : ''
        }`}
      >
        <Avatar
          src={user.avatar}
          border
          borderColor={`${type.length > 0 ? 'white' : ''}`}
          size="90"
        />
        <div className="my-3 text-center">
          <div className={`${styles.userName} font-size-18`}>{user.name}</div>
          <div className={styles.post}>{user.post}</div>
        </div>
        <div className="text-center">
          <div className="btn-group text-center">
            <Radio.Group size="small">
              <Radio.Button value="default">Kaldir</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default EducatorCard
