import React from 'react';
import { Row, Col, Menu } from 'antd';
import '../public/style/components/footer.css';

const Footer = () => (
  <div className="footer-div">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <div id="templatemo_bottom_panel">
          <div id="templatemo_bottom_section">

            <div className="templatemo_bottom_section_content">
                <h3>友情链接</h3>
                <p>神是孤独的，没有必要交朋友！</p>
            </div>

            <div className="templatemo_bottom_section_content">
                <h3>Friends</h3>
                <ul>
                    <li><a href="http://www.cssmoban.com" target="_parent">Website Templates</a></li>
                    <li><a href="#" target="_parent">Flash Templates</a></li>
                    <li><a href="#" target="_parent">Web Design Blog</a></li>
                    <li><a href="#">Nunc blandit orci</a></li>
                    <li><a href="#">Cum sociis natoque</a></li>
                </ul>
            </div>

            <div className="templatemo_bottom_section_content">
                <h3>Usage Policies</h3>
                  <ul>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <div id="templatemo_footer_panel">
          <div id="templatemo_footer_section">
            Copyright © 2024 <a href="#">God only knows</a> | from <a title="新地狱" href="#" target="_blank">新地狱</a>
            <br/>
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002002390" style={{display:'inline-block', textDecoration:'none', height:'20px', lineHeight:'20px'}}><img src="https://raw.githubusercontent.com/OneErio/ImgLib/master/blog/beian.png" style={{float:'left'}}/><p style={{float:'left', height:'20px', lineHeight:'20px', margin: '0px 0px 0px 5px', color:'#939393'}}>川公网安备 51019002002390号</p></a>
          </div>
        </div>
      </Col>
    </Row>
  </div>
)
export default Footer;