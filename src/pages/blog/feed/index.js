import React from 'react'
import { Input, Icon, Button, Pagination } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { getEntityBlogPostRequest } from 'redux/blog/actions';
import { getCategoriesRequest } from 'redux/categories/actions'
import data from './data.json'
import PostCard from '../postCard'

import styles from './style.module.scss'

const { Search } = Input

@connect(({ blogPosts, categories }) => ({ blogPosts, categories }))
class BlogFeed extends React.Component {
  state = {
    articlesData: data.articlesData,
    articlesCategories: data.articlesCategories,
    latesArticlesData: data.latesArticlesData,
  }

  componentDidMount() {
    const { getEntityBlogPosts, getCategories } = this.props;
    getEntityBlogPosts({})
    getCategories({})
  }


  render() {
    const { articlesData, categories, latesArticlesData } = this.state
    const { blogPosts } = this.props;
    return (
      <div>
        <Helmet title="Blog Yazılarım" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Blog Yazıları</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.blogFeed}>
              <div className="row">
                <div className="col-lg-8">
                  <main>
                    {blogPosts && blogPosts.data && blogPosts.data.map(article => (
                      <PostCard data={article} />
                    ))}
                  </main>
                </div>
                <div className="col-lg-4">
                  <aside className={styles.sidebar}>
                    <div className={styles.partition}>
                      <div className={styles.partitionHead}>
                        <span className={styles.partitionName}>Ara</span>
                      </div>
                      <div className="input-group">
                        <Search
                          placeholder="Search ..."
                          enterButton={
                            <span>
                              <Icon type="search" /> Ara
                            </span>
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.partition}>
                      <div className={styles.partitionHead}>
                        <span className={styles.partitionName}>Kategoriler</span>
                      </div>
                      <ul className={styles.categoriesList}>
                        {categories && categories.data.map(x => (
                          <li className={styles.categoriesItem} key={x.id}>
                            <a className={styles.categoriesLink} href="javascript: void(0);">
                              {x.displayName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.partition}>
                      <div className={styles.partitionHead}>
                        <span className={styles.partitionName}>Son Yazılar</span>
                      </div>
                      {blogPosts && blogPosts.data && blogPosts.data.map(x => (
                        <article className={styles.latestPost} key={x.id}>
                          <div className={styles.latestImg}>
                            <a href="javascript: void(0);">
                              <img src={x.imagePath} alt={x.title} />
                            </a>
                          </div>
                          <div className={styles.latestData}>
                            <div className={styles.latestName}>
                              <h2>
                                <a href="javascript: void(0);">{x.title}</a>
                              </h2>
                            </div>
                            <ul className={`${styles.latestArticleMeta} ${styles.meta}`}>
                              <li className={styles.metaInf}>
                                <span className={styles.articleAuthor}>
                                  Tarafından{' '}
                                  <a href="javascript: void(0);">{x.entityDto.entityName}</a>
                                </span>
                              </li>
                              <li className={styles.metaInf}>
                                <span className={styles.articleDate}>
                                  {`${moment(x.createdDate).format('LL')} tarihinde`}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className={styles.partition}>
                      <div className={styles.partitionHead}>
                        <span className={styles.partitionName}>Takip Et</span>
                      </div>
                      <div className="input-group">
                        <Input
                          addonBefore={<Icon type="mail" />}
                          placeholder="Email adress"
                          size="default"
                        />
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getEntityBlogPosts: payload => dispatch(getEntityBlogPostRequest(payload)),
  getCategories: payload => dispatch(getCategoriesRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(BlogFeed)