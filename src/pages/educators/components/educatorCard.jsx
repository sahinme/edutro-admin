import React from 'react'
import { Radio, Tag } from 'antd'
import Avatar from '../../../components/CleanUIComponents/Avatar'
import styles from './style.module.scss'

class EducatorCard extends React.Component {
  static defaultProps = {
    type: '',
  }

  render() {
    const { type, name, surname, profession, logoPath, isAccepted } = this.props
    return (
      <div
        className={`${styles.userCard} px-3 py-5 ${
          type.length > 0 ? `${styles.typed} bg-${type}` : ''
        }`}
        style={!isAccepted ? { opacity: '0.5' } : null}
      >
        <Avatar src={logoPath} border borderColor={`${type.length > 0 ? 'white' : ''}`} size="90" />
        <div className="my-3 text-center">
          <div className={`${styles.userName} font-size-18`}>{name + ' ' + surname}</div>
          <div className={styles.post}>{profession}</div>
        </div>
        <div className="text-center">
          <div className="btn-group text-center">
            <Radio.Group size="small">
              {isAccepted ? (
                <Radio.Button value="default">Kaldir</Radio.Button>
              ) : (
                <Tag>Beklemede</Tag>
              )}
            </Radio.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default EducatorCard
