import React from 'react'
import { Form, Modal, notification } from 'antd'

@Form.create()
class PriceContactForm extends React.Component {
  render() {
    const { visible, onCreate, closeModal, form } = this.props
    const { getFieldDecorator } = form
    return (
      <div>
        <Modal
          visible={visible}
          title="Paket Yükseltme Talebi"
          okText="Gönder"
          onCancel={closeModal}
          cancelText="Vazgeç"
          onOk={onCreate}
        >
          <h5>Paket Yükseltmek İçin İletişime Geçin</h5>
        </Modal>
      </div>
    )
  }
}

export default PriceContactForm
