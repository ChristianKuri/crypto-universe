import React from 'react'
import { Menu, Typography, Avatar } from 'antd'

import {
  HomeOutlined,
  MoneyCollectOutlined,
  FundOutlined,
} from '@ant-design/icons'

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src="/images/cryptocurrency.png" />
        <Typography.Title level={2} className="logo">
          <a href="/">Crypto Universe</a>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />} key={1}>
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />} key={2}>
          <a href="/cryptocurrencies">Crypto Currencies</a>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />} key={3}>
          <a href="/exchanges">Exchanges</a>
        </Menu.Item>
      </Menu>
    </div>
  )
}
