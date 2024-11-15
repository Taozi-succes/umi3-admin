export const getLoginRule =(codeArr)=> {
  return {
    userRule: [
      { required: true, message: '账户名不能为空' },
      { max: 16, message: '账户名长度不正确' },
      { min: 4, message: '账户名长度不正确' },
    ],
    passwordRule: [
      { required: true, message: '密码不能为空' },
      { max: 16, message: '密码长度不正确' },
      { min: 4, message: '密码长度不正确' },
    ],
    mobileRule: [
      {
        validator: (rule, val, callback) => {
          const mobileReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
          switch (true) {
            case !Boolean(val):
              return Promise.reject('手机号码不能为空');
            case !mobileReg.test(val):
              return Promise.reject('手机号码格式不正确');
            default:
              return Promise.resolve();
          }
        },
      },
    ],
    smCodeRule: [
      { required: true, message: '验证码不能为空' },
      { max: 6, message: '最大长度为6位' },
      { min: 6, message: '最小长度为6位' },
    ],
    imgCodeRule:[
      {validator: (rule, val, callback) => {
        if(!val){
          return Promise.reject('请输入验证码');
        }else if(val.length !== 4){
          return Promise.reject('请输入4位验证码');
          // 转化为小写字母
        }else if(codeArr.join('').toLowerCase() === val.toLowerCase()){   
          return Promise.resolve();
        }else{
          return Promise.reject('验证码错误');
        }
      },
      },
    ]
  }
};

