import { Layout, Typography, Space } from 'antd'
import React, { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

export default function ReactLayout({ children }: Props) {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">{children}</div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Crypto Universe <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <a href="/" className="text-white ">
              Home
            </a>
          </Space>
        </div>
      </div>
    </div>
  )
}
