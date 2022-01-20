import axios from 'axios'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import { Col, Row, Typography } from 'antd'
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import LineChart from '../../components/LineChart'
import ReactLayout from '../../components/Layout'

const { Title, Text } = Typography

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

export async function requestCoinData(
  coinid: string | string[] | undefined,
  time: string,
  key: string | undefined,
) {
  const options = {
    params: { timePeriod: time },
    headers: {
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': key ?? '',
    },
  }

  const response = await axios.get(
    `https://coinranking1.p.rapidapi.com/coin/${coinid}`,
    options,
  )

  const coindata = response.data.data.coin

  return coindata
}

export default function Coin({ coin }: Props) {
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coin.price && millify(+coin.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: coin.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${coin['24hVolume'] && millify(+coin['24hVolume'])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coin.marketCap && millify(+coin.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(+coin.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coin.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: coin.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: coin.supply.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(+coin.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(+coin.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  return (
    <ReactLayout>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {coin.name} (Rank {coin.rank})
          </Title>
          <p>
            {coin.name} live price in US dollars. View value statistics, market
            cap and supply.
          </p>
        </Col>
        <LineChart coin={coin} />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {coin.name} Value Statistics
              </Title>
              <p>An overview showing the stats of {coin.name}</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other statistics
              </Title>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {coin.name}
              {HTMLReactParser(coin.description)}
            </Title>
          </Row>

          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {coin.name} Links
            </Title>
            {coin.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="__blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </ReactLayout>
  )
}

type Params = {
  params: {
    coinid: string
  }
}

export async function getServerSideProps({ params }: Params) {
  const coin = await requestCoinData(params.coinid, '7d', process.env.RAPID_API)

  return {
    props: { coin },
  }
}
