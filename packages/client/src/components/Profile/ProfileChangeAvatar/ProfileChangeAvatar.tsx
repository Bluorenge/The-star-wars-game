import React from 'react';
// import { IntlFormatters, defineMessages, useIntl } from 'react-intl';
import { Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { profileApi } from 'api/profile';
import { setCurrentUser } from 'app/slices/userSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { en } from 'translations';

import './ProfileChangeAvatar.scss';

// const messages = defineMessages({
//   validationAvatarInvalidExtension: {
//     id: 'validation.avatar.invalid-extension',
//     defaultMessage: 'You can only upload JPG/PNG file',
//   },
//   validationAvatarSizeLimit: {
//     id: 'validation.avatar.size-limit',
//     defaultMessage: 'Image must smaller than 2MB',
//   },
// });

function beforeUpload(
  file: RcFile
  // { fm }: { fm: IntlFormatters['formatMessage'] }
) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.open({
      type: 'error',
      // content: fm(messages.validationAvatarInvalidExtension),
      content: en['validation.avatar.invalid-extension'],
    });
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.open({
      type: 'error',
      // content: fm(messages.validationAvatarSizeLimit),
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
  // const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  async function uploadAvatar(data: UploadRequestOption) {
    try {
      const formData = new FormData();
      formData.append('avatar', data.file);

      const response = await profileApi.changeProfileAvatar(formData);

      if (response.status === 200) {
        dispatch(setCurrentUser(response.data));

        onSuccess();
      }
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
        beforeUpload={(file: RcFile) => beforeUpload(file)}
        customRequest={uploadAvatar}
        className="uploadContainer"
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>{en['universal.upload']}</div>
        </div>
      </Upload>
    </>
  );
};
