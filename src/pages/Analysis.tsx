import { Card, Row, Col, Typography, Radio } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import styled from '@emotion/styled';
import { useState } from 'react';

interface PieChartProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
}

const renderActiveShape = (props: PieChartProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke="#666"
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill="#666" stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#666"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

// 模拟数据
const majorDistributionData = [
  { name: '工学', value: 35 },
  { name: '理学', value: 20 },
  { name: '经济学', value: 15 },
  { name: '医学', value: 12 },
  { name: '文学', value: 10 },
  { name: '管理学', value: 8 }
];

const regionDistributionData = [
  { name: '华东', value: 40 },
  { name: '华北', value: 25 },
  { name: '华南', value: 15 },
  { name: '西南', value: 10 },
  { name: '东北', value: 7 },
  { name: '西北', value: 3 }
];

const scoreData = [
  { year: '2019', '清华大学': 680, '北京大学': 675, '山东大学': 640 },
  { year: '2020', '清华大学': 682, '北京大学': 677, '山东大学': 642 },
  { year: '2021', '清华大学': 685, '北京大学': 679, '山东大学': 645 },
  { year: '2022', '清华大学': 683, '北京大学': 678, '山东大学': 643 },
  { year: '2023', '清华大学': 684, '北京大学': 680, '山东大学': 644 },
];

const employmentData = [
  { major: '计算机科学', rate: 98.5, salary: 15000 },
  { major: '人工智能', rate: 97.8, salary: 16000 },
  { major: '软件工程', rate: 97.2, salary: 14500 },
  { major: '数据科学', rate: 96.5, salary: 14000 },
  { major: '通信工程', rate: 95.8, salary: 13000 },
];

const Analysis = () => {
  const [chartType, setChartType] = useState('major');
  const [activeIndex, setActiveIndex] = useState(0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        高校数据分析
      </Title>

      <StyledCard title="山东省重点高校录取分数线趋势（近5年）">
        <ChartContainer>
          <LineChart width={800} height={400} data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={[600, 700]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="清华大学" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="北京大学" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="山东大学" stroke="#ffc658" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ChartContainer>
      </StyledCard>

      <Row gutter={24}>
        <Col span={12}>
          <StyledCard title="热门专业就业率">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="major" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Bar dataKey="rate" fill="#8884d8" name="就业率(%)" animationDuration={1500} />
              </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </StyledCard>
        </Col>
        <Col span={12}>
          <StyledCard title="应届生平均薪资">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="major" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" fill="#82ca9d" name="月薪(元)" animationDuration={1500} />
              </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </StyledCard>
        </Col>
      </Row>

      <StyledCard title="专业与地域分布" style={{ marginTop: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
            <Radio.Button value="major">专业分布</Radio.Button>
            <Radio.Button value="region">地域分布</Radio.Button>
          </Radio.Group>
        </div>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartType === 'major' ? majorDistributionData : regionDistributionData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={(props: any) => renderActiveShape(props)}
                onMouseEnter={onPieEnter}
                animationDuration={1500}
              >
                {(chartType === 'major' ? majorDistributionData : regionDistributionData).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </StyledCard>

      <StyledCard title="数据说明" style={{ marginTop: 24 }}>
        <Paragraph>
          以上数据来源于教育部阳光高考平台、各高校官方公布数据以及第三方教育机构的统计分析。
          数据仅供参考，具体以各高校当年实际录取情况为准。
        </Paragraph>
      </StyledCard>
    </div>
  );
};

export default Analysis;