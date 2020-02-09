import React from 'react'
import { Modal } from 'antd'

class RemoveCourseModal extends React.Component {
  render() {
    const { visible, onDelete, closeModal } = this.props
    return (
      <div>
        <Modal
          visible={visible}
          title="Kursu sil"
          okText="Sil"
          onCancel={closeModal}
          cancelText="Vazgeç"
          onOk={onDelete}
        >
          <h5>Bu kursu silmek istediğinize emin misiniz ?</h5>
        </Modal>
      </div>
    )
  }
}

export default RemoveCourseModal
