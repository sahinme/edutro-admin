import React from 'react'
import { BackTop, Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import TopBar from 'components/LayoutComponents/TopBar'
import Menu from 'components/LayoutComponents/Menu'
import Footer from 'components/LayoutComponents/Footer'
import Breadcrumbs from 'components/LayoutComponents/Breadcrumbs'
import SpinLoading from 'components/LayoutComponents/Spin'
import Settings from 'components/LayoutComponents/Settings'
import Loader from 'components/LayoutComponents/Loader'

const mapStateToProps = ({ settings, loader }) => ({
  isBorderless: settings.isBorderless,
  isSquaredBorders: settings.isSquaredBorders,
  isFixedWidth: settings.isFixedWidth,
  isMenuShadow: settings.isMenuShadow,
  isMenuTop: settings.isMenuTop,
  loading: loader.loading
})

@withRouter
@connect(mapStateToProps)
class MainLayout extends React.PureComponent {
  render() {
    const {
      children,
      isBorderless,
      isSquaredBorders,
      isFixedWidth,
      isMenuShadow,
      isMenuTop,
      loading
    } = this.props
    return (
      <Layout
        className={classNames({
          settings__borderLess: isBorderless,
          settings__squaredBorders: isSquaredBorders,
          settings__fixedWidth: isFixedWidth,
          settings__menuShadow: isMenuShadow,
          settings__menuTop: isMenuTop,
        })}
      >
        <BackTop />
        <Menu />
        <Settings />
        <Layout>
          <Layout.Header>
            <TopBar />
          </Layout.Header>
          <Layout.Content style={{ height: '100%', position: 'relative' }}>
            <Breadcrumbs />
            {loading && <Loader />}
            <div className="utils__content">{children}</div>
          </Layout.Content>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
