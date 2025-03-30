import { Layout } from 'antd';
import styled from '@emotion/styled';
import BackgroundMusic from '../components/BackgroundMusic';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  background: #f5f5f5;
`;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      <StyledContent>
        {children}
      </StyledContent>
      <BackgroundMusic />
    </StyledLayout>
  );
};

export default MainLayout;