import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, List, Tooltip, Carousel } from 'antd';

import TagSelect from 'components/TagSelect';
import Ellipsis from 'components/Ellipsis';
import StandardFormRow from 'components/StandardFormRow';

import styles from './index.less';

const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ episodelist, loading }) => ({
    episodelist,
    loading: loading.models.episodelist,
}))
export default class CoverCardList extends PureComponent {
    componentDidMount() {
        this.props.dispatch({
            type: 'episodelist/fetch',
            payload: {},
        });
    }

    handleFormSubmit = () => {
        const { form, dispatch } = this.props;
        // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
        setTimeout(() => {
            form.validateFields(err => {
                if (!err) {
                    // eslint-disable-next-line
                    dispatch({
                        type: 'list/fetch',
                        payload: {
                            count: 8,
                        },
                    });
                }
            });
        }, 0);
    };

    render() {
        const { episodelist: { episodelist }, loading, form } = this.props;
        const { getFieldDecorator } = form;

        const cardList = page =>
            Array.prototype.slice.call(episodelist, (page - 1) * 12, page * 12) ? (
                <List
                    grid={{ gutter: 8, column: 6 }}
                    rowKey="id"
                    loading={loading}
                    dataSource={Array.prototype.slice.call(episodelist, (page - 1) * 12, page * 12)}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                className={styles.card}
                                hoverable
                                style={{ width: 117, verticalAlign: 'top' }}
                                cover={<img alt={item.title} src={item.cover} />}
                                bodyStyle={{ padding: 10 }}
                            >
                                <Card.Meta
                                    // title={
                                    // 	<Tooltip title={`Rating: ${item.subDescription}`}>
                                    // 		<span>
                                    // 			<Rate
                                    // 				allowHalf
                                    // 				disabled
                                    // 				value={Math.round(item.subDescription)/2}
                                    // 				style={{ fontSize: "12px" }}
                                    // 			/>
                                    // 		</span>
                                    // 	</Tooltip>
                                    // }
                                    description={
                                        <Ellipsis lines={2}>
                                            <a
                                                href="#"
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#0c4842',
                                                }}
                                            >
                                                {`${item.title} `}
                                            </a>
                                            <Tooltip title={`Rating: ${item.subDescription}`}>
                                                <span
                                                    style={{
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        color: '#e09015',
                                                    }}
                                                >
                                                    {Math.round(item.subDescription * 10) / 10}
                                                </span>
                                            </Tooltip>
                                        </Ellipsis>
                                    }
                                    style={{ height: '42px' }}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            ) : null;

        return (
            <div className={styles.coverCardList}>
                <Card bodyStyle={{ padding: 6 }}>
                    <Form layout="inline">
                        <StandardFormRow
                            title="Recent Popular TV Series"
                            block
                            style={{ paddingBottom: 6, marginBottom: 6 }}
                        >
                            <FormItem>
                                {getFieldDecorator('category')(
                                    <TagSelect onChange={this.handleFormSubmit} expandable>
                                        <TagSelect.Option value="cat1">Popular</TagSelect.Option>
                                        <TagSelect.Option value="cat2">
                                            American Drama
                                        </TagSelect.Option>
                                        <TagSelect.Option value="cat3">
                                            British Drama
                                        </TagSelect.Option>
                                        <TagSelect.Option value="cat4">
                                            Spanish Drama
                                        </TagSelect.Option>
                                        <TagSelect.Option value="cat5">TV Shows</TagSelect.Option>
                                    </TagSelect>
                                )}
                            </FormItem>
                        </StandardFormRow>
                    </Form>
                </Card>
                <Carousel dots>
                    <div>
                        <h3>{cardList(1)}</h3>
                    </div>
                    <div>
                        <h3>{cardList(2)}</h3>
                    </div>
                    <div>
                        <h3>{cardList(3)}</h3>
                    </div>
                    <div>
                        <h3>{cardList(4)}</h3>
                    </div>
                    <div>
                        <h3>{cardList(5)}</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}
