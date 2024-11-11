import React from 'react';
import iconMap from 'components/iconMap';
function AccountLogin({ Input, FormItem }) {
  return (
    <>
      <FormItem>
        <Input prefix={iconMap.userIcon} placeholder="請輸入用戶名"></Input>
      </FormItem>
      <FormItem>
        <Input prefix={iconMap.passWordIcon} placeholder="請輸入密碼"></Input>
      </FormItem>
    </>
  );
}

export default AccountLogin;
