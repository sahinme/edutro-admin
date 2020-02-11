import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Form, Input, Button, Radio, Select, Upload, Icon } from 'antd'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import styles from '../style.module.scss'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Dragger } = Upload

@Form.create()
class AddForm extends React.Component {
  render() {
    /* const config = {
      imageEditButtons: ['imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove']
    } */
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
                <FroalaEditorComponent
                  config={{
                    placeholderText: 'Edit Your Content Here!',
                    charCounterCount: false,
                    imageUpload: true,
                    imageDefaultDisplay: 'inline-block',
                    // Set max image size to 5MB.
                    imageMaxSize: 5 * 1024 * 1024,
                    // Allow to upload PNG and JPG.
                    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                  }}
                  tag='textarea'
                />
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
