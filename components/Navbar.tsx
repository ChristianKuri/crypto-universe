import React, { useState, useEffect } from 'react'
import { Menu, Typography, Avatar, Button } from 'antd'

import { HomeOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<boolean>(true)
  const [screenSize, setScreenSize] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src="/images/cryptocurrency.png" />
        <Typography.Title level={2} className="logo">
          <a href="/">Crypto Universe</a>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined style={{ color: 'white' }} />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} key={1}>
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key={2}>
            <a href="/cryptocurrencies">Crypto Currencies</a>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}
