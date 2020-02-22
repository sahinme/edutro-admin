import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { withRouter } from 'react-router'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

@Form.create()
class ChangePassword extends React.Component {
  state = {}

  handleConfirmBlur = e => {
    const { value } = e.target
    const { confirmDirty } = this.state
    this.setState({ confirmDirty: confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('new_password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log('ok')
      }
    })
  }

  render() {
    const { form } = this.props

    return (
      <Form style={{ marginLeft: '10px' }} onSubmit={this.onSubmit} className="login-form">
        <h5 className="text-black mt-4">
          <strong>Şifre Değiştir</strong>
        </h5>
        <div className="row">
          <div className="col-lg-5">
            <FormItem label="Mevcut Şifreniz">
              {form.getFieldDecorator('current_password', {
                rules: [{ required: false }],
              })(<Input type="password" placeholder="Current password" />)}
            </FormItem>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <FormItem label="Yeni Şifre">
              {form.getFieldDecorator('new_password', {
                rules: [
                  { required: false },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input type="password" placeholder="New password" />)}
            </FormItem>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <FormItem label="Yeni Şifre (Tekrar)">
              {form.getFieldDecorator('repeat', {
                rules: [
                  { required: false },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input type="password" placeholder="Repeat new password" />)}
            </FormItem>
          </div>
        </div>
        <div className="form-actions">
          <Button style={{ width: 150 }} type="primary" htmlType="submit" className="mr-3">
            Update
          </Button>
        </div>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({})

export default compose(connect(null, mapDispatchToProps), withRouter)(ChangePassword)
