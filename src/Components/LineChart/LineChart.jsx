import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historyData}) => {

  const [data, setData] = useState([['Date', 'Prices']])

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]]

    if(historyData.prices){
      historyData.prices.forEach((item) => {
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]])
      })
      setData(dataCopy)
    }
  }, [historyData])

  return (
    <Chart chartType='LineChart'
    data={data}
    height='400px'
    width='100%'
    options={{
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'Price',
      },
    }}
    legendToggle />
  )
}

export default LineChart