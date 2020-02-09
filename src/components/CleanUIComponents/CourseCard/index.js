import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd';
import styles from './style.module.scss'


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
    const { icon, name, number, type, footer, sum } = this.state
    const { history, onDelete } = this.props;
    return (
      <a href="javascript: void(0);" className={`card card--withShadow ${styles.paymentCard}`}>
        {sum && <span className={styles.sum}>{sum}</span>}
        {icon && (
          <div className={styles.icon}>
            <i className={icon} />
          </div>
        )}
        {name && <span className={styles.name}>{name}</span>}
        {<span className={styles.number}> <ButtonGroup>
          <Button onClick={() => history.push("/egitimler/egitim-duzenle")} type="primary" ghost>Düzenle</Button>
          <Button onClick={onDelete} type="danger" ghost>Sil</Button>
        </ButtonGroup> </span>}
        {type && <span className={styles.type}>{type}</span>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </a>
    )
  }
}

export default withRouter(CourseCard)
