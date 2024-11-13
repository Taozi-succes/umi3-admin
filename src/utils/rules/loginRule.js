export const getLoginRule = (codeArr = []) => ({
  userRule: [
    {
      required: true,
      message: '用户名不能为空',
    },
    {
      min: 3,
      max: 10,
      message: '用户名长度在3-10之间',
    },
  ],
  passwordRule: [
    {
      required: true,
      message: '密码不能为空',
    },
    {
      min: 6,
      max: 10,
      message: '密码长度在6-10之间',
    },
  ],
  imgCodeRule: [
    {
      validator: (rule, value) => {
        switch (true) {
          case !Boolean(value):
            return Promise.reject('请输入验证码');
          case value.length > 4 || value.length < 4:
            return Promise.reject('验证码长度为4位');
          case codeArr.join('').toLowerCase() !== value.toLowerCase():
            return Promise.reject('验证码不正确');
          default:
            return Promise.resolve();
        }
      },
    },
  ],
  mobileRule: [
    {
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject('手机号不能为空');
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          return Promise.reject('手机号格式错误');
        } else {
          return Promise.resolve();
        }
      },
    },
  ],
  iphoneCode: [
    {
      required: true,
      message: '请输入验证码',
    },
    {
      max: 6,
      min: 6,
      message: '验证码长度不正确',
    },
  ],
});
