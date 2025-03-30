import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface MainLayoutProps {
  children: ReactNode;
}

const MainContainer = styled.main`
  min-height: calc(100vh - 64px - 200px);
  padding: 24px;
  background-color: #f5f5f5;
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  return <MainContainer>{children}</MainContainer>;
};

export default MainLayout; 