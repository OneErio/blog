import React, { useState, useEffect } from 'react';
import { Menu, Typography, Divider } from 'antd';
import { GithubOutlined, QqOutlined, WechatOutlined, MehOutlined } from '@ant-design/icons';
import '../public/style/components/classify.css';
import axios from 'axios';
import Router from 'next/router';
import servicePath from '../config/apiUrl.js';

const Classify = () => {

  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data
      });
      setNavArray(result);
    }
    fetchData();
  }, [])

  // const handleClick = (e) => {
  //   if(e.key == 0) {
  //     Router.push('/index')
  //   } else {
  //     //console.log(e.key);
  //     Router.push('/list?id=' + e.key)
  //   }
  // }

  const data = navArray.map((item) => {
    return [item.typeName, item.Id]
  })

  const handleClick = (e) => {
    if(e.key == 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className="classify-div comm-box">
      <Divider orientation="center" className="divider-title">分类</Divider>
      <Menu
        mode="vertical"
        className={'classify-menv'}
        onClick={handleClick}
      >
        {data.map((item)=>{
            return (
            <Menu.Item key={item[1]} className={'classify-menv-item'}>
              {item[0]}
            </Menu.Item>)
        })}
        {/* mode="vertical"
        // split={false}
        // bordered
        // dataSource={data}
        // renderItem={item => <List.Item className="classify-list-item" description={item[1]} onClick={handleClick}>{item[0]}</List.Item>} */}
      </Menu>
    </div>
  )
}
export default Classify;