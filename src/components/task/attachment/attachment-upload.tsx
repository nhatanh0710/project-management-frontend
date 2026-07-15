'use client';

import { Upload, Button } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { useTaskAttachment } from '@/contexts/task-attachment.context';

export default function AttachmentUpload() {
  const {
    uploadAttachments,
  } = useTaskAttachment();

  return (
    <Upload
    multiple
    beforeUpload={() => false}
    showUploadList={false}
    fileList={[]}
    onChange={async ({ fileList }) => {
        const files = fileList
            .map(f => f.originFileObj!)
            .filter(Boolean);

        await uploadAttachments(files);
    }}
>
      <Button
        type="primary"
        icon={
          <UploadOutlined />
        }
      >
        Upload Attachment
      </Button>
    </Upload>
  );
}