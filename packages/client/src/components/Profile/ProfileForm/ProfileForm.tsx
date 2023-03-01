import {
  // useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
// import { useIntl } from 'react-intl';
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Spin,
  Typography,
  message,
} from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { authApi } from 'api/auth';
import { profileApi } from 'api/profile';
import { getCurrentUser, setCurrentUser } from 'app/slices/userSlice';
import { ProfileChangeAvatar } from 'components/Profile/ProfileChangeAvatar';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { API_URL } from 'constants/main';
import { routes } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { ProfileInput } from 'models/profile.model';
// import { messages } from './common';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { en } from 'translations';

import './ProfileForm.scss';

export const ProfileForm = () => {
  // const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();
  const { isFetching: isUserFetching, currentUser } = useAppSelector(
    (state) => state.user
  );
  const isCurrentUser = currentUser !== null;

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

    form.setFieldsValue(currentUser);
  };

  const handleChangePassword = () => {
    navigate(routes.PROFILE_CHANGE_PASSWORD_PAGE_PATH);
  };

  const handleSignOut = async () => {
    try {
      await authApi.signOut();
    } catch (err) {
      console.error({ err });
      messageApi.open({
        type: 'error',
        // @ts-expect-error: needs typing
        content: err.response.data.reason,
      });
    }

    dispatch(setCurrentUser(null));
    localStorage.removeItem(LOCAL_STORAGE_IS_AUTH_KEY);
    navigate(routes.LOGIN_PAGE);
  };

  async function onSubmit(values: ProfileInput) {
    try {
      const response = await profileApi.changeProfileInfo(values);

      if (response.status === 200) {
        dispatch(getCurrentUser());

        messageApi.open({
          type: 'success',
          content: en['universal.success'],
        });

        handleCancelEditing();
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
      <div className="formProfile">
        {contextHolder}
        <Typography.Title className="formProfile__heading">
          {en['profile.form.heading']}
        </Typography.Title>

        <div className="formProfile__avatarContainer">
          <Avatar
            size={100}
            src={
              currentUser?.avatar
                ? `${API_URL}/resources${currentUser.avatar}`
                : undefined
            }
            icon={<UserOutlined />}
            onClick={handleProfileAvatarModal}
            className="formProfile__avatar"
          />
        </div>
        {/* TODO: <Loader> */}
        {isUserFetching && <Spin spinning />}
        {!isUserFetching && isCurrentUser ? (
          <Form
            form={form}
            name="formProfile"
            className="formProfile__form"
            initialValues={currentUser || {}}
            onFinish={onSubmit}
            disabled={!isEditing || isUserFetching}
            autoComplete="off"
            requiredMark={false}
            labelCol={{ span: 4 }}
            labelAlign="left"
            colon={false}
          >
            <Form.Item
              name="firstName"
              // label={fm(messages.labelFirstName)}
              label={en['profile.form.label.first-name']}
              rules={[
                // { required: true, message: fm(messages.validationRequiredField) },
                // { min: 1, message: fm(messages.validationFirstNameMinLength) },
                // { max: 30, message: fm(messages.validationFirstNameMaxLength) },
                { required: true, message: en['validation.required-field'] },
                { min: 1, message: en['validation.min-length.first-name'] },
                { max: 30, message: en['validation.max-length.first-name'] },
              ]}
            >
              {/* <Input placeholder={fm(messages.placeholderFirstName)} /> */}
              <Input placeholder={en['profile.form.label.first-name']} />
            </Form.Item>

            <Form.Item
              name="secondName"
              // label={fm(messages.labelSecondName)}
              label={en['profile.form.label.second-name']}
              rules={[
                // { required: true, message: fm(messages.validationRequiredField) },
                // { min: 1, message: fm(messages.validationSecondNameMinLength) },
                // { max: 30, message: fm(messages.validationSecondNameMaxLength) },
                { required: true, message: en['validation.required-field'] },
                { min: 1, message: en['validation.min-length.second-name'] },
                { max: 30, message: en['validation.max-length.second-name'] },
              ]}
            >
              {/* <Input placeholder={fm(messages.placeholderSecondName)} /> */}
              <Input placeholder={en['profile.form.placeholder.second-name']} />
            </Form.Item>

            <Form.Item
              name="displayName"
              // label={fm(messages.labelDisplayName)}
              label={en['profile.form.label.display-name']}
            >
              {/* <Input placeholder={fm(messages.placeholderDisplayName)} /> */}
              <Input
                placeholder={en['profile.form.placeholder.display-name']}
              />
            </Form.Item>

            <Form.Item
              name="login"
              // label={fm(messages.labelLogin)}
              label={en['profile.form.label.login']}
              rules={[
                // { required: true, message: fm(messages.validationRequiredField) },
                // { min: 3, message: fm(messages.validationLoginMinLength) },
                // { max: 20, message: fm(messages.validationLoginMaxLength) },
                { required: true, message: en['validation.required-field'] },
                { min: 3, message: en['validation.min-length.login'] },
                { max: 20, message: en['validation.max-length.login'] },
              ]}
            >
              {/* <Input placeholder={fm(messages.placeholderLogin)} /> */}
              <Input placeholder={en['profile.form.placeholder.login']} />
            </Form.Item>

            <Form.Item
              name="email"
              // label={fm(messages.labelEmail)}
              label={en['profile.form.label.email']}
              rules={[
                // { required: true, message: fm(messages.validationRequiredField) },
                { required: true, message: en['validation.required-field'] },
                {
                  pattern: new RegExp(/[a-z0-9\-_]+@[a-z0-9\-_]+\.[a-z0-9]+/gi),
                  // message: fm(messages.validationEmailInvalidFormat),
                  message: en['validation.invalid-format.email'],
                },
                // { min: 5, message: fm(messages.validationEmailMinLength) },
                // { max: 30, message: fm(messages.validationEmailMaxLength) },
                { min: 5, message: en['validation.min-length.email'] },
                { max: 30, message: en['validation.max-length.email'] },
              ]}
            >
              {/* <Input placeholder={fm(messages.placeholderEmail)} /> */}
              <Input placeholder={en['profile.form.placeholder.email']} />
            </Form.Item>

            <Form.Item
              name="phone"
              // label={fm(messages.labelPhone)}
              label={en['profile.form.label.phone']}
              rules={[
                // { required: true, message: fm(messages.validationRequiredField) },
                { required: true, message: en['validation.required-field'] },
                {
                  pattern: new RegExp(/^[+*\d]{10,15}$/),
                  // message: fm(messages.validationPhoneInvalidFormat),
                  message: en['validation.invalid-format.phone'],
                },
                // { min: 10, message: fm(messages.validationPhoneMinLength) },
                // { max: 15, message: fm(messages.validationPhoneMaxLength) },
                { min: 10, message: en['validation.min-length.phone'] },
                { max: 15, message: en['validation.max-length.phone'] },
              ]}
            >
              {/* <Input placeholder={fm(messages.placeholderPhone)} /> */}
              <Input placeholder={en['profile.form.placeholder.phone']} />
            </Form.Item>

            {isEditing ? (
              <div className="formProfile__editButtons">
                <Button
                  danger
                  onClick={handleCancelEditing}
                  className="formProfile__editButton"
                >
                  {/* {fm(messages.buttonCancel)} */}
                  {en['universal.cancel']}
                </Button>
                <Form.Item style={{ margin: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="formProfile__editButton"
                  >
                    {/* {fm(messages.buttonSave)} */}
                    {en['universal.save']}
                  </Button>
                </Form.Item>
              </div>
            ) : null}
          </Form>
        ) : null}

        <Button
          onClick={handleChangeProfileInfo}
          type="link"
          className="formProfile__button"
        >
          {/* {fm(messages.buttonChangeProfileInfo)} */}
          {en['profile.button.change-profile-info']}
        </Button>
        <Button
          onClick={handleChangePassword}
          type="link"
          className="formProfile__button"
        >
          {/* {fm(messages.buttonChangePassword)} */}
          {en['profile.button.change-password']}
        </Button>
        <Button
          onClick={handleSignOut}
          type="link"
          className="formProfile__button_signOut"
        >
          {/* {fm(messages.buttonSignOut)} */}
          {en['universal.sign-out']}
        </Button>

        <Button
          shape="circle"
          icon={<LeftOutlined />}
          className="buttonBackProfile"
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
