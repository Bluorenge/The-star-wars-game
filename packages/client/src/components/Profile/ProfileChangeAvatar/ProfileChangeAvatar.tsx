import { FC } from 'react';
import { IntlFormatters, defineMessages, useIntl } from 'react-intl';
import { Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { profileApi } from 'api/profile';
import { setCurrentUser } from 'core/store/slices/userSlice';
import { handleErrorFromServer } from 'helpers/errorNotification';
import { useAppDispatch } from 'hooks/useAppDispatch';

import './ProfileChangeAvatar.scss';

const messages = defineMessages({
  textUpload: { id: 'universal.upload', defaultMessage: 'Upload' },
  validationAvatarInvalidExtension: {
    id: 'validation.avatar.invalid-extension',
    defaultMessage: 'You can only upload JPG/PNG file',
  },
  validationAvatarSizeLimit: {
    id: 'validation.avatar.size-limit',
    defaultMessage: 'Image must smaller than 2MB',
  },
});

function beforeUpload(
  file: RcFile,
  { fm }: { fm: IntlFormatters['formatMessage'] }
) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.open({
      type: 'error',
      content: fm(messages.validationAvatarInvalidExtension),
    });
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.open({
      type: 'error',
      content: fm(messages.validationAvatarSizeLimit),
    });
  }

  return isJpgOrPng && isLt2M;
}

interface ProfileChangeAvatarProps {
  onSuccess: () => void;
}

export const ProfileChangeAvatar: FC<ProfileChangeAvatarProps> = ({
  onSuccess,
}) => {
  const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();

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
      handleErrorFromServer(err);
    }
  }

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={(file: RcFile) => beforeUpload(file, { fm })}
        customRequest={uploadAvatar}
        className="uploadContainer"
      >
        <div>
          <PlusOutlined />
          <div className="uploadContainer__textUpload">
            {fm(messages.textUpload)}
          </div>
        </div>
      </Upload>
    </>
  );
};
