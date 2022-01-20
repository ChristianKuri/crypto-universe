import axios from 'axios'
import { millify } from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import ReactLayout from '../components/Layout'
import Cryptocurrencies from '../components/Cryptocurrencies'

const { Title } = Typography

type Props = {
  data: {
    stats: {
      total: number
      total24hVolume: string
      totalCoins: number
      totalExchanges: number
      totalMarketCap: string
      totalMarkets: number
    }
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
}

export default function Home({ data }: Props) {
  return (
    <ReactLayout>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={data.stats.totalCoins}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(data.stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(+data.stats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 Volume"
            value={millify(+data.stats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(data.stats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <a href="/cryptocurrencies">show more</a>
        </Title>
      </div>
      <Cryptocurrencies coins={data.coins} />
    </ReactLayout>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const options = {
    params: {
      limit: '10',
    },
    headers: {
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API ?? '',
    },
  }

  const response = await axios.get(
    'https://coinranking1.p.rapidapi.com/coins',
    options,
  )

  const { data }: Props = response.data

  // Pass data to the page via props
  return {
    props: { data },
    revalidate: 10 * 60, // 10 minutes in seconds
  }
}
