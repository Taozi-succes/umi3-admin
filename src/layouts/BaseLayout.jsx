import React from 'react';

const BaseLayout = ({ children }) => {
  return (
    <>
      <h1>头部</h1>
      <h2>侧边栏</h2>
      {children}
    </>
  );
};

export default BaseLayout;
