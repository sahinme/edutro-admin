import React from 'react'
import { Pagination, Button, Divider } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { NotFound } from 'components/CleanUIComponents/NotFound'
import styles from './style.module.scss'
import { getTenantEducatorsRequest } from "../../redux/educators/actions";
import EducatorCard from "./components/educatorCard";
import AddEducatorModal from "./components/addEducatorModal";


@connect(({ educators }) => ({ educators }))
class Educators extends React.Component {
  state = {
    visible: false,
  }

  componentDidMount() {
    const { getTenantEducators } = this.props;
    getTenantEducators({});
  }

  showEducatorModal = () => {
    this.setState({ visible: true });
  }

  closeModal = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { educators } = this.props;
    return (
      <div>
        <Helmet title="Eğitimler" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Ekli Eğitmenler</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.feed}>
              <div className="row" style={{ justifyContent: "flex-end" }}>
                <div style={{ textAlign: "right" }} className="col-lg-4">
                  <Button onClick={this.showEducatorModal} type="primary">Eğitmen Ekle</Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                {educators && educators.data && educators.data.length > 0 ? educators.data.map(item => (
                  <div className="col-lg-4">
                    <EducatorCard id={item.id} name={item.name} surname={item.surname} profession={item.profession} logoPath={item.profileImagePath}></EducatorCard>
                  </div>
                )) : <NotFound onClick={this.showEducatorModal} title="Ekli eğitmeniniz bulunmuyor" subTitle="Beraber çalıştığınız eğitmenleri hemen ekleyin" status="404" extra="Eğitmen Ekle" />}
              </div>
            </div>
          </div>
          <AddEducatorModal onCancel={this.closeModal} visible={visible} />
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getTenantEducators: payload => dispatch(getTenantEducatorsRequest(payload))
})

export default compose(connect(null, mapDispatchToProps), withRouter)(Educators)
