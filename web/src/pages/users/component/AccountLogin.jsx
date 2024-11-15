import React, { useState, useEffect, useRef } from 'react';
import iconMap from 'components/iconMap';
import { getLoginRule } from 'utils/rules';
function AccountLogin({ Input, FormItem, Button, form, initCode }) {
  const [codeArr, setCodeArr] = React.useState([]);
  const loginRule = getLoginRule(codeArr);
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
  return (
    <>
      <FormItem
        name="username"
        rules={loginRule.userRule}
      >
        <Input prefix={iconMap.userIcon} placeholder="請輸入用戶名"></Input>
      </FormItem>
      <FormItem
        name="password"
        rules={loginRule.passwordRule}
      >
        <Input prefix={iconMap.passWordIcon} placeholder="請輸入密碼"></Input>
      </FormItem>
      <FormItem name="imgCode" rules={loginRule.imgCodeRule}>
            <Input
              prefix={iconMap.codeIcon}
              placeholder="请输入验证码"
            
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
    </>
  );
}

export default AccountLogin;
