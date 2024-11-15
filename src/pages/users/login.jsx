import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import AccountLogin from './component/AccountLogin';
import SmCodeLogin from './component/SmCodeLogin';
import IconMap from 'components/iconMap';
import logoImg from 'common/img/logo.svg';
import './css/login.less';
const Login = () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const [type, setType] = React.useState(0);
  const [codeArr, setCodeArr] = React.useState([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationObj, setVerificationObj] = useState({});
  useEffect(() => {
    canvasCode();
  }, []);
  /**
   * 绘制验证码
   */
  const canvasCode = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var code = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codeArr = [];
    const randomColor = () => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    };

    for (let i = 0; i < 4; i++) {
      var codeNum = Math.floor(Math.random() * 62);

      codeArr.push(code[codeNum]);

      //验证码上显示3条线
      ctx.strokeStyle = randomColor();
      ctx.beginPath();
      ctx.moveTo(
        Math.random() * 10,
        (Math.random() * canvas.clientHeight) / 2 + 10,
      );
      ctx.lineTo(
        canvas.clientWidth - Math.random() * 10,
        Math.random() * (canvas.clientHeight * 0.4),
      );
      ctx.stroke();

      //顺逆时针旋转
      let degNum = Math.random() < 0.5 ? 1 : -1;
      let deg = ((Math.random() * 30 * Math.PI) / 180) * degNum;
      let x = 10 + i * 20;
      let y = Math.floor(20 + Math.random() * 8);
      // console.log(x,y);
      ctx.font = 'bold 23px 微软雅黑';
      ctx.translate(x, y);
      ctx.rotate(deg);
      ctx.fillText(code[codeNum], 0, 0);
      ctx.rotate(-deg);
      ctx.translate(-x, -y);
    }

    setCodeArr([...codeArr]);

    //修改背景颜色
    let bgcolorArr = ['skyblue', 'orange', 'pink', 'grey'];
    let randomNum = Math.floor(Math.random() * bgcolorArr.length);
    canvas.style.backgroundColor = bgcolorArr[randomNum];
  };

  //点击切换验证码
  const handleCode = () => {
    setCodeArr([]);
    canvasCode();
  };
  /**
   * 自定义验证码验证规则
   */
  const validatePrimeCode = (code) => {
    // 将输入的验证码和正确的验证码都转为小写进行比较
    const lowerCaseCode = code.toLowerCase();
    const lowerCaseCodeArr = codeArr.join('').toLowerCase();
    if (lowerCaseCode === lowerCaseCodeArr) {
      return {
        validateStatus: 'success',
        help: null,
      };
    }
    return {
      validateStatus: 'warning',
      help: '验证码不正确！',
    };
  };
  const handleChangeCode = (value) => {
    setVerificationCode(value);
  };

  const handleSubmit = async () => {
    const result = validatePrimeCode(verificationCode);
    setVerificationObj(result);
    if (result.validateStatus === 'success') {
      console.log('验证成功');
      try {
        const values = await form.validateFields();
        console.log('Form values:', values);
      } catch (error) {
        console.log('Validate Failed:', error);
      }
    } else {
      console.log('验证失败');
    }
  };
  const componentSelector = (props) =>
    type ? (
      <SmCodeLogin {...props} />
    ) : (
      <AccountLogin {...props} initCode={handleCode} />
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
        {!type ? (
          <FormItem {...verificationObj}>
            <Input
              prefix={IconMap.codeIcon}
              placeholder="请输入验证码"
              onChange={(e) => {
                handleChangeCode(e.target.value);
              }}
              addonAfter={
                <canvas
                  id="canvas"
                  onClick={handleCode}
                  style={{
                    width: '100px',
                    height: '30px',
                    cursor: 'pointer',
                  }}
                ></canvas>
              }
            ></Input>
          </FormItem>
        ) : null}
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
