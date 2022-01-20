import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Col, Row, Select, Typography } from 'antd'
import axios from 'axios'
import millify from 'millify'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)
const { Option } = Select
const { Title } = Typography

type Props = {
  coin: {
    '24hVolume': string
    allTimeHigh: {
      price: string
      timestamp: number
    }
    btcPrice: string
    change: string
    coinrankingUrl: string
    color: string
    description: string
    iconUrl: string
    links: Array<{
      name: string
      type: string
      url: string
    }>
    listedAt: number
    lowVolume: Boolean
    marketCap: string
    name: string
    numberOfExchanges: number
    numberOfMarkets: number
    price: string
    priceAt: number
    rank: number
    sparkline: Array<string>
    supply: {
      circulating: string
      confirmed: boolean
      total: string
    }
    symbol: string
    tier: number
    uuid: string
    websiteUrl: string
  }
}

export default function LineChart({ coin }: Props) {
  const [coinHistory, setCoinHistory] = useState({
    change: '',
    history: [
      {
        price: '',
        timestamp: 1,
      },
    ],
  })
  const [coinPrice, setCoinPrice] = useState([''])
  const [coinTimestamp, setCoinTimestamp] = useState([''])
  const [timePeriod, setTimePeriod] = useState('7d')

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }

  const getCoinHistory = async () => {
    const response = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coin.uuid}/history`,
      {
        params: { timePeriod },
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API ?? '',
        },
      },
    )

    setCoinHistory(response.data.data)
  }

  useEffect(() => {
    getCoinHistory()
  }, [timePeriod])

  useEffect(() => {
    const price: string[] = []
    const timeStamp: string[] = []

    for (let index = 0; index < coinHistory.history.length; index += 1) {
      price.push(coinHistory.history[index].price)
      timeStamp.push(
        new Date(
          coinHistory.history[index].timestamp * 1000,
        ).toLocaleDateString(),
      )
    }

    setCoinPrice(price)
    setCoinTimestamp(timeStamp)
  }, [coinHistory])

  return (
    <>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Select>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coin.name} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coin.name} Price: ${millify(+coin.price)}
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  )
}
