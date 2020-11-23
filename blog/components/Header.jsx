import React, { useState, useEffect } from 'react';
import { Row, Col, Menu } from 'antd';
import { HomeOutlined, LaptopOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

import '../public/style/components/header.css';
import servicePath from '../config/apiUrl.js';

var initTop = 0;

function scrollDirection(currentTop) {
  var result = currentTop > initTop // true is down & false is up
  initTop = currentTop
  return result
}

function debounce(fn, delay) {
  //借助闭包，内部函数，也就是这个匿名函数能访问到外部函数debounce的变量timer，且timer会一
  //直存在于内存中。
  let timer = null;
  return function() {
      if(timer) {
          clearTimeout(timer)
      }
      timer = setTimeout(() => {
          fn.apply(this, arguments);
      }, delay)
  }
}

const Header = () => {

  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    //监听滚轮滚动事件
    window.onscroll = debounce(function(){
      var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
      // var scrollH = document.documentElement.scrollHeight||document.body.scrollHeight;
      // var clientH = document.documentElement.clientHeight||document.body.clientHeight;
      var isUp = scrollDirection(scrollT);
      var arr = document.getElementsByClassName("header-menu");
      if (scrollT > 56) {
        console.log(isUp);
        if (isUp) {
            if (arr[0].style.visibility.indexOf('visible') != '-1') {
              arr[0].classList.remove("active");
              arr[0].style.visibility = "hidden";
              console.log('bbb');
            }
        } else {
            if (arr[0].style.visibility.indexOf('hidden') != '-1') {
              arr[0].style.visibility = "visible" ;
              arr[0].classList.add("active");
              console.log('aaa');
            }
        }
        arr[0].classList.add("fixed");
  
      } else {
        if(scrollT == 0){
          arr[0].style.visibility = "visible";
          arr[0].classList.remove("fixed");
          arr[0].classList.add("active");
          console.log("到顶部了");
        }
        else{
          // arr[0].style.visibility = "hidden";
          arr[0].classList.remove("active");
        }
  
      }
    },300)
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data
      });
      setNavArray(result);
    }
    fetchData();
  }, [])

  const handleClick = (e) => {
    if(e.key == 0) {
      Router.push('/index')
    } 
    // else {
    //   Router.push('/list?id=' + e.key)
    // }
  }

  return(
    <div className="header">
      <Row type="flex" justify="end" className="header-menu">
        <Col xs={24} sm={24} md={10} lg={8} xl={8}>
          <span className="header-logo">God Only Knows</span>
          <span className="header-text">神大人</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={12} xl={12}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined />
              首页
            </Menu.Item>
            <Menu.Item key="1">
              <HomeOutlined />
              待续
            </Menu.Item>
            <Menu.Item key="2">
              <HomeOutlined />
              待续
            </Menu.Item>
            <Menu.Item key="3">
              <HomeOutlined />
              待续
            </Menu.Item>
            <Menu.Item key="4">
              <HomeOutlined />
              关于
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {/* <Row justify="center" align="middle" className="header-sub">
        <Col span={24}>
          <div className="header-title">title</div>
        </Col>
      </Row> */}
    </div>
  )
}

export default Header;