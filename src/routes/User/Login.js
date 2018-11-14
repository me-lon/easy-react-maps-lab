import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true,
    };

    onTabChange = type => {
        this.setState({ type });
    };

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if (!err) {
            this.props.dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type,
                },
            });
        }
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };

    render() {
        const { login, submitting } = this.props;
        const { type } = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                >
                    <Tab key="account" tab="Username">
                        {login.status === 'error' &&
                            login.type === 'account' &&
                            !login.submitting &&
                            this.renderMessage('Failed user/email or password')}
                        <UserName name="userName" placeholder="Username" />
                        <Password name="password" placeholder="Password" />
                    </Tab>
                    <Tab key="mobile" tab="Phone number">
                        {login.status === 'error' &&
                            login.type === 'mobile' &&
                            !login.submitting &&
                            this.renderMessage('Verification code error')}
                        <Mobile name="mobile" />
                        <Captcha name="captcha" />
                    </Tab>
                    <div>
                        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
                            Remember me
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            Forgot password
                        </a>
                    </div>
                    <Submit loading={submitting}>Sign in</Submit>
                    <div className={styles.other}>
                        Other ways to login
                        <Icon className={styles.icon} type="google" />
                        <Icon className={styles.icon} type="facebook" />
                        <Icon className={styles.icon} type="twitter" />
                        <Link className={styles.register} to="/user/register">
                            Sign up now!
                        </Link>
                    </div>
                </Login>
            </div>
        );
    }
}
