import React from 'react';
import iconMap from 'components/iconMap';
import { getLoginRule } from 'utils/rules';

function AccountLogin({ Input, FormItem }) {
  const loginRule = getLoginRule();

  return (
    <>
      <FormItem name="username" rules={loginRule.userRule} hasFeedback>
        <Input prefix={iconMap.userIcon} placeholder="請輸入用戶名"></Input>
      </FormItem>
      <FormItem name="password" rules={loginRule.passwordRule}>
        <Input.Password
          prefix={iconMap.passWordIcon}
          placeholder="請輸入密碼"
        ></Input.Password>
      </FormItem>
    </>
  );
}

export default AccountLogin;
