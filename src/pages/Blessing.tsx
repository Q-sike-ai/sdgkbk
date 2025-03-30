import { Card, Typography, Button, Modal, Radio, message, Space, Input } from 'antd';
import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  && {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    background: url('/images/大学大门/文曲2.png') center center no-repeat;
    background-size: cover;
    border: none;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4),
                0 10px 10px rgba(0, 0, 0, 0.3),
                0 0 120px rgba(255, 215, 0, 0.15),
                inset 0 0 15px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    position: relative;

    .ant-card-body {
      background: transparent;
      padding: 40px;
      position: relative;
      z-index: 2;
    }
  }
`;

const PageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/大学大门/浙大1.jpg') no-repeat center center fixed;
  background-size: cover;
  z-index: 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StyledContent = styled.div`
  position: relative;
  min-height: calc(100vh - 48px);
  padding: 24px;
  overflow: hidden;
`;

const BlessingContainer = styled.div`
  position: relative;
  z-index: 3;
  padding: 20px;
  text-align: center;
`;

const IncenseBurnerImage = styled.div`
  width: 300px;
  height: 300px;
  background-image: url('/images/大学大门/香炉1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const IncenseContainer = styled.div`
  position: relative;
  height: 400px;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const IncenseStick = styled(motion.div)`
  width: 4px;
  height: 200px;
  background: linear-gradient(to bottom, #8b4513, #d2691e);
  position: relative;
  margin: 0 10px;
  bottom: 80px;
  left: 7px;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: #ff4d4f;
    border-radius: 50%;
  }
`;

const getSmokeColor = (price: number) => {
  const numPrice = Number(price);
  switch (numPrice) {
    case 1:
      return 'rgba(50, 50, 50, 0.9)';  // 黑色
    case 5:
      return 'rgba(255, 59, 48, 0.9)';  // 红色
    case 10:
      return 'rgba(255, 215, 0, 0.9)';  // 金色
    case 100:
      return 'rgba(128, 0, 128, 0.9)';  // 紫色
    default:
      if (numPrice > 100) return 'rgba(128, 0, 128, 0.9)';  // 紫色
      return 'rgba(200, 200, 200, 0.9)';
  }
};

const Smoke = styled(motion.div)<{ smokeColor: string }>`
  position: absolute;
  bottom: 265px;
  left: calc(50% + 2px);
  transform: translateX(-50%);
  width: 30px;
  height: 150px;
  background: ${props => `linear-gradient(to top, ${props.smokeColor}, transparent)`};
  filter: blur(12px);
  z-index: 2;
`;

const StoryCard = styled(Card)`
  margin-top: 24px;
  background: rgba(255, 251, 230, 0.7);
  border: 1px solid #ffe58f;
  backdrop-filter: blur(3px);
`;

const PaymentModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
  }
`;

const priceOptions = [
  { label: '1元', value: 1 },
  { label: '5元', value: 5 },
  { label: '10元', value: 10 },
  { label: '100元', value: 100 },
  { label: '自定义金额', value: 'custom' },
];

const stories = [
  {
    title: '文曲星的由来',
    content: '文曲星是中国古代神话中的星宿，主管文运。相传文曲星是文昌帝君的化身，掌管天下文运，保佑学子金榜题名。'
  },
  {
    title: '状元及第的传说',
    content: '相传有一书生寒窗苦读多年，在科举前夕诚心祈求文曲星保佑。当晚梦见文曲星现身指点，第二天考试果然高中状元。'
  }
];

const StyledTitle = styled(Typography.Title)`
  && {
    color: #FFD700;
    font-size: 42px;
    letter-spacing: 8px;
    margin-bottom: 30px;
    font-family: "Ma Shan Zheng", cursive;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #FFD700, transparent);
      margin: 15px auto 0;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 400px;
  margin: 20px 0;
  white-space: nowrap;
  flex-direction: row;
`;

const StyledParagraph = styled.p`
  font-size: 36px;
  letter-spacing: 4px;
  color: #FFD700;
  font-family: "楷体", "STKaiti", "华文楷体", KaiTi, serif;
  text-align: center;
  line-height: 1;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 15px rgba(255, 215, 0, 0.5);
  display: inline-block;
  white-space: nowrap;
`;

const BlessingText = styled(motion.div)<{ isRight?: boolean }>`
  position: fixed;
  ${props => props.isRight ? 'right: 120px;' : 'left: 120px;'}
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-family: "Ma Shan Zheng", cursive;
  font-size: 36px;
  font-weight: 800;
  color: #FF3333;
  white-space: nowrap;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
  line-height: 1;
  z-index: 10;
  padding: 30px 20px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.15)
  );
  border: 2px solid #FFD700;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3),
              inset 0 0 15px rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(8px);
  
  @media (max-width: 1400px) {
    ${props => props.isRight ? 'right: 80px;' : 'left: 80px;'}
  }
  
  @media (max-width: 1200px) {
    ${props => props.isRight ? 'right: 40px;' : 'left: 40px;'}
  }
