import React from 'react'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import EditForm from './EditForm'

class EditBlogPost extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Yazıyı düzenle" />
        <section className="card">
          <div className="card-header mb-2">
            <div className="utils__title">
              <strong>Yazıyı Düzenle</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.addPost}>
              <EditForm />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default EditBlogPost
