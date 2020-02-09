import React from 'react'
import { Form, Icon, Input, Button, Upload, Select } from 'antd'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input


@Form.create()
class SettingsForm extends React.Component {
  state = {}

  render() {
    const { form } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h5 className="text-black mt-4">
          <strong>Genel Bilgiler</strong>
        </h5>
        <div className="row">
          <div className="col-lg-6">
            <FormItem label="Kullacı Adı">
              {form.getFieldDecorator('userName', {
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem label="E-Posta">
              {form.getFieldDecorator('email', {
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem label="İsim">
              {form.getFieldDecorator('tenantName', {
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem label="Title">
              {form.getFieldDecorator('title', {
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
        </div>
        <h5 className="text-black mt-4">
          <strong>Adres Bilgileri</strong>
        </h5>
        <div className="row">
          <div className="col-lg-6">
            <FormItem label="Lokasyon">
              {form.getFieldDecorator('password')(<Select defaultValue="Option1">
                <Option value="Option1">Ankara</Option>
                <Option value="hafta">İstanbul</Option>
              </Select>)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem label="Açık Adres">
              {form.getFieldDecorator('confirmpassword')(<TextArea rows={3} id="product-edit-fulldescr" />)}
            </FormItem>
          </div>
        </div>
        <div className="form-actions">
          <Button style={{ width: 150 }} type="primary" htmlType="submit" className="mr-3">
            Kaydet
          </Button>
          <Button htmlType="submit">İptal</Button>
        </div>
      </Form>
    )
  }
}

export default SettingsForm
