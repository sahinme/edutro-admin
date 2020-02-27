import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import { readLocalStorage } from 'helpers'
import Loader from 'components/LayoutComponents/Loader'
import PublicLayout from './Public'
import LoginLayout from './Login'
import MainLayout from './Main'

const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
}

@withRouter
@connect(({ auth }) => ({ auth }))
class IndexLayout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      auth,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'login'
      }
      return 'main'
    }

    const Container = Layouts[getLayout()]
    const isUserAuthorized = auth && auth.data && auth.data.token
    // const isUserLoading = user.loading
    const isLoginLayout = getLayout() === 'login'

    const BootstrappedLayout = () => {
      const loginData = readLocalStorage("loginInfo");
      // show loader when user in check authorization process, not authorized yet and not on login pages
      /*  if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
         return <Loader />
       } */
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && loginData === null) {
        return <Redirect to="/user/login" />
      }
      // redirect to main dashboard when user on login page and authorized
      if (isLoginLayout && isUserAuthorized) {
        return <Redirect to="/dashboard/alpha" />
      }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="Edutro Yönetim Paneli | %s" title="React Admin Template" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default IndexLayout
