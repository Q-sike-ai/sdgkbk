import { Card, Typography, Collapse } from 'antd';
import styled from '@emotion/styled';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    font-weight: 500;
  }
  
  .ant-collapse-content-box {
    line-height: 1.8;
  }
`;

const faqs = [
  {
    question: '如何判断自己适合报考哪些专业？',
    answer: '可以从以下几个方面考虑：\n1. 个人兴趣爱好：选择与自己兴趣相符的专业，有助于保持学习积极性\n2. 高考成绩：对照往年各校各专业分数线，选择有把握的专业\n3. 未来就业方向：了解专业就业前景、薪资水平和发展空间\n4. 个人能力特长：评估自己的学科优势和能力特点\n5. 家庭因素：考虑学费、生活费等经济因素'
  },
  {
    question: '文理科如何选择？',
    answer: '文理科选择建议考虑：\n1. 学科成绩：对比数学、物理、化学和政治、历史、地理等科目的成绩\n2. 学习兴趣：选择自己更感兴趣的学科方向\n3. 未来专业：了解心仪专业所属科类\n4. 就业方向：考虑不同科类对应的就业领域\n5. 个人特点：理科偏重逻辑思维，文科偏重人文素养'
  },
  {
    question: '高考成绩不理想怎么办？',
    answer: '如果高考成绩不理想，可以考虑以下选择：\n1. 调整院校层次：选择分数线相对较低的院校\n2. 考虑专业调剂：选择竞争较小的专业\n3. 选择高职高专：很多高职院校也有优质专业\n4. 复读准备：慎重考虑是否值得投入一年时间复读\n5. 留学途径：部分国家的大学录取分数要求相对较低'
  },
  {
    question: '专业调剂需要注意什么？',
    answer: '专业调剂需要注意以下几点：\n1. 了解调剂专业的具体情况，包括课程设置、就业方向等\n2. 确认调剂专业是否符合自己的兴趣和职业规划\n3. 查看调剂专业的历年就业率和就业质量\n4. 考虑是否有转专业的机会\n5. 注意填报志愿时的调剂意愿说明'
  },
  {
    question: '如何看待专业冷热门？',
    answer: '对待专业冷热门问题建议：\n1. 热门专业优势：就业机会多，发展前景好\n2. 冷门专业特点：竞争压力小，可能有特殊优势\n3. 市场需求：了解社会对人才的实际需求\n4. 专业发展：关注专业未来发展趋势\n5. 个人兴趣：不要盲目追随热门，要符合个人发展规划'
  },
  {
    question: '异地求学需要考虑哪些因素？',
    answer: '异地求学需要考虑：\n1. 生活成本：包括学费、住宿费、日常开销等\n2. 气候环境：是否适应当地气候条件\n3. 交通便利：考虑往返家乡的交通情况\n4. 就业机会：当地的就业环境和发展机会\n5. 文化差异：是否能适应当地的生活文化'
  },
  {
    question: '高考志愿如何填报？',
    answer: '填报高考志愿的建议：\n1. 了解批次：提前批、一批、二批等各批次的区别和特点\n2. 合理搭配：按照"冲、稳、保"的原则填报志愿\n3. 专业优先：确定是否专业服从调剂\n4. 位次参考：参考往年录取位次\n5. 梯度分配：合理分配各个志愿的院校层次'
  },
  {
    question: '大学期间如何规划？',
    answer: '大学生活规划建议：\n1. 学习规划：制定学习目标，培养学习能力\n2. 能力提升：参加各类证书考试和技能培训\n3. 实践经验：参与实习、社团活动等\n4. 人际关系：建立良好的社交网络\n5. 职业规划：及早确定就业或深造方向'
  }
];

const FAQ = () => {
  return (
    <div className="container">
      <StyledCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          高考报考常见问题
        </Title>
        
        <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
          这里整理了高考报考过程中的常见问题，希望能帮助您做出更好的决策
        </Paragraph>

        <StyledCollapse defaultActiveKey={['0']}>
          {faqs.map((faq, index) => (
            <Panel header={faq.question} key={index}>
              {faq.answer.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </Panel>
          ))}
        </StyledCollapse>

        <Paragraph type="secondary" style={{ marginTop: 24, textAlign: 'center' }}>
          如果您还有其他问题，欢迎联系我们的客服团队
        </Paragraph>
      </StyledCard>
    </div>
  );
};

export default FAQ;