import React from 'react'
import {
  Input,
  TreeSelect,
  Select,
  Button,
  Upload,
  DatePicker,
  message,
  Form,
  Checkbox,
  InputNumber,
} from 'antd'
import { Helmet } from 'react-helmet'

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

@Form.create()
class AddCourse extends React.Component {
  render() {
    const { form } = this.props
    return (
      <div>
        <Helmet title="Product Edit" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Eğitim Oluştur</strong>
            </div>
          </div>
          <div className="card-body">
            <Form layout="vertical">
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
                          {form.getFieldDecorator('category')(
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
                        <FormItem label="Tanım">
                          {form.getFieldDecorator('fullDescription')(
                            <TextArea rows={3} id="product-edit-fulldescr" />,
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
                                <Input id="product-edit-total-price" placeholder="299.99" />,
                              )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <FormItem label="İndirimli Fiyat">
                              {form.getFieldDecorator('discountPrice')(
                                <Input id="product-edit-discountprice" placeholder="199.99" />,
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
                              {form.getFieldDecorator('day')(
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
                              {form.getFieldDecorator('colors')(<Checkbox>Sertifika</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <FormItem>
                              {form.getFieldDecorator('size')(<Checkbox>Katılım Belgesi</Checkbox>)}
                            </FormItem>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-actions">
                            <Button type="primary" className="mr-2">
                              Save Product
                            </Button>
                            <Button type="default">Cancel</Button>
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
