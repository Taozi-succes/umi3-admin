const index=(props)=>{
  console.log(props);

  return <div>

    <h1>User Page</h1>
    <h2>我是传递的:{props.match.params.id}</h2>
  </div>;
}
export default index
