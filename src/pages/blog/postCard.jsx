import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/tr'
import styles from './style.module.scss'

class PostCard extends Component {
  render() {
    const { data } = this.props
    return data ? (
      <article className={styles.article} key={data.id}>
        <div className={styles.information}>
          <div className={styles.title}>
            <h1>
              <Link to={`/yazi-duzenle/${data.id}`}>{data.title}</Link>
            </h1>
          </div>
          <ul className={styles.meta}>
            <li className={styles.metaInf}>
              <span>
                Tarafından{' '}
                <Link to={`/yazi-duzenle/${data.id}`}>
                  {data.entityDto && data.entityDto.entityName}
                </Link>
              </span>
            </li>
            <li className={styles.metaInf}>
              <span className={styles.articleDate}>{`${moment(data.createdDate).format(
                'LL',
              )} tarihinde yayınlandı`}</span>
            </li>
          </ul>
        </div>
        <div className={styles.articleMedia}>
          <a href="javascript: void(0);" className={styles.link}>
            <img src={data.imagePath} alt={data.title} />
          </a>
        </div>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: data.shortDescription }} />
          <div className={styles.articleMore}>
            <Button type="primary">
              Daha Fazla Oku
              <i className="ml-2 fa fa-angle-right" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className="row">
            {/*  <div className="col-8">
              <div className={styles.hashtags}>
                {data.tags.map(tag => (
                  <a href="javascript: void(0);" key={tag}>
                    {tag}
                  </a>
                ))}
              </div>
            </div> */}
            <div className="col-4">
              <ul className={styles.share}>
                <li className={styles.shareItem}>
                  <a href="javascript: void(0);">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li className={styles.shareItem}>
                  <a href="javascript: void(0);">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li className={styles.shareItem}>
                  <a href="javascript: void(0);">
                    <i className="fa fa-pinterest-p" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </article>
    ) : (
      <div></div>
    )
  }
}

export default PostCard
