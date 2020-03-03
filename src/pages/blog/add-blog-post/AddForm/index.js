import React from 'react'
import { Form, Input, Button, Radio, Select, Upload, Icon } from 'antd'
import { Editor } from '@tinymce/tinymce-react'


import styles from '../style.module.scss'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Dragger } = Upload

@Form.create()
class AddForm extends React.Component {
  render() {
    const config = {
      imageUploadURL: 'https://api.cloudinary.com/v1_1/.../image/upload',
      imageUploadParams: {
        'api_key': '...',
        'upload_preset': '...'
      },
      imageUploadMethod: 'POST',
      events: {
        'froalaEditor.image.uploaded': (e, editor, response) => {
          response = JSON.parse(response);
          editor.image.insert(response.secure_url, true, null, editor.image.get(), null)
          return false
        }
      }
    }
    const { form } = this.props

    return (
      <Form className="mt-3">
        <div className="form-group">
          <FormItem label="Başlık">
            {form.getFieldDecorator('title')(<Input placeholder="Post title" />)}
          </FormItem>
        </div>
        <div className="form-group">
          <FormItem label="Biçim">
            {form.getFieldDecorator('type')(
              <RadioGroup>
                <Radio value="text">Yazı</Radio>
                <Radio value="video">Video</Radio>
                <Radio value="image">Resim</Radio>
                <Radio value="audio">Ses</Radio>
                <Radio value="vimeo">Vimeo</Radio>
              </RadioGroup>,
            )}
          </FormItem>
        </div>
        <div className="form-group">
          <FormItem label="Kategori">
            {form.getFieldDecorator('category', {
              initialValue: ['travel', 'lifestyle'],
            })(
              <Select
                mode="tags"
                size="default"
                placeholder="Kategori Seçin"
                style={{ width: '100%' }}
              />,
            )}
          </FormItem>
        </div>
        <div className="form-group">
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
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype === 'image') {
                        const input = document.getElementById('my-file')
                        input.click()
                        input.onchange = function () {
                          const file = input.files[0]
                          const reader = new FileReader()
                          reader.onload = function (e) {
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
                />,
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

export default AddForm
