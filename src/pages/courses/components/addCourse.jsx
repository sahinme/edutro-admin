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
  Collapse,
  Row,
} from 'antd'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter, Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { getCategoriesRequest } from 'redux/categories/actions'
import { getLocationsRequest } from 'redux/locations/actions'
import { createCourseRequest } from 'redux/course/actions'
import { durationTypes } from '..'

const { Panel } = Collapse

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
    message.error('Yanlızca JPG/PNG dosyaları yükleyebilirsiniz!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Dosya boyutu 2MB dan küçük olmalıdır!')
  }
  return isJpgOrPng && isLt2M
}

let id = 0
let idTeaching = 0

@connect(({ locations, categories, loader }) => ({ locations, categories, loader }))
@Form.create()
class AddCourse extends React.Component {
  state = {
    loading: false,
    fullDescription: '',
  }

  componentDidMount() {
    const { getLocations, getCategories, form } = this.props
    getLocations({})
    getCategories({})
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
    event.preventDefault()
    const { form, createCourse } = this.props
    form.validateFields((error, values) => {
      debugger
      if (!error) {
        const { fullDescription } = this.state
        values.fullDescription = fullDescription

        const requirements = values.names.join('|')
        values.requirements = requirements
        const teachings = values.namesTeaching.join('|')
        values.teachings = teachings

        values.file = values.file.file.originFileObj

        values.startDate = moment(values.startDate).format('YYYY-MM-DD')
        values.endDate = moment(values.endDate).format('YYYY-MM-DD')

        if (values.certificate === undefined) values.certificate = false
        if (values.certificateOfParticipation === undefined)
          values.certificateOfParticipation = false
        if (values.onlineVideo === undefined) values.onlineVideo = false
        createCourse(values)
        console.log(values)
      }
    })
  }

  handleEditorChange = content => {
    this.setState({ fullDescription: content })
  }

