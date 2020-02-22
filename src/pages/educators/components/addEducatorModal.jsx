import React, { Component } from 'react'
import { Modal, Select } from 'antd'
import jsonp from 'fetch-jsonp'
import querystring from 'querystring'

const { Option } = Select

let timeout
let currentValue

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    })
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const { result } = d
          const data = []
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0],
            })
          })
          callback(data)
        }
      })
  }

  timeout = setTimeout(fake, 300)
}

class AddEducatorModal extends Component {
  state = {
    data: [],
    value: undefined,
  }

  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }))
    } else {
      this.setState({ data: [] })
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { visible, onCancel } = this.props
    const { data, value } = this.state
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
          showSearch
          value={value}
          placeholder="Eklenecek eğitmenin kullanıcı adı"
          defaultActiveFirstOption={false}
          style={{ width: '100%' }}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          notFoundContent={null}
        >
          {options}
        </Select>
      </Modal>
    )
  }
}

export default AddEducatorModal
