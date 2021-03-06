import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Tag } from 'antd';
import moment from "moment";
import "moment/locale/tr";
import styles from './style.module.scss'

moment.locale('tr')

const ButtonGroup = Button.Group;

class CourseCard extends React.Component {
  state = {
    icon: '',
    name: '',
    number: '',
    type: '',
    sum: '',
    footer: '',
  }

  componentWillMount() {
    this.getParams()
  }

  getParams = () => {
    const params = this.props
    this.setState({
      ...params,
    })
  }

  render() {
    const { history, onDelete, icon, title, createdDate, isActive, price, locationName, id } = this.props;
    return (
      <a style={{ boxShadow: " 0 0 2.25rem #e1e1e1" }} href="javascript: void(0);" className={`card card--withShadow ${styles.paymentCard}`}>
        {price && <span className={styles.sum}>{price.toFixed(2) + " ₺"}</span>}
        {icon && (
          <div className={styles.icon}>
            <Tag className={icon} color={isActive ? "green" : "red"}>{isActive ? "Aktif" : "Askıda"}</Tag>
          </div>
        )}
        {title && <span className={styles.name}>{title}</span>}
        {<span className={styles.number}> <ButtonGroup>
          <Button
            onClick={() => history.push({
              pathname: `/egitimler/egitimlerim/${title.replace(/ /g, "-")
                .toLowerCase()}/${id}`,
            })}
            type="primary"
            ghost
          > Düzenle </Button>
          <Button onClick={onDelete} type="danger" ghost>Sil</Button>
        </ButtonGroup> </span>}
        {locationName && <span className={styles.type}>{locationName}</span>}
        {createdDate && <div className={styles.footer}>{"Oluşturulma tarihi: " + moment(createdDate).format("LL")}</div>}
      </a>
    )
  }
}

export default withRouter(CourseCard)
