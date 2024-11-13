import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import AccountLogin from './component/AccountLogin';
import SmCodeLogin from './component/SmCodeLogin';
import ImgCodeInput from './component/ImgCodeInput';
import IconMap from 'components/iconMap';
import logoImg from 'common/img/logo.svg';
import './css/login.less';
const Login = () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const [type, setType] = React.useState(0);

  const handleSubmit = async () => {
    // 执行登录逻辑
    console.log('验证成功');
    try {
      const values = await form.validateFields();
      delete values.imgCode;
      console.log('Form values:', values);
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };
  const componentSelector = (props) =>
    type ? <SmCodeLogin {...props} /> : <AccountLogin {...props} />;

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
        {!type ? <ImgCodeInput FormItem={FormItem} Input={Input} /> : null}
        <Row>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Row>
        <Row className="ft-12">
          <Col span={6}>忘记密码？</Col>
          <Col span={18} className="align-right" onClick={toTargetComponent}>
            {type ? '使用账户名密码进行登录' : '使用手机号码进行登录'}
            {IconMap.arrRowRight}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
