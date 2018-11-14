import React, { PureComponent } from 'react';
import { Layout, Card, Affix } from 'antd';
import DragAndDropUploader from 'components/Upload/DragAndDropUploader';
import HeaderCard from './HeaderCard';
import styles from './index.less';

const { Content, Sider } = Layout;

export default class MapLayout extends PureComponent {
    render() {
        return (
            <Layout className={styles.layout}>
                <Content className={styles.content}>
                    <HeaderCard />
                </Content>
                <Sider className={styles.sider}>
                    <Affix>
                        <Card>
                            <DragAndDropUploader />
                        </Card>
                    </Affix>
                </Sider>
            </Layout>
        );
    }
}
