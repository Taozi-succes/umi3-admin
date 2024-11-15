import React, { useState, useEffect, useRef } from 'react';
import iconMap from 'components/iconMap';
function AccountLogin({ Input, FormItem, Button, form, initCode }) {
  useEffect(() => {
    initCode();
  }, []);
  return (
    <>
      <FormItem
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input prefix={iconMap.userIcon} placeholder="請輸入用戶名"></Input>
      </FormItem>
      <FormItem
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input prefix={iconMap.passWordIcon} placeholder="請輸入密碼"></Input>
      </FormItem>
    </>
  );
}

export default AccountLogin;
