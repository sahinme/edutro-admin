import React from 'react'
import { Pagination, Button , Divider} from 'antd'
import { Helmet } from 'react-helmet'
import CourseCard from 'components/CleanUIComponents/CourseCard'
import styles from './style.module.scss'
import EducatorCard from "./components/educatorCard";
import AddEducatorModal from "./components/addEducatorModal";

class Educators extends React.Component {
  state = {
    visible: false,
  }

  showEducatorModal = () => {
    this.setState({ visible: true });
  }

  closeModal = () => {
    this.setState({visible:false});
  }

  render() {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    const { visible } = this.state;
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
            <div className="row" style={{justifyContent:"flex-end"}}>
            <div style={{textAlign:"right"}} className="col-lg-4">
               <Button onClick={this.showEducatorModal} type="primary">Eğitmen Ekle</Button>
               </div>
              </div>
              <Divider></Divider>
              <div className="row">
                {data.map(item => (
                  <div className="col-lg-4">
                   <EducatorCard></EducatorCard>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <Pagination defaultCurrent={1} total={50} />
              </div>
            </div>
          </div> 
          <AddEducatorModal onCancel={this.closeModal} visible={visible} />
        </section>
      </div>
    )
  }
}

export default Educators
