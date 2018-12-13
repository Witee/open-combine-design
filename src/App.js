import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'normalize.css';
import OCDLayout from 'containers/Layout';
import Index from 'containers/Index';
import Input from 'containers/Input';
import Placeholder from 'containers/Placeholder';
import Popover from 'containers/Popover';
import Chart from 'containers/Chart';
import DataEditor from 'containers/DataEditor';

import './app.css';

const { Header, Content, Sider, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super();
    const { match: { path }, location: { pathname } } = props;
    let currentMenu = pathname;
    if (_.startsWith(pathname, `${path}/components`)) {
      currentMenu = `${path}/components`;
    }
    this.state = {
      currentMenu,
      currentSubMenu: pathname,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { match: { path }, location: { pathname } } = nextProps;
    let currentMenu = `${path}/index`;
    if (_.startsWith(pathname, `${path}/components`)) {
      currentMenu = `${path}/components`;
    }
    this.setState({ currentMenu, currentSubMenu: pathname });
  }

  render() {
    const { match: { path } } = this.props;
    const { currentMenu, currentSubMenu } = this.state;

    return (
      <Layout>
        <Header className="header">
          <div className="logo" style={{ color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            OCD
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentMenu]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key={`${path}/index`}>
              <Link to={`${path}/index`}>
                首页
              </Link>
            </Menu.Item>
            <Menu.Item key={`${path}/components`}>
              <Link to={`${path}/components/layout`}>
                组件
              </Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys={[currentSubMenu]}
            >
              <Menu.ItemGroup title="Layout">
                <Menu.Item key={`${path}/components/layout`}>
                  <Link to={`${path}/components/layout`}>
                    Layout 布局
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>

              <Menu.ItemGroup title="Data Entry">
                <Menu.Item key={`${path}/components/input`}>
                  <Link to={`${path}/components/input`}>
                    Input 输入框
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>

              <Menu.ItemGroup title="Data Display">
                <Menu.Item key={`${path}/components/placeholder`}>
                  <Link to={`${path}/components/placeholder`}>
                    Placeholder 占位
                  </Link>
                </Menu.Item>

                <Menu.Item key={`${path}/components/popover`}>
                  <Link to={`${path}/components/popover`}>
                    Popover 气泡卡片
                  </Link>
                </Menu.Item>

                <Menu.Item key={`${path}/components/chart`}>
                  <Link to={`${path}/components/chart`}>
                    Chart 图表
                  </Link>
                </Menu.Item>

                <Menu.Item key={`${path}/components/data-editor`}>
                  <Link to={`${path}/components/data-editor`}>
                    DataEditor 数据编辑器
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>

            </Menu>
          </Sider>

          <Layout style={{ padding: '0 24px 24px', minHeight: '500px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: '32px  0 0 0', minHeight: 280 }}>
              <Switch>
                <Route path={`${path}/index`} component={Index} />

                <Route path={`${path}/components/layout`} component={OCDLayout} />

                <Route path={`${path}/components/input`} component={Input} />

                <Route path={`${path}/components/placeholder`} component={Placeholder} />
                <Route path={`${path}/components/popover`} component={Popover} />
                <Route path={`${path}/components/chart`} component={Chart} />
                <Route path={`${path}/components/data-editor`} component={DataEditor} />

                {/* 默认路由 */}
                <Redirect to={`${path}/index`} />
              </Switch>
            </Content>
          </Layout>
        </Layout>

        <Footer style={{ textAlign: 'center', backgroundColor: '#e8e9ea' }}>
          <strong>
            版权所有 © Copyright AdMaster Inc. v1.0.0
          </strong>
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default App;
