import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import { myConfig } from 'src/config';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';

const links = [
    {
        key: 'help',
        title: 'help',
        href: '',
    },
    {
        key: 'privacy',
        title: 'privacy',
        href: '',
    },
    {
        key: 'terms',
        title: 'terms',
        href: '',
    },
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 {myConfig.title}
    </Fragment>
);

class UserLayout extends React.PureComponent {
    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let { title } = myConfig;
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - ${myConfig.title}`;
        }
        return title;
    }
    render() {
        const { routerData, match } = this.props;
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <Link to="/">
                                    <img alt="logo" className={styles.logo} src={logo} />
                                    <br />
                                    {/* <span className={styles.title}>{myConfig.title}</span> */}
                                </Link>
                            </div>
                            <div className={styles.desc}>{myConfig.title}</div>
                        </div>
                        <Switch>
                            {getRoutes(match.path, routerData).map(item => (
                                <Route
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                />
                            ))}
                            <Redirect exact from="/user" to="/user/login" />
                        </Switch>
                    </div>
                    <GlobalFooter links={links} copyright={copyright} />
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
