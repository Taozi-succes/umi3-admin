import {Button} from 'antd'
import {Link} from 'umi'
const Layout = ({children,history}) =>{
  const goTargetPage=(url)=>{
    history.push(url)
  }
  return(
    <div>
      <h1>全局模板</h1>
      <Link to='/'>图标界面</Link>
      <Button type='primary' onClick={()=>goTargetPage('/user/1223')}>跳转user界面</Button>
      {children}
    </div>
  )
}

export default Layout
