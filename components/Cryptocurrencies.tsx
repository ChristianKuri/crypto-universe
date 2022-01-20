import { Card, Col, Row } from 'antd'
import millify from 'millify'
import React from 'react'

type Props = {
  coins: Array<{
    '24hVolume': string
    btcPrice: string
    change: string
    coinrankingUrl: string
    color: string
    iconUrl: string
    listedAt: number
    lowVolume: Boolean
    marketCap: string
    name: string
    price: string
    rank: number
    sparkline: Array<string>
    symbol: string
    tier: number
    uuid: string
  }>
}

export default function Cryptocurrencies({ coins }: Props) {
  return (
    <Row gutter={[32, 32]} className="crypto-card-container">
      {coins.map((coin) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
          <a href={`/coin/${coin.uuid}`}>
            {' '}
            <Card
              title={`${coin.rank}. ${coin.name}`}
              extra={
                <img
                  className="crypto-image"
                  src={coin.iconUrl}
                  alt={coin.name}
                />
              }
              hoverable
            >
              <p>Price: {millify(+coin.price)}</p>
              <p>Market Cap: {millify(+coin.marketCap)}</p>
              <p>Daily Change: {millify(+coin.change)}%</p>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  )
}
