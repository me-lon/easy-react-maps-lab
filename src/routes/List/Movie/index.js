import React, { PureComponent } from 'react';
import { Layout, Menu, Card, Affix } from 'antd';
import CoverCardList from './Episode/index.js';
import styles from './index.less';

const { Header, Content, Sider } = Layout;

export default class MovieLayout extends PureComponent {
    render() {
        return (
            <Layout className={styles.layout}>
                <Content className={styles.content}>
                    <Layout className={styles.sublayout}>
                        <Header className={styles.header}>
                            <Menu
                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">Recent Popular</Menu.Item>
                                <Menu.Item key="2">Movies</Menu.Item>
                                <Menu.Item key="3">TV Series</Menu.Item>
                            </Menu>
                        </Header>
                        <Content className={styles.content}>
                            <CoverCardList />
                        </Content>
                    </Layout>
                </Content>
                <Sider className={styles.sider}>
                    <Affix>
                        <Card>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                            <span>some thing here</span>
                        </Card>
                    </Affix>
                </Sider>
            </Layout>
        );
    }
}
