import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import moment from 'moment';
import { connect } from 'dva';
import {
    List,
    Card,
    Radio,
    Button,
    Icon,
    Dropdown,
    Menu,
    Avatar,
    Tooltip,
    AutoComplete,
} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = AutoComplete;

@connect(({ user, loading }) => ({
    user,
    loading: loading.effects['user/fetch'],
}))
export default class BasicList extends PureComponent {
    state = {
        radioValue: 'user',
        searchKey: '',
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'user/fetch',
        });
    }

    onChange = e => {
        this.setState({
            radioValue: e.target.value,
        });
    };

    onChangeSearch = value => {
        this.setState({
            searchKey: value.toUpperCase(),
        });
    };

    render() {
        const { user, loading } = this.props;

        const { userList } = user;

        const filteredList = userList.filter(item => item.role === this.state.radioValue);

        const dataSource = filteredList.map(item => (
            <Option key={item.username.toString()}>{item.username}</Option>
        ));

        const filteredUsers =
            this.state.searchKey === ''
                ? filteredList
                : filteredList.filter(
                      item =>
                          item.username
                              .toUpperCase()
                              .indexOf(this.state.searchKey.toUpperCase()) !== -1
                  );

        const extraContent = (
            <div className={styles.extraContent}>
                <RadioGroup onChange={this.onChange} value={this.state.radioValue}>
                    <RadioButton value="admin">Admin</RadioButton>
                    <RadioButton value="user">User</RadioButton>
                    <RadioButton value="guest">Guest</RadioButton>
                </RadioGroup>
                <AutoComplete
                    className={styles.extraContentSearch}
                    placeholder="Search username"
                    dataSource={dataSource}
                    onChange={this.onChangeSearch}
                    filterOption={(inputValue, option) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>
        );

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 10,
            total: 100,
        };

        const iconStatus = {
            unverified: <Icon className={styles.unverified} type="exclamation-circle" />,
            verified: <Icon className={styles.verified} type="check-circle" />,
        };

        const descStatus = {
            unverified: 'Unverified',
            verified: 'Verified',
        };

        const ListContent = ({ data: { email, createdAt, updatedAt } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>Email:</span> <a>{email}</a>
                    <br />
                    <span>Created time:</span> <a>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</a>
                    <br />
                    <span>Updated time:</span> <a>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</a>
                </div>
            </div>
        );

        const menu = (
            <Menu>
                <Menu.Item>
                    <a>Edit</a>
                </Menu.Item>
                <Menu.Item>
                    <a>Delete</a>
                </Menu.Item>
            </Menu>
        );

        const MoreBtn = () => (
            <Dropdown overlay={menu}>
                <a>
                    More <Icon type="down" />
                </a>
            </Dropdown>
        );

        return (
            <PageHeaderLayout>
                <div className={styles.standardList}>
                    <Card
                        className={styles.listCard}
                        bordered={false}
                        title="User list"
                        style={{ marginTop: '24px' }}
                        bodyStyle={{ padding: '0px 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Button
                            type="dashed"
                            style={{ width: '100%', marginBottom: 8 }}
                            icon="plus"
                        >
                            Add
                        </Button>
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            pagination={paginationProps}
                            dataSource={filteredUsers}
                            renderItem={item => (
                                <List.Item actions={[<a>Edit</a>, <MoreBtn />]}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.logo} shape="square" size="large" />
                                        }
                                        title={
                                            <div className={styles.listTitle}>
                                                <Link to={`/people/${item.id}`} key="userpage">
                                                    {item.username}
                                                </Link>
                                                <Tooltip
                                                    placement="right"
                                                    title={descStatus[item.status]}
                                                >
                                                    <a>{iconStatus[item.status]}</a>
                                                </Tooltip>
                                            </div>
                                        }
                                        description={
                                            <span className={styles.listDescription}>
                                                {item.position}
                                            </span>
                                        }
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}
