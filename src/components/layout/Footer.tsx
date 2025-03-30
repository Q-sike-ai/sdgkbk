import { Layout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph } = Typography;

const StyledFooter = styled(AntFooter)`
  background: #001529;
  color: #fff;
  padding: 48px 24px;
  margin-top: 48px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #1890ff;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: '#fff' }}>关于我们</Title>
            <Paragraph style={{ color: '#fff' }}>
              高考报考助手致力于为考生提供智能、全面的高考报考指导服务。
            </Paragraph>
          </Col>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: '#fff' }}>快速链接</Title>
            <Paragraph>
              <FooterLink to="/">首页</FooterLink>
              <br />
              <FooterLink to="/admission-form">报考表单</FooterLink>
              <br />
              <FooterLink to="/analysis">数据分析</FooterLink>
              <br />
              <FooterLink to="/divination">周易分析</FooterLink>
              <br />
              <FooterLink to="/blessing">文曲祈福</FooterLink>
              <br />
              <FooterLink to="/faq">常见问题</FooterLink>
            </Paragraph>
          </Col>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: '#fff' }}>联系我们</Title>
            <Paragraph style={{ color: '#fff' }}>
              邮箱：contact@example.com
              <br />
              电话：400-123-4567
              <br />
              地址：山东省济南市
            </Paragraph>
          </Col>
        </Row>
        <Row style={{ marginTop: 24, textAlign: 'center' }}>
          <Col span={24}>
            <Paragraph style={{ color: '#fff' }}>
              © 2024 高考报考助手. All rights reserved.
            </Paragraph>
          </Col>
        </Row>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;