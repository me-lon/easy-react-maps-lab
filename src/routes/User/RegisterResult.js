import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
    <div className={styles.actions}>
        <a href="https://www.google.com/gmail/">
            <Button size="large" type="primary">
                Check email
            </Button>
        </a>
        <Link to="/">
            <Button size="large">Return homepage</Button>
        </Link>
    </div>
);

export default ({ location }) => (
    <Result
        className={styles.registerResult}
        type="success"
        title={
            <div className={styles.title}>
                Your account：{location.state ? location.state.account : 'piscium-proj@gmail.com'}{' '}
                has successfully registered
            </div>
        }
        description="The activation email has been sent to your email. The email is valid for 24 hours. Please login to your mailbox and click on the link in the email to activate your account."
        actions={actions}
        style={{ marginTop: 56 }}
    />
);
