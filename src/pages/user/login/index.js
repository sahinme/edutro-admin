import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Select } from 'antd'
import { Helmet } from 'react-helmet'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp';
import { loginRequest } from 'redux/auth/actions'

import styles from './style.module.scss'

const { Option } = Select;

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        const { login, history } = this.props;
        login(values);
        // history.push("/dashboard/alpha")
      }
    })
  }

  render() {
    const {
      form,
      user: { loading },
    } = this.props
    const message = "Bu alan zorunludur!"
    return (
      <div>
        <Helmet title="Giriş" />
        <div className={`${styles.title} login-heading`}>
          <h1>
            <strong>Edutro`ya Hoş Geldiniz.</strong>
          </h1>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong>Giriş Yapınız</strong>
                  </h4>
                  <br />
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="E-Posta">
                      {form.getFieldDecorator('email', {
                        rules: [{ required: true, message }],
                      })(<Input placeholder="kayıtlı e-posta adresinizi giriniz" size="default" />)}
                    </Form.Item>
                    <Form.Item label="Şifre">
                      {form.getFieldDecorator('password', {
                        rules: [{ required: true, message }],
                      })(<Input placeholder="şifrenizi giriniz" size="default" type="password" />)}
                    </Form.Item>
                    <Form.Item label="Giriş türü">
                      {form.getFieldDecorator('entityType', {
                        rules: [{ required: true, message }],
                      })(<Select style={{ width: "100%" }}>
                        <Option value="Tenant">Kurum</Option>
                        <Option value="Educator">Özel Eğitmen</Option>
                      </Select>)}
                    </Form.Item>
                    <div className="form-actions">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={loading}
                      >
                        Giriş Yap
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  login: state.auth.data
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(loginRequest(payload)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(Login);
