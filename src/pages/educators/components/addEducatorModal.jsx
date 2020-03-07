import React, { Component } from 'react'
import { Modal, Select, Spin, Avatar, Card } from 'antd'
import debounce from 'lodash/debounce'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { addEducatorRequest } from 'redux/tenant/actions'

const { Option } = Select
const { Meta } = Card

class AddEducatorModal extends Component {
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
  }

  state = {
    data: [],
    value: [],
    fetching: false,
    selectedUserId: null,
  }

  fetchUser = value => {
    console.log('fetching user', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    fetch(`https://test.radinyazilim.com/api/educator/get-educator-by-email?email=${value}`)
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        const data = body.map(user => ({
          text: `${user.name} ${user.surname}`,
          value: user.id,
          logoPath: user.logoPath,
          profession: user.profession,
        }))
        this.setState({ data, fetching: false })
      })
  }

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    })
  }

  handleOkButton = e => {
    const { selectedUserId } = this.state
    const educatorId = parseInt(selectedUserId, 10)
    const { addEducator, onCancel } = this.props
    addEducator({ educatorId })
    onCancel()
  }

  onSelect = e => {
    this.setState({ selectedUserId: e.key })
  }

  render() {
    const { visible, onCancel } = this.props
    const { fetching, data, value } = this.state
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>)
    return (
      <Modal
        title="Eğitmen Ekle"
        centered
        visible={visible}
        onOk={this.handleOkButton}
        onCancel={onCancel}
        okText="Gönder"
        cancelText="Vazgeç"
      >
        <p>Lütfen eklemek istediğiniz eğitmenin e-posta adresini giriniz</p>
        <Select
          showSearch
          labelInValue
          onSelect={this.onSelect}
          value={value}
          placeholder="E-posta adresi giriniz"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {data.map(d => (
            <Option key={d.value}>
              <p>{d.text}</p>
              <small>{d.profession}</small>
              {/*  <Card style={{ width: 300 }}>
                <Meta
                  avatar={<Avatar src={d.logoPath} />}
                  title={d.text}
                  description={d.profession}
                />
              </Card> */}
            </Option>
          ))}
        </Select>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addEducator: payload => dispatch(addEducatorRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(AddEducatorModal)
