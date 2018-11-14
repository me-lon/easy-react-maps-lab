import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
    <div style={{ margin: '0px 0px 0' }} className={wrapperClassName}>
        {top}
        {<PageHeader key="pageheader" {...restProps} linkElement={Link} />}
        {children ? <div className={styles.content}>{children}</div> : null}
    </div>
);