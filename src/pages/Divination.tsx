import { Card, Form, DatePicker, Button, Typography, Spin, message } from 'antd';
import { useState } from 'react';
import styled from '@emotion/styled';

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DivinationResult = styled.div`
  margin-top: 24px;
  padding: 24px;
  background: #f5f5f5;
  border-radius: 8px;
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 16px;
  }
  
  p {
    margin-bottom: 12px;
    line-height: 1.8;
  }
`;

const DivinationImage = styled.div`
  text-align: center;
  margin: 24px 0;
  
  img {
    width: 120px;
    height: 120px;
  }
`;

const Divination = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onFinish = async (_values: any) => {
    setLoading(true);
    try {
      // TODO: 调用周易分析API
      const mockResult = {
        bazi: '甲子 乙丑 丙寅 丁卯',
        wuxing: '金水相生，木火相克',
        fortune: '学业运势良好，适合选择理工科方向',
        suggestion: '建议报考工科类院校，尤其是计算机、电子信息等专业',
        timing: '最佳报考时间在午时',
      };
      
      setTimeout(() => {
        setResult(mockResult);
        setLoading(false);
      }, 1500);
    } catch (error) {
      message.error('分析失败，请稍后重试');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <StyledCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          周易八卦分析
        </Title>
        
        <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
          通过传统周易学说，结合您的生辰八字，为您的高考报考提供运势解读
        </Paragraph>

        <DivinationImage>
          <img src="./images/图标/太极.svg" alt="太极" />
        </DivinationImage>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="出生日期和时辰"
            name="birthDateTime"
            rules={[{ required: true, message: '请选择出生日期和时辰' }]}
            tooltip="请尽可能准确填写出生时辰，以获得更准确的分析结果"
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              style={{ width: '100%' }}
              placeholder="选择出生日期和时辰"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              开始分析
            </Button>
          </Form.Item>
        </Form>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin tip="正在推演八字，请稍候..." />
          </div>
        )}

        {result && (
          <DivinationResult>
            <h3>分析结果</h3>
            <p><strong>您的八字：</strong>{result.bazi}</p>
            <p><strong>五行分析：</strong>{result.wuxing}</p>
            <p><strong>学业运势：</strong>{result.fortune}</p>
            <p><strong>报考建议：</strong>{result.suggestion}</p>
            <p><strong>择时建议：</strong>{result.timing}</p>
            
            <Paragraph type="secondary" style={{ marginTop: 16 }}>
              注：周易分析结果仅供参考，具体报考决策请结合个人实际情况、高考成绩、专业特点等因素综合考虑。
            </Paragraph>
          </DivinationResult>
        )}
      </StyledCard>
    </div>
  );
};

export default Divination;