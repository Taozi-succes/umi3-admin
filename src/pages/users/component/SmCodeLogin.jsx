import React, { useEffect, useState, useRef, useCallback } from 'react';
import iconMap from 'components/iconMap';
import { getLoginRule } from 'utils/rules';
const loginRule = getLoginRule();

function SmCodeLogin({ FormItem, Input, Row, Col, Button, form }) {
  const [sendStatus, setSendStatus] = useState(false);
  const [disabled, setDisabled] = useState(true);
  let [count, setCount] = useState(5);
  const timerRef = useRef(null);

  const sendCode = useCallback(() => {
    setSendStatus(true);
    setDisabled(true);
    runTime();
  });

  const runTime = () => {
    timerRef.current = setInterval(() => {
      if (count === 0) {
        clearInterval(timerRef.current);
        setSendStatus(false);
        setDisabled(false);
        setCount(5);
        return;
      }
      setCount(--count);
    }, 1000);
  };
  const checkMobile = async (e) => {
    if (e.target.value) {
      try {
        const values = await form.validateFields(['mobile']);
        setSendStatus(false);
        setDisabled(false);
      } catch (error) {
        setSendStatus(true);

        console.log('Validate Failed:', error);
      }
    }
  };

  return (
    <>
      <FormItem name="mobile" rules={loginRule.mobileRule} hasFeedback>
        <Input
          prefix={iconMap.userIcon}
          placeholder="請輸入你的手機號碼"
          onChange={(e) => {
            checkMobile(e);
          }}
        ></Input>
      </FormItem>
      <FormItem name="iphoneCode" rules={loginRule.iphoneCode} hasFeedback>
        <Input
          prefix={iconMap.passWordIcon}
          placeholder="请输入验证码"
          addonAfter={
            <Button disabled={disabled} onClick={sendCode}>
              {sendStatus ? `${count} 重新发送` : '发送验证码'}
            </Button>
          }
        ></Input>
      </FormItem>
    </>
  );
}

export default SmCodeLogin;
