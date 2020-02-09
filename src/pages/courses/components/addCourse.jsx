import React from 'react'
import {
  Input,
  Select,
  Button,
  Upload,
  DatePicker,
  message,
  Form,
  Checkbox,
  InputNumber,
  Icon,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Editor } from '@tinymce/tinymce-react'

const { Option } = Select
const InputGroup = Input.Group
const { TextArea } = Input
const FormItem = Form.Item

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

@Form.create()
class AddCourse extends React.Component {
  state = {
    loading: false,
    fullDescription:''
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      )
    }
  }

  onSubmit = event => {
    debugger;
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        const {fullDescription} = this.state;
        values.fullDescription= fullDescription;
        console.log(values)
      }
    })
  }

  handleEditorChange = content => {
      this.setState({ fullDescription: content });
  };

  render() {
    const { imageUrl, loading } = this.state

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { form } = this.props
    return (
      <div>
        <Helmet title="Eğitim Oluştur" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Eğitim Oluştur</strong>
            </div>
          </div>
          <div className="card-body">
            <Form onSubmit={this.onSubmit} className="mt-3">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Eğitim Adı">
                          {form.getFieldDecorator('title')(<Input placeholder="örn:resim kursu" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Kategori">
                          {form.getFieldDecorator('categoryId')(
                            <Select
                              id="product-edit-colors"
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="örn:sanat ve tasarım"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                              }
                            >
                              <Option value="blue">Kişisel Gelişim</Option>
                              <Option value="red">Yazılım</Option>
                              <Option value="green">Sanat</Option>
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Lokasyon">
                          {form.getFieldDecorator('locationId')(
                            <Select
                              id="product-edit-colors"
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="örn:Ankara"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                              }
                            >
                              <Option value="blue">Ankara</Option>
                              <Option value="red">İstanbul</Option>
                              <Option value="green">İzmir</Option>
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Açık Adres">
                          {form.getFieldDecorator('address')(
                            <Input placeholder="örn:Kızılay seminer salonu no:34/A" />,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <FormItem label="Kısa Özet">
                          {form.getFieldDecorator('shortDescription')(
                            <TextArea
                              placeholder="kurs kartı üzerindeki kısa açıklama"
                              rows={3}
                              id="product-edit-shordescr"
                            />,
                          )}
                        </FormItem>
                      </div>
                      <div className="form-group">
                        <FormItem label="Detaylı Tanım">
                          {form.getFieldDecorator('fullDescription')(
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
                              onEditorChange={this.handleEditorChange}
                              rows={4}
                            />,
                          )}
                        </FormItem>
                      </div>
                      <h4 className="text-black mt-2 mb-3">
                        <strong>Fiyatlandırma</strong>
                      </h4>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <FormItem label="Normal Fiyat">
                              {form.getFieldDecorator('totalPrice')(
                                <InputNumber
                                  style={{ width: '100%' }}
                                  min={0}
                                  placeholder="örn: 199.99"
                                />,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <FormItem label="İndirimli Fiyat">
                              {form.getFieldDecorator('discountPrice')(
                                <InputNumber
                                  style={{ width: '100%' }}
                                  min={0}
                                  placeholder="99.99"
                                />,
                              )}
                            </FormItem>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-black mt-2 mb-3">
                        <strong>Eğitim Özellikleri</strong>
                      </h4>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem label="Başlama Tarihi">
                              {form.getFieldDecorator('startDate')(
                                <DatePicker placeholder="tarih secin" />,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem label="Bitiş Tarihi">
                              {form.getFieldDecorator('endDate')(
                                <DatePicker placeholder="tarih secin" />,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <FormItem label="Eğitim Süresi">
                              {form.getFieldDecorator('duration')(
                                <InputGroup compact>
                                  <InputNumber min={1} placeholder="örn:3" />
                                  <Select defaultValue="Option1">
                                    <Option value="Option1">gün</Option>
                                    <Option value="hafta">hafta</Option>
                                    <Option value="ay">ay</Option>
                                    <Option value="yıl">yıl</Option>
                                  </Select>
                                </InputGroup>,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('certificate')(<Checkbox>Sertifika</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('certificateOfParticipation')(<Checkbox>Katılım Belgesi</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('onlineVideo')(<Checkbox>Online Video</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <FormItem label="Eğitim Görseli">
                              {form.getFieldDecorator('courseImage')(
                                <Upload
                                  name="avatar"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  beforeUpload={beforeUpload}
                                  onChange={this.handleChange}
                                >
                                  {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                  ) : (
                                    uploadButton
                                  )}
                                </Upload>,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-actions">
                            <Button htmlType="submit" type="primary" className="mr-2">
                              Oluştur
                            </Button>
                            <Button type="default">Vazgeç</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddCourse
