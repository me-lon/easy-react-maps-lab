import { Upload, Icon, message } from 'antd';
import React, { Component } from 'react';

class DragAndDropUploader extends Component {
    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: 'api/uploadGTFS',
            onChange(info) {
                const { status } = info.file.status;
                if (status !== 'uploading') {
                    // eslint-disable-next-line no-console
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload</p>
            </Upload.Dragger>
        );
    }
}

export default DragAndDropUploader;
