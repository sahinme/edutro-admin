import React from 'react'
import { Button, Progress, Calendar, Tabs, Upload, Icon, Input, Menu, Dropdown } from 'antd'
import { Helmet } from 'react-helmet'
import Avatar from 'components/CleanUIComponents/Avatar'
import Donut from 'components/CleanUIComponents/Donut'
import Chat from 'components/CleanUIComponents/Chat'
import SettingsForm from './SettingsForm'
import data from './data.json'
import style from './style.module.scss'
import ChangePassword from './ChangePassword'

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

    return (
      <div>
        <Helmet title="Profile" />
        <div className={style.profile}>
          <div className="row">
            <div className="col-xl-4">
              <div
                className={`card ${style.header}`}
                style={{ backgroundImage: `url(${background})` }}
              >
                <div>
                  <div className="card-body text-center">
                    <Avatar src={photo} size="110" border="true" borderColor="white" />
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
                  <Calendar fullscreen={false} />
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className={`card card-body mb-4 ${style.socialInfo}`}>
                <div>
                  <h2>
                    <span className="text-black mr-2">
                      <strong>{name}</strong>
                    </span>
                    <small className="text-muted">{nickname}</small>
                  </h2>
                  <p className="mb-1">{post}</p>
                </div>
                <div className={style.socialCounts}>
                  <div className="text-center mr-3">
                    <h2>{followersCount}</h2>
                    <p className="mb-0">Takipçiler</p>
                  </div>
                  <div className="text-center">
                    <h2>{postsCount}</h2>
                    <p className="mb-0">Yazılar</p>
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
                      <SettingsForm />
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
        </div>
      </div>
    )
  }
}

export default ProfileApp