  remove = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  removeTeaching = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keysTeaching')
    form.setFieldsValue({
      keysTeaching: keys.filter(key => key !== k),
    })
  }

  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  addTeaching = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keysTeaching')
    const nextKeys = keys.concat(idTeaching++)
    form.setFieldsValue({
      keysTeaching: nextKeys,
    })
  }

  render() {
    const { imageUrl, loading } = this.state
    const { form, locations, categories } = this.props

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }

    form.getFieldDecorator('keys', { initialValue: [] })
    form.getFieldDecorator('keysTeaching', { initialValue: [] })

    const keys = form.getFieldValue('keys')
    const keysTeaching = form.getFieldValue('keysTeaching')

    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Gereklilik' : ''}
        required={false}
        key={k}
      >
        {form.getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Bu alan zorunludur.',
            },
          ],
        })(
          <Input
            placeholder="örn:17-25 yaş arasında olmak"
            style={{ width: '60%', marginRight: 8 }}
          />,
        )}
        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ))

    const formItemsTeaching = keysTeaching.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Öğrenilecekler' : ''}
        required={false}
        key={k}
      >
        {form.getFieldDecorator(`namesTeaching[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: 'Bu alan zorunludur.',
            },
          ],
        })(
          <Input
            placeholder="örn:Bilinçaltınızı olumlu şekilde programlayabileceksiniz."
            style={{ width: '60%', marginRight: 8 }}
          />,
        )}
        {keysTeaching.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.removeTeaching(k)}
          />
        ) : null}
      </Form.Item>
    ))

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
                          {form.getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Bu alan zorunludur' }],
                          })(<Input placeholder="örn:resim kursu" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Kategori">
                          {form.getFieldDecorator('categoryId', {
                            rules: [{ required: true, message: 'Bu alan zorunludur' }],
                          })(
                            <Select
                              id="product-edit-colors"
                              showSearch
                              notFoundContent="bulunamadı"
                              style={{ width: '100%' }}
                              placeholder="örn:sanat ve tasarım"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                              }
                            >
                              {categories &&
                                categories.data &&
                                categories.data.map(x => (
                                  <Option key={x.id} value={x.id}>
                                    {x.displayName}
                                  </Option>
                                ))}
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Lokasyon">
                          {form.getFieldDecorator('locationId', {
                            rules: [{ required: true, message: 'Bu alan zorunludur' }],
                          })(
                            <Select
                              id="product-edit-colors"
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="örn:Ankara"
                              notFoundContent="bulunamadı"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                              }
                            >
                              {locations &&
                                locations.data &&
                                locations.data.map(x => (
                                  <Option key={x.id} value={x.id}>
                                    {x.locationName}
                                  </Option>
                                ))}
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Açık Adres">
                          {form.getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Bu alan zorunludur' }],
                          })(<Input placeholder="örn:Kızılay seminer salonu no:34/A" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h4 className="text-black mt-2 mb-3">
                        <strong>Gereklilikler</strong>
                      </h4>
                      <div className="form-group">
                        {formItems}
                        <Form.Item>
                          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Gereklilik ekle
                          </Button>
                        </Form.Item>
                      </div>

                      <h4 className="text-black mt-2 mb-3">
                        <strong>Eğitimde Neler Öğrenilecek ?</strong>
                      </h4>
                      <div className="form-group">
                        {formItemsTeaching}
                        <Form.Item>
                          <Button type="dashed" onClick={this.addTeaching} style={{ width: '60%' }}>
                            <Icon type="plus" /> Madde ekle
                          </Button>
                        </Form.Item>
                      </div>
                      <div className="form-group">
                        <FormItem label="Kısa Açıklama">
                          {form.getFieldDecorator('shortDescription', {
                            rules: [{ required: true, message: 'Bu alan zorunludur' }],
                          })(
                            <TextArea
                              maxlength="160"
                              placeholder="Eğitim hakkında kısa-özet bilgi"
                              rows={3}
                              id="shortDescription"
                            />,
                          )}
                        </FormItem>
                      </div>
                      <div className="form-group">
                        <FormItem label="Açıklama (Detaylı Tanım)">
                          {form.getFieldDecorator('description')(
                            <Editor
                              init={{
                                language_url: './tr.js',
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
                              {form.getFieldDecorator('price', {
                                rules: [{ required: true, message: 'Bu alan zorunludur' }],
                              })(
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
                        <div style={{ display: 'flex' }} className="col-lg-3">
                          <div className="form-group">
                            <FormItem label="Eğitim Süresi">
                              {form.getFieldDecorator('durationCount')(
                                <InputNumber min={1} placeholder="örn:3" />,
                              )}
                            </FormItem>
                          </div>
                          <div className="form-group">
                            <FormItem label="gün,ay,yıl...">
                              {form.getFieldDecorator('durationType')(
                                <Select>
                                  {durationTypes.map(x => (
                                    <Option key={x.id} value={x.name}>
                                      {x.name}
                                    </Option>
                                  ))}
                                </Select>,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('certificate', {
                                valuePropName: 'checked',
                              })(<Checkbox>Sertifika</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('certificateOfParticipation', {
                                valuePropName: 'checked',
                              })(<Checkbox>Katılım Belgesi</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('onlineVideo', {
                                valuePropName: 'checked',
                              })(<Checkbox>Online Video</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <FormItem label="Kontenjan">
                              {form.getFieldDecorator('quota')(
                                <InputNumber style={{ width: '100%' }} min={0} placeholder="12" />,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <Row>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <FormItem label="Eğitim Görseli">
                                {form.getFieldDecorator('file')(
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
                        </Row>
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

const mapDispatchToProps = dispatch => ({
  createCourse: payload => dispatch(createCourseRequest(payload)),
  getLocations: payload => dispatch(getLocationsRequest(payload)),
  getCategories: payload => dispatch(getCategoriesRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(AddCourse)
