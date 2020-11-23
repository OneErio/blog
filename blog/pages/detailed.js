import React from 'react';
import Head from 'next/head'
import { Col, Row, Breadcrumb, Affix, Divider } from 'antd';
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import marked from 'marked';
import hljs from 'highlight.js';
import Tocify from '../components/tocify.tsx';
import servicePath from '../config/apiUrl.js';


import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import Header from '../components/Header';

import '../public/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css';
import 'highlight.js/styles/monokai-sublime.css';

const Detailed = (props) => {

  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  const html = marked(props.article_content);
  const articleTitle = props.title; 
  const dateTime = props.addTime;
  const typeName = props.typeName;
  const view_count = props.view_count;

  return(
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
       <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              {/* <div className="nav-title">文章目录</div> */}
              <Divider>文章目录</Divider>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
        <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">{typeName}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{articleTitle}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {articleTitle}
              </div>
              <div className="list-icon center">
                <span><CalendarOutlined />{dateTime}</span>
                <span><FolderOutlined />{typeName}</span>
                <span><FireOutlined />{view_count}</span>
              </div>
              <div className="detailed-content"
                  dangerouslySetInnerHTML={{__html: html}}
              >
                
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detailed.getInitialProps = async(context) => {
  //console.log(context.query.id)

  const id = context.query.id;

  // const promise = new Promise((resolve) => {
  //   axios('http://127.0.0.1:7001/default/getArticleList').then((res) => {
  //     console.log(res);
  //     apiResolver(res.data.data[0]);
  //   });
  // })

  // return promise;
  const result = await axios(servicePath.getArticleById + id);
  //console.log(result);
  return result.data.data[0];
}

export default Detailed
