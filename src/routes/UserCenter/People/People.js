import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Avatar, Row, Col, Card } from 'antd';

import styles from './People.less';

@connect(({ people }) => ({
    people,
    loading: true,
}))
export default class People extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'people/fetch',
            payload: this.props.match.params.id,
        });
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.props.people.userid) {
            this.props.dispatch({
                type: 'people/fetch',
                payload: this.props.match.params.id,
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'people/clear',
        });
    }

    render() {
        const { people } = this.props;

        const { name, avatar, notifyCount, position } = people;

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };

        return (
            <Fragment>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <Card>
                            <div className={styles.pageHeaderContent}>
                                <div className={styles.avatar}>
                                    <Avatar size="large" src={avatar} />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.contentTitle}>
                                        {`${name}'s personal page`}
                                    </div>
                                    <div>{position}</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <Card>
                            <div className={styles.extraContent}>
                                <div className={styles.statItem}>
                                    <p>Publications</p>
                                    <p>{notifyCount}</p>
                                </div>
                                <div className={styles.statItem}>
                                    <p>Fields</p>
                                    <p>
                                        8<span> / 24</span>
                                    </p>
                                </div>
                                <div className={styles.statItem}>
                                    <p>Likes</p>
                                    <p>2,223</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
