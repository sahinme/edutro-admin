import React from 'react'
import {
  Input,
  TreeSelect,
  Select,
  Button,
  Upload,
  Spin,
  DatePicker,
  message,
  Form,
  Checkbox,
  InputNumber,
  Icon,
} from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { getSelectedCourseRequest } from 'redux/course/actions'
import { getCategoriesRequest } from 'redux/categories/actions'
import { API_URL } from 'redux/services'
import { Editor } from '@tinymce/tinymce-react'
import { getLocationsRequest } from 'redux/locations/actions'
import { durationTypes } from '..'

const { Option } = Select
const InputGroup = Input.Group
const { TextArea } = Input
const FormItem = Form.Item

const dragprop = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const { status } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

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

const requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json; charset=utf-8',
  },
}

@connect(({ selectedCourse, locations, categories }) => ({ selectedCourse, locations, categories }))
@Form.create()
class EditCourse extends React.Component {
  state = {
    loading: false,
    info: {},
    description: null,
  }

  componentDidMount() {
    const {
      match: { params: { id } = {} } = {},
      getSelectedCourse,
      form,
      getLocations,
      getCategories,
    } = this.props
    const { setFieldsValue } = form
    getSelectedCourse({ id })
    getLocations({})
    getCategories({})
    const response = fetch(`${API_URL}/api/course/get-course-by-id?id=${id}`, requestOptions)
      .then(response => response.json())
      .then(res => this.setState({ info: res }))
      .catch(error => error)
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
      if (!error) {
        console.log(values)
      }
    })
  }

  handleEditorChange = content => {
    this.setState({ description: content })
  }

  render() {
    const { imageUrl, loading, info } = this.state
    const { form, selectedCourse, locations, categories } = this.props

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Yükle</div>
      </div>
    )

    const { data } = selectedCourse
    const message = 'Bu alan zorunludur!'

    return (
      <div>
        <Helmet title="Eğitim Düzenle" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Eğitim Düzenle</strong>
            </div>
          </div>
          <div className="card-body">
            <Form
              onSubmit={this.onSubmit}
              initialValues={{ remember: true }}
              name="validate_other"
              className="mt-3"
            >
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Eğitim Adı">
                          {form.getFieldDecorator('title', {
                            initialValue: data && data.title,
                            rules: [{ required: true, message }],
                          })(<Input placeholder="örn:resim kursu" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <FormItem label="Kategori">
                          {form.getFieldDecorator('categoryId', {
                            initialValue: data && data.category.id,
                            rules: [{ required: true, message }],
                          })(
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
                            initialValue: data && data.locationId,
                            rules: [{ required: true, message }],
                          })(
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
                            initialValue: data && data.address,
                            rules: [{ required: true, message }],
                          })(<Input placeholder="örn:Kızılay seminer salonu no:34/A" />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <FormItem label="Kısa Özet">
                          {form.getFieldDecorator('shortDescription', {
                            initialValue: data && data.shortDescription,
                            rules: [{ required: true, message }],
                          })(
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
                              initialValue={data && data.description}
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
                                initialValue: data && data.price,
                                rules: [{ required: true, message }],
                              })(<Input id="product-edit-total-price" placeholder="299.99" />)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <FormItem label="İndirimli Fiyat">
                              {form.getFieldDecorator('discountPrice', {
                                initialValue: data && data.discountPrice,
                                rules: [{ required: true, message }],
                              })(<Input id="product-edit-discountprice" placeholder="199.99" />)}
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
                              {form.getFieldDecorator('startDate', {
                                initialValue: data && moment(data.startDate),
                              })(<DatePicker format="DD/MM/YYYY" placeholder="tarih secin" />)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem label="Bitiş Tarihi">
                              {form.getFieldDecorator('endDate', {
                                initialValue: data && moment(data.endDate),
                              })(<DatePicker format="DD/MM/YYYY" placeholder="tarih secin" />)}
                            </FormItem>
                          </div>
                        </div>
                        <div style={{ display: 'flex' }} className="col-lg-3">
                          <div className="form-group">
                            <FormItem label="Eğitim Süresi">
                              {form.getFieldDecorator('durationCount', {
                                initialValue: data && data.durationCount,
                              })(<InputNumber min={1} placeholder="örn:3" />)}
                            </FormItem>
                          </div>
                          <div className="form-group">
                            <FormItem label="gün,ay,yıl...">
                              {form.getFieldDecorator('durationType', {
                                initialValue: data && data.durationType,
                              })(
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
                            <FormItem valuepropName="checked">
                              {form.getFieldDecorator('certificate', {
                                // initialValue: data && data.certificate,
                              })(<Checkbox>Sertifika</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('certificateOfParticipation', {
                                valuePropName: 'checked',
                                initialValue: data && data.certificateOfParticipation,
                              })(<Checkbox>Katılım Belgesi</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('onlineVideo', {
                                valuePropName: 'checked',
                                initialValue: data && data.onlineVideo,
                              })(<Checkbox>Online Video</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <FormItem label="Eğitim Görseli">
                              {form.getFieldDecorator('imagePath', {
                                rules: [{ required: true, message }],
                              })(
                                <Upload
                                  name="avatar"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  beforeUpload={beforeUpload}
                                  onChange={this.handleChange}
                                >
                                  {data && (imageUrl || data.imagePath) ? (
                                    <img
                                      src={imageUrl || data.imagePath}
                                      alt="avatar"
                                      style={{ width: '100%' }}
                                    />
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

const mapDispatchToProps = dispatch => ({
  getSelectedCourse: payload => dispatch(getSelectedCourseRequest(payload)),
  getLocations: payload => dispatch(getLocationsRequest(payload)),
  getCategories: payload => dispatch(getCategoriesRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(EditCourse)
