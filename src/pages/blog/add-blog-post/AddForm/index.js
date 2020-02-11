import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import FroalaEditor from 'react-froala-wysiwyg';
import { Form, Input, Button, Radio, Select, Upload, Icon } from 'antd'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import styles from '../style.module.scss'
import Example from './Example';


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
                <Example />
              </div>,
            )}
          </FormItem>
        </div>
        <div className="form-group">
          <FormItem>
            {form.getFieldDecorator('Files')(
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Dosya yüklemek için tıklayın veya dosyayı sürükleyin
                </p>
                <p className="ant-upload-hint">Tek veya toplu yükleme desteklenir.</p>
              </Dragger>,
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
