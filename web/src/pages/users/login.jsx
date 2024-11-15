import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import AccountLogin from './component/AccountLogin';
import SmCodeLogin from './component/SmCodeLogin';
import IconMap from 'components/iconMap';
import logoImg from 'common/img/logo.svg';
import {history} from 'umi';
import './css/login.less';
const Login = () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const [type, setType] = React.useState(0);
  const handleSubmit =  (value) => {
    const { username, password } = value;
    const params={
      accountName:username,
      password,
      type
    }
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((res) => res.json()).then((data) => {

      console.log('data', data);
      history.push('/');

    });
  };
  const componentSelector = (props) =>
    type ? (
      <SmCodeLogin {...props} />
    ) : (
      <AccountLogin {...props} />
    );

  const toTargetComponent = () => {
    setType((type) => (type ? 0 : 1));
  };
  return (
    <div className="form">
      <div className="logo mb-20">
        <img src={logoImg} alt="" />
        <span>人事管理系统</span>
      </div>
      <Form form={form} onFinish={handleSubmit}>
        {/* 选择当前展示的组件 */}
        {componentSelector({ form, FormItem, Input, Button, Row, Col })}
        <Row>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Row>
        <Row className="ft-12">
          <Col span={6}>忘记密码？</Col>
          <Col span={18} className="align-right" onClick={toTargetComponent}>
            {type ? '使用账户名加密码登录' : '使用手机号码登录'}
            {IconMap.arrRowRight}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
