import React from 'react';
import { Avatar, Divider } from 'antd';
import { GithubOutlined, QqOutlined, WechatOutlined, MehOutlined } from '@ant-design/icons';

import '../public/style/components/author.css'


const Author = () => {
  return (
    <div className="author-div comm-box">
      <div><Avatar size={100} icon={<MehOutlined />}  src="http://godkeima.oss-accelerate.aliyuncs.com/blog_index/header.jpg" /></div>
      <div className="author-introduction">
        前端小透明 & 越见越理解
        <Divider>社交账号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account"/>
        <Avatar size={28} icon={<QqOutlined />} className="account" />
        <Avatar size={28} icon={<WechatOutlined />} className="account" />
      </div>
    </div>
  )
}
export default Author;