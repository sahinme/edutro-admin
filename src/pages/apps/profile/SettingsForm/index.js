import React from 'react'
import { Form, Icon, Input, Button, Upload, Select } from 'antd'
import { Editor } from '@tinymce/tinymce-react'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input


@Form.create()
class SettingsForm extends React.Component {
  state = { aboutUs: null }



  handleEditorChange = content => {
    this.setState({ aboutUs: content })
  }

  render() {
    const { form, data } = this.props
    const { aboutUs } = this.state;
    return (
      <Form style={{ marginLeft: "10px" }} onSubmit={this.handleSubmit} className="login-form">
        <h5 className="text-black mt-4">
          <strong>Genel Bilgiler</strong>
        </h5>
        <div className="row">
          <div className="col-lg-5">
            <FormItem label="Kullacı Adı">
              {form.getFieldDecorator('userName', {
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-5">
            <FormItem label="E-Posta">
              {form.getFieldDecorator('email', {
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-5">
            <FormItem label="İsim">
              {form.getFieldDecorator('tenantName', {
                initialValue: data && data.tenantName,
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-5">
            <FormItem label="Title">
              {form.getFieldDecorator('title', {
                initialValue: data && data.title,
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-5">
            <FormItem label="Telefon Numarası">
              {form.getFieldDecorator('phoneNumber', {
                initialValue: data && data.phoneNumber,
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
          <div className="col-lg-5">
            <FormItem label="Telefon Numarası-2">
              {form.getFieldDecorator('phoneNumber2', {
                initialValue: data && data.phoneNumber2,
                rules: [{ required: false }],
              })(<Input />)}
            </FormItem>
          </div>
        </div>
        <h5 className="text-black mt-4">
          <strong>Adres Bilgileri</strong>
        </h5>
        <div className="row">
          <div className="col-lg-5">
            <FormItem label="Lokasyon">
              {form.getFieldDecorator('location')(<Select defaultValue="Option1">
                <Option value="1">Ankara</Option>
                <Option value="hafta">İstanbul</Option>
              </Select>)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem label="Açık Adres">
              {form.getFieldDecorator('address', {
                initialValue: data && data.address
              })(<TextArea rows={3} id="product-edit-fulldescr" />)}
            </FormItem>
          </div>
        </div>
        <div style={{ marginLeft: "10px" }} className="row">
          <FormItem label="Hakkımızda Yazısı">
            {form.getFieldDecorator('description')(
              <Editor
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                                  alignleft aligncenter alignright alignjustify | \
                                  bullist numlist outdent indent | removeformat | help',
                }}
                initialValue={data.aboutUs}
                value={aboutUs}
                onEditorChange={this.handleEditorChange}
                rows={4}
              />,
            )}
          </FormItem>
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