`;

const shimmerAnimation = {
  initial: { 
    textShadow: "0 0 15px rgba(255, 215, 0, 0.7)"
  },
  animate: {
    textShadow: [
      "0 0 15px rgba(255, 215, 0, 0.7)",
      "0 0 30px rgba(255, 215, 0, 0.9)",
      "0 0 45px rgba(255, 215, 0, 1)",
      "0 0 60px rgba(255, 215, 0, 0.9)",
      "0 0 15px rgba(255, 215, 0, 0.7)"
    ]
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const AnimatedText = styled(motion.span)`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(to right, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
`;

const buttonTextAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

const textCharactersInitial = ['上', '香', '祈', '福'];
const textCharactersAfter = ['熄', '灭', '燃', '香'];

const StyledButton = styled(Button)`
  && {
    font-size: 24px;
    height: 60px;
    padding: 0 40px;
    border-radius: 30px;
    background: linear-gradient(45deg, #1677ff, #69b1ff);
    border: none;
    box-shadow: 0 5px 15px rgba(22, 119, 255, 0.3);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    
    &:hover {
      background: linear-gradient(45deg, #69b1ff, #1677ff);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(22, 119, 255, 0.4);
    }

    &:disabled {
      background: #d9d9d9;
      color: rgba(0, 0, 0, 0.25);
    }
  }
`;

const Blessing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | 'custom'>(1);
  const [isIncenseBurning, setIsIncenseBurning] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<string>('');

  const handleBurn = () => {
    setIsModalVisible(true);
  };

  const handlePayment = () => {
    const finalPrice = selectedPrice === 'custom' ? parseFloat(customPrice) : selectedPrice;
    
    if (selectedPrice === 'custom' && (!customPrice || parseFloat(customPrice) <= 0)) {
      message.error('请输入有效的金额！');
      return;
    }

    message.success(`已支付${finalPrice}元，文曲星保佑您金榜题名！`);
    setIsModalVisible(false);
    setIsIncenseBurning(true);
    setCurrentPrice(finalPrice);
    
    setTimeout(() => {
      setIsIncenseBurning(false);
    }, 180000);
  };

  const handlePriceChange = (e: any) => {
    setSelectedPrice(e.target.value);
    if (e.target.value !== 'custom') {
      setCustomPrice('');
    }
  };

  return (
    <StyledContent>
      <PageBackground />
      <div className="container">
        <BlessingText
          initial="initial"
          animate="animate"
          variants={shimmerAnimation}
        >
          文曲照途精准规划圆绮梦
        </BlessingText>
        
        <BlessingText
          isRight
          initial="initial"
          animate="animate"
          variants={shimmerAnimation}
        >
          星君护考辉煌成绩耀金榜
        </BlessingText>

        <StyledCard>
          <BlessingContainer>
            <StyledTitle level={2}>文曲帝君祈福</StyledTitle>
            <TextContainer>
              <StyledParagraph>文曲主文</StyledParagraph>
              <StyledParagraph>燃香祈成</StyledParagraph>
            </TextContainer>
            
            <IncenseContainer>
              <IncenseBurnerImage />
              <AnimatePresence>
                {isIncenseBurning && (
                  <>
                    <IncenseStick
                      initial={{ height: 200 }}
                      animate={{ height: 0 }}
                      transition={{ duration: 180 }}
                    />
                    <Smoke
                      smokeColor={getSmokeColor(currentPrice)}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], y: -150 }}
                      transition={{ duration: 1.25, repeat: Infinity }}
                    />
                  </>
                )}
              </AnimatePresence>
            </IncenseContainer>

            <Space size="large">
              <StyledButton
                type="primary"
                size="large"
                onClick={isIncenseBurning ? () => setIsIncenseBurning(false) : handleBurn}
              >
                {(isIncenseBurning ? textCharactersAfter : textCharactersInitial).map((char, index) => (
                  <AnimatedText
                    key={index}
                    initial="initial"
                    animate="animate"
                    variants={buttonTextAnimation}
                    transition={{ delay: index * 0.1 }}
                  >
                    {char}
                  </AnimatedText>
                ))}
              </StyledButton>
            </Space>

            {stories.map((story, index) => (
              <StoryCard key={index} title={story.title}>
                <Paragraph>{story.content}</Paragraph>
              </StoryCard>
            ))}
          </BlessingContainer>
        </StyledCard>

        <PaymentModal
          title="选择祈福金额"
          open={isModalVisible}
          onOk={handlePayment}
          onCancel={() => setIsModalVisible(false)}
          okText="确认支付"
          cancelText="取消"
        >
          <Radio.Group
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <Space direction="vertical" size="large">
              {priceOptions.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
              {selectedPrice === 'custom' && (
                <Input
                  style={{ width: 200, marginLeft: 24 }}
                  placeholder="请输入金额（元）"
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  min="0"
                  step="1"
                />
              )}
            </Space>
          </Radio.Group>
        </PaymentModal>
      </div>
    </StyledContent>
  );
};

export default Blessing;