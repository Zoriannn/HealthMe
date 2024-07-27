import { useEffect, useState } from "react"
import Container from "./Container"
import List from "./List";

const HistoricalPurchases = (props) => {
  const [stocks, setStocks] = useState([]);

  const addStock = (stock) => {
    setStocks(
      [
        ...stocks,
        stocks,
      ]
    )
  }

  useEffect(
    () => {
      if (props.addStock !== null) {
        addStock(props.addStock);
      }
      console.debug('HistoricalPurchases', stocks);
    },
    [
      props.addStock,
      props.setSelectedStock,
    ]
  )

  return (
    <div className='grid-two-item'>
      <div className='subgrid-two'>
        <Container
          title={
            <h3 className='grid-c-title-text'>Historical Purchases</h3>
          }
          object={<List items={stocks} setSelectedStock={props.setStockData} />}
        />
      </div>
    </div>
  )
}

export default HistoricalPurchases;
