import React, { Component } from 'react'
import { Modal, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import querystring from 'querystring'

const { Option } = Select

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
  }

  fetchUser = value => {
    console.log('fetching user', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    fetch(`https://localhost:5001/api/educator/get-educator-by-email?email=${value}`)
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        const data = body.map(user => ({
          text: `${user.name} ${user.surname}`,
          value: user.id,
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

  render() {
    const { visible, onCancel } = this.props
    const { fetching, data, value } = this.state
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>)
    return (
      <Modal
        title="Eğitmen Ekle"
        centered
        visible={visible}
        onOk={onCancel}
        onCancel={onCancel}
        okText="Gönder"
        cancelText="Vazgeç"
      >
        <Select
          mode="multiple"
          labelInValue
          value={value}
          placeholder="Select users"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {data.map(d => (
            <Option key={d.value}>{d.text}</Option>
          ))}
        </Select>
      </Modal>
    )
  }
}

export default AddEducatorModal
