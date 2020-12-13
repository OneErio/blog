import React,{ useState } from 'react';
import Head from 'next/head'
import { Col, Row, List, Pagination } from 'antd';
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';
import servicePath from '../config/apiUrl.js';
import marked from 'marked';
import hljs from 'highlight.js';

import Author from '../components/Author';
import Header from '../components/Header';
import Advert from '../components/Advert';
import Classify from '../components/Classify';
import Footer from '../components/Footer';

import 'highlight.js/styles/monokai-sublime.css';
import '../public/style/pages/index.css';

const Home = (list) => {

  const [mylist, setMylist] = useState(list.data);
  const [minValue,setMinValue] = useState(0);
  const [maxValue,setMaxValue] = useState(5);
  const renderer = new marked.Renderer();

  const handleChange = value => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(5);
    } 
    else {
      setMinValue((value-1) * 5);
      setMaxValue((value-1) * 5+ 5);
    }
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  
  return(
    <div className="bg">
      <Head style={{backgroundColor:'red'}}>
        <title>Home</title>
        <link rel="icon" href="/static_source/favicon.ico"/>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Classify />
          <Advert />
        </Col>
        <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist && mylist.length && mylist.slice(minValue, maxValue)}
            renderItem={(item)=>{
              return(
                <List.Item
                  className="list-item"
                  extra={
                    <img
                      width={330}
                      style={{borderRadius:"8px",height:"100%", margin:0, padding:0, objectFit:'cover'}}
                      // alt="logo"
                      src={item.image}
                    />
                  }
                >
                  <div className="list-title">
                    <Link href={{pathname: './detailed', query: {id: item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><FolderOutlined /> {item.typeName}</span>
                    <span><FireOutlined /> {item.view_count}</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                  >
                  </div>
                </List.Item>
              )
            }}
          />
          <Pagination 
          defaultCurrent={1} 
          defaultPageSize={5}
          onChange={handleChange}
          total={mylist.length} 
          />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  // const promise = new Promise((resolve) => {
  //   axios('http://127.0.0.1:7001/default/getArticleList').then((res) => {
  //     console.log(res.data);
  //     resolve(res.data);
  //   })
  // })

  // return await promise;
  const result = await axios(servicePath.getArticleList);
  //console.log(result.data);
  return result.data;
}

export default Home
