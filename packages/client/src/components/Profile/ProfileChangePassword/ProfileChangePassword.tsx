import { useNavigate } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Form, Input, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { profileApi } from 'api/profile';
import { ROUTES } from 'constants/routes';
import { handleErrorFromServer } from 'helpers/errorNotification';
import { ProfileChangePasswordInput } from 'models/profile.model';

import './ProfileChangePassword.scss';

const messages = defineMessages({
  buttonSave: { id: 'universal.save', defaultMessage: 'Save' },
  formHeading: {
    id: 'profile.form-change-password.heading',
    defaultMessage: 'Change password',
  },
  labelOldPassword: {
    id: 'profile.form-change-password.label.old-password',
    defaultMessage: 'Old Password',
  },
  labelConfirmPassword: {
    id: 'profile.form-change-password.label.confirm-password',
    defaultMessage: 'Confirm password',
  },
  labelPassword: {
    id: 'profile.form-change-password.label.password',
    defaultMessage: 'Password',
  },
  placeholderConfirmPassword: {
    id: 'profile.form-change-password.placeholder.confirm-password',
    defaultMessage: 'Confirm password',
  },
  placeholderOldPassword: {
    id: 'profile.form-change-password.placeholder.old-password',
    defaultMessage: 'Old Password',
  },
  placeholderPassword: {
    id: 'profile.form-change-password.placeholder.password',
    defaultMessage: 'Password',
  },
  validationPasswordMaxLength: {
    id: 'validation.max-length.password',
    defaultMessage: 'Password cannot be longer than 40 characters',
  },
  validationPasswordMinLength: {
    id: 'validation.min-length.password',
    defaultMessage: 'Password must be at least 4 characters',
  },
  validationPasswordUnmatched: {
    id: 'validation.password.unmatched-passwords',
    defaultMessage: 'Passwords must match',
  },
  validationRequiredField: {
    id: 'validation.required-field',
    defaultMessage: 'This field is required',
  },
});

export const ProfileChangePassword = () => {
  const { formatMessage: fm } = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  async function onSubmit(values: ProfileChangePasswordInput) {
    console.log({ values });
    try {
      const response = await profileApi.changeProfilePassword(values);

      if (response.status === 200) {
        navigate(ROUTES.PROFILE_PAGE_PATH);
      }
    } catch (err) {
      handleErrorFromServer(err);
    }
  }

  return (
    <div className="formProfileChangePassword">
      <Typography.Title>{fm(messages.formHeading)}</Typography.Title>
      <Form
        form={form}
        name="formProfileChangePassword"
        onFinish={onSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="oldPassword"
          label={fm(messages.labelOldPassword)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            { min: 4, message: fm(messages.validationPasswordMinLength) },
            { max: 40, message: fm(messages.validationPasswordMaxLength) },
          ]}
        >
          <Input.Password placeholder={fm(messages.placeholderOldPassword)} />
        </Form.Item>

        <Form.Item
          name="password1"
          label={fm(messages.labelPassword)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            { min: 4, message: fm(messages.validationPasswordMinLength) },
            { max: 40, message: fm(messages.validationPasswordMaxLength) },
          ]}
        >
          <Input.Password placeholder={fm(messages.placeholderPassword)} />
        </Form.Item>

        <Form.Item
          name="password2"
          label={fm(messages.labelConfirmPassword)}
          dependencies={['password1']}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            { min: 4, message: fm(messages.validationPasswordMinLength) },
            { max: 40, message: fm(messages.validationPasswordMaxLength) },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(fm(messages.validationPasswordUnmatched));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={fm(messages.placeholderConfirmPassword)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {fm(messages.buttonSave)}
          </Button>
        </Form.Item>
      </Form>

      <Button
        shape="circle"
        icon={<LeftOutlined />}
        className="buttonBackChangePassword"
        onClick={() => {
          navigate(-1);
        }}
      />
    </div>
  );
};
