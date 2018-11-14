import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    getNoticeData() {
        const { notices = [] } = this.props;
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    state = {
        current: 'maps',
    };
    render() {
        const {
            currentuser = {},
            collapsed,
            fetchingNotices,
            isMobile,
            logo,
            handleClick,
            onNoticeVisibleChange,
            onMenuClick,
            onNoticeClear,
        } = this.props;
        const menu = (
            <Menu
                className={styles.menu}
                selectedKeys={[this.state.current]}
                onClick={this.handleClick}
            >
                <Menu.Item key="people">
                    <Icon type="user" />User profile
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />Setting
                </Menu.Item>
                <Menu.Item key="triggerError">
                    <Icon type="close-circle" />Trigger error
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />Sign out
                </Menu.Item>
            </Menu>
        );
        const noticeData = this.getNoticeData();
        return (
            <div className={styles.header}>
                <Link to="/user" className={styles.logomobile} key="logo">
                    <img src={logo} alt="logo" width="128" />
                </Link>
                <Menu
                    className={styles.class}
                    selectedKeys={[]}
                    onClick={onMenuClick}
                    mode="horizontal"
                >
                    <Menu.Item className={styles.menuitem} key="maps">
                        <Link to="/maps" className={styles.network} key="network">
                            NETWORK
                        </Link>
                    </Menu.Item>
                    <Menu.Item className={styles.menuitem} key="episode">
                        <Link to="/list/movie/episode" className={styles.episode} key="episode">
                            EPISODE
                        </Link>
                    </Menu.Item>
                    <Menu.Item className={styles.menuitem} key="userlist">
                        <Link to="/usercenter/user-list" className={styles.userlist} key="userlist">
                            USER LIST
                        </Link>
                    </Menu.Item>
                </Menu>
                <HeaderSearch
                    className={`${styles.action} ${styles.search}`}
                    placeholder="Site search"
                    dataSource={['Search tip 1', 'Search tip 2', 'Search tip 3']}
                    onSearch={value => {
                        console.log('input', value); // eslint-disable-line
                    }}
                    onPressEnter={value => {
                        console.log('enter', value); // eslint-disable-line
                    }}
                />
                <Tooltip title="Use documents">
                    <a
                        target="_blank"
                        href="https://github.com/piscium-proj/piscium/blob/stamen/README.md"
                        rel="noopener noreferrer"
                        className={styles.action}
                    >
                        <Icon type="question-circle-o" />
                    </a>
                </Tooltip>
                <NoticeIcon
                    className={styles.action}
                    count={currentuser.notifycount}
                    onItemClick={(item, tabProps) => {
                        console.log(item, tabProps); // eslint-disable-line
                    }}
                    onClear={onNoticeClear}
                    onPopupVisibleChange={onNoticeVisibleChange}
                    loading={fetchingNotices}
                    popupAlign={{ offset: [20, -16] }}
                >
                    <NoticeIcon.Tab
                        list={noticeData['Notice']}
                        title="Notice"
                        emptyText="You have reviewed all notifications"
                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                    />
                    <NoticeIcon.Tab
                        list={noticeData['Message']}
                        title="Message"
                        emptyText="You have read all the messages"
                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    />
                    <NoticeIcon.Tab
                        list={noticeData['Upcoming']}
                        title="Upcoming"
                        emptyText="You have completed all your upcomings"
                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                    />
                </NoticeIcon>
                {currentuser.username ? (
                    <Dropdown overlay={menu}>
                        <span className={`${styles.action} ${styles.account}`}>
                            <Avatar
                                size="small"
                                className={styles.avatar}
                                src={currentuser.avatar}
                            />
                            <span className={styles.name}>{currentuser.username}</span>
                        </span>
                    </Dropdown>
                ) : (
                    <Spin size="small" style={{ marginLeft: 8 }} />
                )}
            </div>
        );
    }
}
