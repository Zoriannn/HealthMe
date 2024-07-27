const Container = (props) => {
  return (
    <div className='grid-two-item grid-common'>
      <div className=' grid-c4'>
        <div className='grid-c-title'>{props.title}</div>
        <div className='grid-c4-content'>{props.object}</div>
      </div>
    </div>
  );
};

export default Container;
