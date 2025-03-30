import { Form, Input, Select, InputNumber, DatePicker, Button, Card, Space, message, Modal } from 'antd';
import styled from '@emotion/styled';
import { useState } from 'react';

const { Option } = Select;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 24px;
`;

const InfoList = styled.div`
  margin: 16px 0;
  
  .info-item {
    margin-bottom: 12px;
    display: flex;
    
    .label {
      font-weight: bold;
      width: 120px;
      flex-shrink: 0;
    }
    
    .value {
      flex-grow: 1;
    }
  }
`;

const ScoreNote = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666;

  .title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }

  .content {
    line-height: 1.5;
  }
`;

// 必考科目
const requiredSubjects = [
  { label: '语文', name: 'chinese', maxScore: 150 },
  { label: '数学', name: 'math', maxScore: 150 },
  { label: '外语', name: 'foreign_language', maxScore: 150 }
];

// 选考科目
const optionalSubjects = [
  { label: '思想政治', name: 'politics', maxScore: 100 },
  { label: '历史', name: 'history', maxScore: 100 },
  { label: '地理', name: 'geography', maxScore: 100 },
  { label: '物理', name: 'physics', maxScore: 100 },
  { label: '化学', name: 'chemistry', maxScore: 100 },
  { label: '生物', name: 'biology', maxScore: 100 }
];

const industries = [
  '互联网/IT', '金融/银行', '医疗/医药', '教育/科研',
  '建筑/房地产', '制造/工业', '文化/传媒', '政府/机构',
  '咨询/服务', '贸易/零售', '能源/环保', '交通/物流'
];

const provinces = [
  '北京', '天津', '河北', '山西', '内蒙古',
  '辽宁', '吉林', '黑龙江', '上海', '江苏',
  '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '广西',
  '海南', '重庆', '四川', '贵州', '云南',
  '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
];

const AdmissionForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);
  const [selectedOptionalSubjects, setSelectedOptionalSubjects] = useState<string[]>([]);

  const handleOptionalSubjectChange = (value: string[]) => {
    if (value.length > 3) {
      message.warning('最多只能选择3个选考科目');
      return;
    }
    setSelectedOptionalSubjects(value);
    // 清除未选中科目的分数
    const currentValues = form.getFieldsValue();
    optionalSubjects.forEach(subject => {
      if (!value.includes(subject.name)) {
        currentValues[subject.name] = undefined;
      }
    });
    form.setFieldsValue(currentValues);
  };

  const showConfirmModal = (values: any) => {
    // 验证必考科目是否都已填写
    const missingRequired = requiredSubjects.some(subject => 
      !values[subject.name]
    );
    if (missingRequired) {
      message.error('请填写所有必考科目（语文、数学、外语）的分数');
      return;
    }

    // 验证选考科目是否正好选择了3个
    const filledOptionalSubjects = optionalSubjects
      .filter(subject => values[subject.name] !== undefined && values[subject.name] !== null)
      .length;
    if (filledOptionalSubjects !== 3) {
      message.error('请选择并填写3个选考科目的分数');
      return;
    }

    setFormValues(values);
    setConfirmModalVisible(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      console.log('Form values:', formValues);
      message.success('信息提交成功！');
      form.resetFields();
      setConfirmModalVisible(false);
      setSelectedOptionalSubjects([]);
    } catch (error) {
      message.error('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const renderFormValues = () => {
    if (!formValues) return null;

    // 计算必考科目总分
    const requiredTotal = requiredSubjects
      .map(subject => formValues[subject.name])
      .filter(score => score !== undefined && score !== null)
      .reduce((sum, score) => sum + Number(score), 0);

    // 计算选考科目总分
    const optionalTotal = optionalSubjects
      .map(subject => formValues[subject.name])
      .filter(score => score !== undefined && score !== null)
      .reduce((sum, score) => sum + Number(score), 0);

    // 总分
    const totalScore = requiredTotal + optionalTotal;

    return (
      <InfoList>
        <div className="info-item">
          <span className="label">必考科目</span>
          <span className="value"></span>
        </div>
        {requiredSubjects.map(subject => (
          <div key={subject.name} className="info-item" style={{ paddingLeft: '20px' }}>
            <span className="label">{subject.label}：</span>
            <span className="value">{formValues[subject.name] || '未填写'}</span>
          </div>
        ))}
        <div className="info-item" style={{ paddingLeft: '20px', color: '#1677ff' }}>
          <span className="label">必考总分：</span>
          <span className="value">{requiredTotal}/450</span>
        </div>

        <div className="info-item" style={{ marginTop: '12px' }}>
          <span className="label">选考科目</span>
          <span className="value"></span>
        </div>
        {optionalSubjects
          .filter(subject => formValues[subject.name] !== undefined && formValues[subject.name] !== null)
          .map(subject => (
            <div key={subject.name} className="info-item" style={{ paddingLeft: '20px' }}>
              <span className="label">{subject.label}：</span>
              <span className="value">{formValues[subject.name] || '未填写'}</span>
            </div>
          ))}
        <div className="info-item" style={{ paddingLeft: '20px', color: '#1677ff' }}>
          <span className="label">选考总分：</span>
          <span className="value">{optionalTotal}/300</span>
        </div>

        <div className="info-item" style={{ 
          borderTop: '1px dashed #ccc',
          paddingTop: '12px',
          marginTop: '12px'
        }}>
          <span className="label">总分：</span>
          <span className="value" style={{ 
            color: '#1677ff',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            {totalScore}/750
          </span>
        </div>
        <div className="info-item">
          <span className="label">兴趣爱好：</span>
          <span className="value">{formValues.interests || '未填写'}</span>
        </div>
        <div className="info-item">
          <span className="label">目标行业：</span>
          <span className="value">{formValues.target_industries?.join('、') || '未填写'}</span>
        </div>
        <div className="info-item">
          <span className="label">目标省份：</span>
          <span className="value">{formValues.target_provinces?.join('、') || '未填写'}</span>
        </div>
        <div className="info-item">
          <span className="label">生辰八字：</span>
          <span className="value">{formValues.birth_date?.format('YYYY-MM-DD HH:mm') || '未填写'}</span>
        </div>
      </InfoList>
    );
  };

  return (
    <div className="container">
      <StyledCard>
        <FormTitle>高考报考信息录入</FormTitle>
        <ScoreNote>
          <div className="title">分数说明：</div>
          <div className="content">
            1. 统一高考科目（语文、数学、外语）满分各150分，总分450分<br />
            2. 选考科目满分各100分（物理、化学、生物、思想政治、历史、地理中选3门），总分300分<br />
            3. 高考总分750分
          </div>
        </ScoreNote>
        <Form
          form={form}
          layout="vertical"
          onFinish={showConfirmModal}
        >
          <div style={{ marginBottom: '24px' }}>
            <h3>必考科目（满分各150分）</h3>
            {requiredSubjects.map(subject => (
              <Form.Item
                key={subject.name}
                label={`${subject.label}（满分${subject.maxScore}分）`}
                name={subject.name}
                rules={[
                  { required: true, message: `请输入${subject.label}成绩` },
                  { type: 'number', max: subject.maxScore, message: `${subject.label}成绩不能超过${subject.maxScore}分` }
                ]}
              >
                <InputNumber
                  min={0}
                  max={subject.maxScore}
                  placeholder={`请输入${subject.label}成绩（0-${subject.maxScore}分）`}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3>选考科目（满分各100分，请选择3门）</h3>
            <Form.Item>
              <Select
                mode="multiple"
                placeholder="请先选择要考试的科目"
                value={selectedOptionalSubjects}
                onChange={handleOptionalSubjectChange}
                style={{ marginBottom: '16px' }}
              >
                {optionalSubjects.map(subject => (
                  <Option key={subject.name} value={subject.name}>{subject.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            {optionalSubjects
              .filter(subject => selectedOptionalSubjects.includes(subject.name))
              .map(subject => (
                <Form.Item
                  key={subject.name}
                  label={`${subject.label}（满分${subject.maxScore}分）`}
                  name={subject.name}
                  rules={[
                    { required: true, message: `请输入${subject.label}成绩` },
                    { type: 'number', max: subject.maxScore, message: `${subject.label}成绩不能超过${subject.maxScore}分` }
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={subject.maxScore}
                    placeholder={`请输入${subject.label}成绩（0-${subject.maxScore}分）`}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              ))}
          </div>

          <Form.Item
            label="兴趣爱好"
            name="interests"
          >
            <Input.TextArea
              placeholder="请输入您的兴趣爱好，多个爱好可用逗号分隔"
              autoSize={{ minRows: 2, maxRows: 4 }}
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="目标行业（可多选）"
            name="target_industries"
          >
            <Select mode="multiple" placeholder="请选择您感兴趣的行业">
              {industries.map(industry => (
                <Option key={industry} value={industry}>{industry}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="目标省份（可多选）"
            name="target_provinces"
          >
            <Select mode="multiple" placeholder="请选择目标省份">
              {provinces.map(province => (
                <Option key={province} value={province}>{province}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="生辰八字"
            tooltip="请按照阳历输入出生日期，系统将自动转换为生辰八字"
          >
            <Form.Item
              name="birth_date"
              style={{ marginBottom: 0 }}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择出生日期"
                format="YYYY-MM-DD HH:mm"
                showTime={{ format: 'HH:mm' }}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                提交信息
              </Button>
              <Button onClick={() => {
                form.resetFields();
                setSelectedOptionalSubjects([]);
              }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </StyledCard>

      <Modal
        title="确认信息"
        open={confirmModalVisible}
        onOk={handleConfirm}
        onCancel={() => setConfirmModalVisible(false)}
        width={600}
        okText="确认提交"
        cancelText="返回修改"
        confirmLoading={loading}
      >
        <p>请确认以下信息是否正确：</p>
        {renderFormValues()}
      </Modal>
    </div>
  );
};

export default AdmissionForm;