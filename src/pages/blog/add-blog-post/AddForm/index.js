import React from 'react'
import { Form, Input, Button, Radio, Select, Upload, Icon } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { createPostRequest } from 'redux/blog/actions'
import { getCategoriesRequest } from 'redux/categories/actions'

import styles from '../style.module.scss'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input

@Form.create()
@connect(({ categories }) => ({ categories }))
class AddForm extends React.Component {
  state = {
    content: '',
  }

  componentDidMount() {
    const { getCategories } = this.props
    getCategories({})
  }

  handleEditorChange = content => {
    this.setState({ content })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { form, createBlogPost } = this.props
    const {content} = this.state;
    form.validateFields((error, values) => {
      values.content=content;
      if (!error) {
        createBlogPost(values);
      }
    })
  }

  render() {
    const config = {
      imageUploadURL: 'https://api.cloudinary.com/v1_1/.../image/upload',
      imageUploadParams: {
        api_key: '...',
        upload_preset: '...',
      },
      imageUploadMethod: 'POST',
      events: {
        'froalaEditor.image.uploaded': (e, editor, response) => {
          response = JSON.parse(response)
          editor.image.insert(response.secure_url, true, null, editor.image.get(), null)
          return false
        },
      },
    }
    const { form, categories } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className="mt-3">
        <div className="form-group">
          <FormItem label="Başlık">
            {form.getFieldDecorator('title')(<Input placeholder="Post title" />)}
          </FormItem>
        </div>
        <div className="form-group">
          <FormItem label="Kategori">
            {form.getFieldDecorator(
              'categoryId',
              {},
            )(
              <Select
                id="product-edit-colors"
                showSearch
                notFoundContent="bulunamadı"
                style={{ width: '100%' }}
                placeholder="örn:sanat ve tasarım"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <input id="my-file" type="file" name="my-file" style={{ display: 'none' }} onChange="" />
          <FormItem label="İçerik">
            {form.getFieldDecorator('content')(
              <div className={styles.editor}>
                <Editor
                  init={{
                    paste_data_images: true,
                    language: 'tr_TR',
                    language_url: '/langs/tr_TR.js',
                    height: 400,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                      'searchreplace wordcount visualblocks visualchars code fullscreen',
                      'insertdatetime media nonbreaking save table contextmenu directionality',
                      'emoticons template paste textcolor colorpicker textpattern',
                    ],
                    /*  toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help', */
                    toolbar1:
                      'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    toolbar2: 'print preview media | forecolor backcolor emoticons',
                    image_advtab: true,
                    file_browser_callback_types: 'image',
                    file_picker_callback: function(callback, value, meta) {
                      if (meta.filetype === 'image') {
                        const input = document.getElementById('my-file')
                        input.click()
                        input.onchange = function() {
                          const file = input.files[0]
                          const reader = new FileReader()
                          reader.onload = function(e) {
                            console.log('name', e.target.result)
                            callback(e.target.result, {
                              alt: file.name,
                            })
                          }
                          reader.readAsDataURL(file)
                        }
                      }
                    },
                  }}
                  onEditorChange={this.handleEditorChange}
                  rows={4}
                />
                ,
              </div>,
            )}
          </FormItem>
        </div>
        <FormItem>
          <div className={styles.submit}>
            <span className="mr-3">
              <Button type="primary" htmlType="submit">
                Kaydet ve Paylaş
              </Button>
            </span>
            <Button type="danger" htmlType="submit">
              Sil
            </Button>
          </div>
        </FormItem>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createBlogPost: payload => dispatch(createPostRequest(payload)),
  getCategories: payload => dispatch(getCategoriesRequest(payload)),
})

export default compose(connect(null, mapDispatchToProps), withRouter)(AddForm)
