import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Form, Input, Modal, Typography, message } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { profileApi } from 'api/profile';
import { ProfileChangeAvatar } from 'components/ProfileChangeAvatar';
import { routes } from 'constants/routes';
import { ProfileInput } from 'models/profile.model';
import { en } from 'translations';
import { initialUserInfo } from './mock';

import './Profile.scss';

export const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalAvatarOpen, setIsModalAvatarOpen] = useState<boolean>(false);

  const handleChangeProfileInfo = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleProfileAvatarModal = () => {
    setIsModalAvatarOpen((prevState) => !prevState);
  };

  const handleCancelEditing = () => {
    handleChangeProfileInfo();

    form.setFieldsValue(initialUserInfo);
  };

  const handleChangePassword = () => {
    navigate(routes.PROFILE_CHANGE_PASSWORD_PAGE_PATH);
  };

  const handleSignOut = () => {
    console.log('sign out');
  };

  async function onSubmit(values: ProfileInput) {
    console.log({ values });
    try {
      const response = await profileApi.changeProfileInfo(values);
      console.log({ response });
      messageApi.open({
        type: 'success',
        content: 'Success',
      });
      handleCancelEditing();
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
      <div className="formProfile">
        {contextHolder}
        <Typography.Title className="formProfile__heading">
          {en['profile.form.heading']}
        </Typography.Title>

        <div className="formProfile__avatarContainer">
          <Avatar
            size={100}
            // src={linkToAvatarFromRedux}
            icon={<UserOutlined />}
            onClick={handleProfileAvatarModal}
          />
        </div>

        <Form
          form={form}
          name="formProfile"
          // get data from redux
          initialValues={initialUserInfo}
          onFinish={onSubmit}
          disabled={!isEditing}
          requiredMark={false}
          labelCol={{ span: 4 }}
          labelAlign="left"
          colon={false}
        >
          <Form.Item
            name="firstName"
            label={en['profile.form.label.first-name']}
            rules={[
              { required: true, message: en['validation.required-field'] },
              { min: 1, message: en['validation.min-length.first-name'] },
              { max: 30, message: en['validation.max-length.first-name'] },
            ]}
          >
            <Input placeholder={en['profile.form.label.first-name']} />
          </Form.Item>

          <Form.Item
            name="secondName"
            label={en['profile.form.label.second-name']}
            rules={[
              { required: true, message: en['validation.required-field'] },
              { min: 1, message: en['validation.min-length.second-name'] },
              { max: 30, message: en['validation.max-length.second-name'] },
            ]}
          >
            <Input placeholder={en['profile.form.placeholder.second-name']} />
          </Form.Item>

          <Form.Item
            name="displayName"
            label={en['profile.form.label.display-name']}
          >
            <Input placeholder={en['profile.form.placeholder.display-name']} />
          </Form.Item>

          <Form.Item
            name="login"
            label={en['profile.form.label.login']}
            rules={[
              { required: true, message: en['validation.required-field'] },
              { min: 3, message: en['validation.min-length.login'] },
              { max: 20, message: en['validation.max-length.login'] },
            ]}
          >
            <Input placeholder={en['profile.form.placeholder.login']} />
          </Form.Item>

          <Form.Item
            name="email"
            label={en['profile.form.label.email']}
            rules={[
              { required: true, message: en['validation.required-field'] },
              {
                pattern: new RegExp(/[a-z0-9\-_]+@[a-z0-9\-_]+\.[a-z0-9]+/gi),
                message: en['validation.invalid-format.email'],
              },
              { min: 5, message: en['validation.min-length.email'] },
              { max: 30, message: en['validation.max-length.email'] },
            ]}
          >
            <Input placeholder={en['profile.form.placeholder.email']} />
          </Form.Item>

          <Form.Item
            name="phone"
            label={en['profile.form.label.phone']}
            rules={[
              { required: true, message: en['validation.required-field'] },
              {
                pattern: new RegExp(/^[+*\d]{10,15}$/),
                message: en['validation.invalid-format.phone'],
              },
              { min: 10, message: en['validation.min-length.phone'] },
              { max: 15, message: en['validation.max-length.phone'] },
            ]}
          >
            <Input placeholder={en['profile.form.placeholder.phone']} />
          </Form.Item>

          {isEditing ? (
            <div className="formProfile__editButtons">
              <Button
                danger
                onClick={handleCancelEditing}
                className="formProfile__editButton"
              >
                {en['universal.button.cancel']}
              </Button>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="formProfile__editButton"
                >
                  {en['universal.button.save']}
                </Button>
              </Form.Item>
            </div>
          ) : null}
        </Form>

        <Button
          onClick={handleChangeProfileInfo}
          type="link"
          className="formProfile__button"
        >
          {en['profile.button.change-profile-info']}
        </Button>
        <Button
          onClick={handleChangePassword}
          type="link"
          className="formProfile__button"
        >
          {en['profile.button.change-password']}
        </Button>
        <Button
          onClick={handleSignOut}
          type="link"
          className="formProfile__button_signOut"
        >
          {en['universal.button.sign-out']}
        </Button>

        <Button
          shape="circle"
          icon={<LeftOutlined />}
          className="buttonBackChangePassword"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      {isModalAvatarOpen ? (
        <Modal
          open={isModalAvatarOpen}
          footer={null}
          onCancel={handleProfileAvatarModal}
        >
          <ProfileChangeAvatar onSuccess={handleProfileAvatarModal} />
        </Modal>
      ) : null}
    </>
  );
};
