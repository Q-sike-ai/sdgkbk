import { Card, Row, Col, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const { Title, Paragraph } = Typography;

const StyledHome = styled.div`
  position: relative;
  padding: 40px 0;
  min-height: 800px;
  background: url('/images/大学大门/清华1.webp') no-repeat center top fixed;
  background-size: 100% auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.5) 30%,
      rgba(255, 255, 255, 0.3) 100%
    );
    pointer-events: none;
  }
`;

const Banner = styled.div`
  position: relative;
  background: url('/images/大学大门/北大1.jpg');
  background-size: cover;
  background-position: center calc(50% + 80px);
  padding: 80px 0;
  text-align: center;
  color: white;
  margin-bottom: 40px;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
      transform: scale(1.03);
    }
    100% {
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
      transform: scale(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 48, 135, 0.7) 0%, rgba(34, 139, 34, 0.6) 100%);
    pointer-events: none;
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  .title {
    color: #FFD700;
    margin-bottom: 20px;
    font-size: 4.5em;
    font-family: "Ma Shan Zheng", cursive;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    color: white;
    font-size: 21.6px;
    letter-spacing: 0.1em;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
  }

  .start-button {
    background-color: #FFD700 !important;
    border-color: #FFD700 !important;
    transition: all 0.3s ease;
    margin-top: 30px;
    min-width: 200px;
    padding: 0 30px;
    animation: pulse 2s infinite ease-in-out;
    
    &:hover {
      animation: none;
      transform: scale(1.05) !important;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
    }

    a {
      color: #003087 !important;
      font-weight: bold;
      font-size: 18px;
      letter-spacing: 0.3em;
    }
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
`;

interface FeatureCardProps {
  isCenter?: boolean;
}

const FeatureCard = styled(Card)<FeatureCardProps>`
  height: 100%;
  text-align: center;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.isCenter && `
    background: url('/images/大学大门/文曲1.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      height: 0;
      padding-bottom: 50%;
      background: url('/images/大学大门/香炉.png') no-repeat center/contain;
      z-index: 1;
    }
  `}
  
  .ant-card-cover {
    padding: 24px;
    
    img {
      height: ${props => props.isCenter ? '160px' : '80px'};
      width: auto;
      margin: 0 auto;
    }
  }

  .ant-card-meta-title {
    color: #333;
    font-weight: bold;
  }

  .ant-card-meta-description {
    color: #666;
  }
`;

const features = [
  {
    title: '报考信息录入',
    description: '填写高考成绩、兴趣爱好等信息，获取个性化报考建议',
    icon: '/images/图标/报考指南.svg',
    link: '/admission-form'
  },
  {
    title: '智能分析推荐',
    description: '基于AI算法，推荐最适合的院校和专业',
    icon: '/images/图标/报考-提示.svg',
    link: '/analysis'
  },
  {
    title: '周易八卦分析',
    description: '结合传统文化，从周易角度解读报考运势',
    icon: '/images/图标/太极.svg',
    link: '/divination'
  },
  {
    title: '文曲星祈福',
    description: '在线上香祈福，祝愿金榜题名',
    icon: '/images/图标/星星1.svg',
    link: '/blessing'
  },

  {
    title: '常见问题解答',
    description: '解答高考报考过程中的常见疑问',
    icon: '/images/图标/图书.svg',
    link: '/faq'
  }
];

const Home = () => {
  const centerFeature = features[3]; // 文曲星祈福
  const leftFeatures = [features[0], features[1]]; // 报考信息录入，智能分析推荐
  const rightFeatures = [features[2], features[4]]; // 周易八卦分析，常见问题解答

  return (
    <div>
      <Banner>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Title level={1} className="title">
            文曲星君佑学报考助手
          </Title>
          <Paragraph className="subtitle">
            文曲星君降临，以智慧为笔，为高考学子勾勒精准报考蓝图
          </Paragraph>
          <Button 
            type="primary" 
            size="large"
            className="start-button"
          >
            <Link to="/admission-form">星佑报考</Link>
          </Button>
        </div>
      </Banner>
      
      <StyledHome>
        <ContentContainer className="container">
          <Row gutter={[24, 24]}>
            <Col span={6}>
              {leftFeatures.map((feature, index) => (
                <Col span={24} key={index} style={{ marginBottom: '24px' }}>
                  <Link to={feature.link}>
                    <FeatureCard
                      cover={<img alt={feature.title} src={feature.icon} />}
                      hoverable
                    >
                      <Card.Meta
                        title={feature.title}
                        description={feature.description}
                      />
                    </FeatureCard>
                  </Link>
                </Col>
              ))}
            </Col>
            <Col span={12}>
              <Link to={centerFeature.link}>
                <FeatureCard
                  isCenter
                  hoverable
                  style={{ height: '700px' }}
                >
                  <Card.Meta
                    title={<Title level={3} style={{ fontFamily: '"Ma Shan Zheng", cursive', textAlign: 'left', marginTop: '20px', marginLeft: '20px', color: '#FFD700' }}>{centerFeature.title}</Title>}
                    description={<span style={{ position: 'absolute', top: '20px', right: '20px', writingMode: 'vertical-rl', color: '#FFD700', fontSize: '16px', letterSpacing: '2px' }}>{centerFeature.description}</span>}
                  />
                </FeatureCard>
              </Link>
            </Col>
            <Col span={6}>
              {rightFeatures.map((feature, index) => (
                <Col span={24} key={index} style={{ marginBottom: '24px' }}>
                  <Link to={feature.link}>
                    <FeatureCard
                      cover={<img alt={feature.title} src={feature.icon} />}
                      hoverable
                    >
                      <Card.Meta
                        title={feature.title}
                        description={feature.description}
                      />
                    </FeatureCard>
                  </Link>
                </Col>
              ))}
            </Col>
          </Row>
        </ContentContainer>
      </StyledHome>
    </div>
  );
};

export default Home;