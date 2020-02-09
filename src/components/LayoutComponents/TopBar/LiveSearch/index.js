import React from 'react'
import { Input, Icon, Checkbox } from 'antd'
import { injectIntl } from 'react-intl'
import styles from './style.module.scss'

@injectIntl
class LiveSearch extends React.Component {
  state = {
    showSearch: false,
    searchText: '',
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  showLiveSearch = () => {
    setTimeout(() => {
      this.searchInput.focus()
    }, 100)
    this.setState({
      showSearch: true,
    })
  }

  changeSearchText = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  hideLiveSearch = () => {
    this.searchInput.blur()
    this.setState({
      showSearch: false,
      searchText: '',
    })
  }

  handleKeyDown = event => {
    const { showSearch } = this.state
    if (showSearch) {
      const key = event.keyCode.toString()
      if (key === '27') {
        this.hideLiveSearch()
      }
    }
  }

  handleNode = node => {
    this.searchInput = node
  }

  render() {
    const { showSearch, searchText } = this.state
    const {
      intl: { formatMessage },
    } = this.props
    return (
      <div className="d-inline-block mr-4">
        <Input
          className={styles.extInput}
          placeholder="kurs arayin"
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          style={{ width: 200 }}
          // onFocus={this.showLiveSearch}
        />
        <div
          className={`${
            showSearch ? `${styles.livesearch} ${styles.livesearchVisible}` : styles.livesearch
          }`}
          id="livesearch"
        >
          <button className={styles.close} type="button" onClick={this.hideLiveSearch}>
            <span className="utils__visibilityHidden">Закрыть</span>
            <i className="icmn-cross" />
          </button>
          <div className="container-fluid">
            <div className={styles.wrapper}>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src="resources/images/logo.png" alt="" />
              </div>
              <input
                type="search"
                className={styles.searchInput}
                value={searchText}
                onChange={this.changeSearchText}
                id="livesearchInput"
                placeholder="kurs arayin..."
                ref={this.handleNode}
              />
              <ul className={styles.options}>
                <li className={styles.option}>Press enter to search</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LiveSearch
