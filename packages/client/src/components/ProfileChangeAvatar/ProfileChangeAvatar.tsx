import React from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { profileApi } from 'api/profile';
import { RcFile } from 'antd/es/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { en } from 'translations';

import './ProfileChangeAvatar.scss';

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.open({
      type: 'error',
      content: en['validation.avatar.invalid-extension'],
    });
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.open({
      type: 'error',
      content: en['validation.avatar.size-limit'],
    });
  }

  return isJpgOrPng && isLt2M;
}

interface ProfileChangeAvatarProps {
  onSuccess: () => void;
}

export const ProfileChangeAvatar: React.FC<ProfileChangeAvatarProps> = ({
  onSuccess,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  async function uploadAvatar(data: UploadRequestOption) {
    try {
      const formData = new FormData();
      formData.append('avatar', data.file);

      const response = await profileApi.changeProfileAvatar(formData);

      console.log({ response });
      onSuccess();
    } catch (err) {
      console.error({ err });

      messageApi.open({
        type: 'error',
        // @ts-expect-error: needs typing
        content: err.response.data.reason,
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Upload
        name="avatar"
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={uploadAvatar}
        className="uploadContainer"
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </>
  );
};
