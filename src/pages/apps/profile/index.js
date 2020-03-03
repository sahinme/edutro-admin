import React from 'react'
import { Button, Progress, Calendar, Tabs, LocaleProvider, Icon, Input, Menu } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter, Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/tr';
import trTr from 'antd/lib/locale-provider/tr_TR';
import Avatar from 'components/CleanUIComponents/Avatar'
import Donut from 'components/CleanUIComponents/Donut'
import { getProfileInfoRequest } from "redux/profile/actions";
import { getLocationsRequest } from 'redux/locations/actions'
import SettingsForm from './SettingsForm'
import data from './data.json'
import style from './style.module.scss'
import ChangePassword from './ChangePassword'

moment.locale('tr');


const { TabPane } = Tabs
const { TextArea } = Input

const actions = (
  <Menu>
    <Menu.Item>
      <Icon type="edit" /> Yazıyı Düzenle
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" /> Yazıyı Sil
    </Menu.Item>
    <Menu.Item>
      <Icon type="frown-o" /> İstenmeyen Olarak İşaretle
    </Menu.Item>
  </Menu>
)

@connect(({ profile }) => ({ profile }))
class ProfileApp extends React.Component {
  state = {
    name: '',
    nickname: '',
    photo: '',
    background: '',
    post: '',
    postsCount: '',
    followersCount: '',
    lastActivity: '',
    status: '',
  }

  componentWillMount() {
    this.setState({
      name: data.name,
      nickname: data.nickname,
      photo: data.photo,
      background: data.background,
      post: data.post,
      postsCount: data.postsCount,
      followersCount: data.followersCount,
      lastActivity: data.lastActivity,
      status: "Online",
      skills: data.skills,
      coursesEnd: data.coursesEnd,
      adress: data.adress,
      profSkills: data.profSkills,
      lastCompanies: data.lastCompanies,
      personal: data.personal,
      posts: data.posts,
    })
  }

  componentDidMount() {
    const { getProfileInfo, getLocations } = this.props;
    getProfileInfo({})
    getLocations({})
  }

  render() {
    const {
      name,
      nickname,
      photo,
      background,
      post,
      postsCount,
      followersCount,
      lastActivity,
      status,
      skills,
      coursesEnd,
      adress,
      profSkills,
      lastCompanies,
      personal,
      posts,
    } = this.state

    const { profile } = this.props;
    const { data } = profile;
    return (
      <div>
        <Helmet title="Profile" />
        {profile && profile.data ? <div className={style.profile}>
          <div className="row">
            <div className="col-xl-4">
              <div
                className={`card ${style.header}`}
                style={{ backgroundImage: `url(${background})` }}
              >
                <div>
                  <div className="card-body text-center">
                    <Avatar src={data.logoPath} size="110" border="true" borderColor="white" />
                    <br />
                    <br />
                    <Button.Group size="default">
                      <Button style={{ width: 150 }}>Takip Et</Button>
                      <Button style={{ width: 150 }}>Arkadaş Olarak Ekle</Button>
                    </Button.Group>
                    <br />
                    <p className="text-white mt-2">{`Last activity: ${lastActivity}`}</p>
                    <p className="text-white mt-2">
                      {status === 'Online' && <Donut type="success" name="Aktif" />}
                      {status === 'Offline' && <Donut type="danger" name={status} />}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3 text-black">
                    <strong>Takvim</strong>
                  </h5>
                  <LocaleProvider locale={trTr}>
                    <Calendar />
                  </LocaleProvider>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className={`card card-body mb-4 ${style.socialInfo}`}>
                <div>
                  <h2>
                    <span className="text-black mr-2">
                      <strong>{data.tenantName}</strong>
                    </span>
                    <small className="text-muted">{nickname}</small>
                  </h2>
                  <p className="mb-1">{post}</p>
                </div>
                <div className={style.socialCounts}>
                  <div className="text-center mr-3">
                    <h2>{data.courses.length}</h2>
                    <p className="mb-0">Eğitimler</p>
                  </div>
                  <div className="text-center">
                    <h2>{data.tenantEducators.length}</h2>
                    <p className="mb-0">Eğitmenler</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Tabs defaultActiveKey="1">
                    <TabPane
                      tab={
                        <span>
                          <i className="icmn-cog" /> Hesap Ayarları
                        </span>
                      }
                      key="1"
                    >
                      <SettingsForm data={data} />
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <i className="icmn-bubbles" /> Şifre
                        </span>
                      }
                      key="2"
                    >
                      <ChangePassword />
                    </TabPane>

                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div> : <div />}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileInfo: payload => dispatch(getProfileInfoRequest(payload)),
  getLocations: payload => dispatch(getLocationsRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(ProfileApp)