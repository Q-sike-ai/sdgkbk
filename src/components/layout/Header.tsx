import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const { Header: AntHeader } = Layout;

const StyledHeader = styled(AntHeader)`
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  text-decoration: none;
  margin-right: 48px;

  img {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
`;

const StyledMenu = styled(Menu)`
  flex: 1;
  border: none;
  background: transparent;
`;

const Header = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/', label: '首页' },
    { key: '/admission-form', label: '报考表单' },
    { key: '/analysis', label: '数据分析' },
    { key: '/divination', label: '周易分析' },
    { key: '/blessing', label: '文曲祈福' },
    { key: '/faq', label: '常见问题' },
  ];

  return (
    <StyledHeader>
      <Logo to="/">
        <img src="./images/图标/学校.svg" alt="Logo" />
        高考报考助手
      </Logo>
      <StyledMenu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems.map(item => ({
          ...item,
          label: <Link to={item.key}>{item.label}</Link>
        }))}
      />
    </StyledHeader>
  );
};

export default Header;