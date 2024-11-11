import React, { useEffect, useState } from 'react';
import iconMap from 'components/iconMap';

function SmCodeLogin({ FormItem, Input, Row, Col, Button }) {
  const [sendStatus, setSendStatus] = useState(false);
  const [count, setCount] = useState(59);
  const sendCode = () => {
    console.log('发送验证码');
    setSendStatus(true);
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        clearInterval(timer);
        setSendStatus(false);
        setCount(59);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return (
    <>
      <FormItem>
        <Input
          prefix={iconMap.userIcon}
          placeholder="請輸入你的手機號碼"
        ></Input>
      </FormItem>
      <FormItem>
        <Input
          prefix={iconMap.passWordIcon}
          placeholder="请输入验证码"
          addonAfter={
            <Button disabled={sendStatus} onClick={sendCode}>
              {sendStatus ? `${count} 重新发送` : '发送验证码'}
            </Button>
          }
        ></Input>
      </FormItem>
    </>
  );
}

export default SmCodeLogin;
