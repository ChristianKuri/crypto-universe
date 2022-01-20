import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from 'antd'
import ReactLayout from '../components/Layout'
import Cryptocurrencies from '../components/Cryptocurrencies'

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

export default function cryptocurrencies({ coins }: Props) {
  const [search, setSearch] = useState('')
  const [filteredCoins, setFilteredCoins] = useState(coins)

  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()),
      ),
    )
  }, [coins, search])

  return (
    <ReactLayout>
      <div className="search-crypto">
        <Input
          placeholder="Search Crypto"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Cryptocurrencies coins={filteredCoins} />
    </ReactLayout>
  )
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const options = {
    params: {
      limit: '100',
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

  const { coins }: Props = response.data.data

  // Pass data to the page via props
  return {
    props: { coins },
    revalidate: 10 * 60, // 10 minutes in seconds
  }
}
