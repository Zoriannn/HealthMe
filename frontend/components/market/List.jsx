const List = (props) => {
  let date = new Date();
  let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);

  return (
    <div className='grid-items'>
      {
        props.items.map(
          (item, index) => (
            <div className='grid-item' key={index} onClick={(e) => props.setSelectedStock(index)}>
              <div className='stock-left'>
                <div className='stock-V'>
                  <div className='stockLogo'>
                    <img src={item.logo} />
                  </div>
                  <div className='stockTicker'>{item.ticker}</div>
                </div>
              <div className='stock-V stick-left'>
                <span className=''>$ {Math.floor(Math.random() * 100)}</span>
                <span
                  className=''
                  style={{
                    fontSize: '10px',
                    color: '#000000',
                  }}
                >
                  $ {item.price * Math.floor(Math.random() * 100)}
                </span>
              </div>
              </div>
              <div>
                <span className=''> {formattedDate}</span>
              </div>
            </div>
          )
        )
      }
    </div>
  );
};

export default List;
