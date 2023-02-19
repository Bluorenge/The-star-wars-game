import { Button, Form, Input, Typography, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import './ProfileChangePassword.scss';
import { useNavigate } from 'react-router-dom';
import { en } from 'translations';
import { ProfileChangePasswordInput } from 'models/profile.model';
import { routes } from 'constants/routes';
import { profileApi } from 'api/profile';

export const ProfileChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  async function onSubmit(values: ProfileChangePasswordInput) {
    console.log({ values });
    try {
      const response = await profileApi.changeProfilePassword(values);

      if (response.status === 200) {
        navigate(routes.PROFILE_PAGE_PATH);
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
    <div className="formProfileChangePassword">
      {contextHolder}
      <Typography.Title>
        {en['profile.form-change-password.heading']}
      </Typography.Title>
      <Form
        form={form}
        name="formProfileChangePassword"
        onFinish={onSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="oldPassword"
          label={en['profile.form-change-password.label.old-password']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 4, message: en['validation.min-length.password'] },
            { max: 40, message: en['validation.max-length.password'] },
          ]}
        >
          <Input.Password
            placeholder={
              en['profile.form-change-password.placeholder.old-password']
            }
          />
        </Form.Item>

        <Form.Item
          name="password1"
          label={en['profile.form-change-password.label.password']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 4, message: en['validation.min-length.password'] },
            { max: 40, message: en['validation.max-length.password'] },
          ]}
        >
          <Input.Password
            placeholder={
              en['profile.form-change-password.placeholder.password']
            }
          />
        </Form.Item>

        <Form.Item
          name="password2"
          label={en['profile.form-change-password.label.confirm-password']}
          dependencies={['password1']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 4, message: en['validation.min-length.password'] },
            { max: 40, message: en['validation.max-length.password'] },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  en['validation.password.unmatched-passwords']
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={
              en['profile.form-change-password.placeholder.confirm-password']
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {en['universal.button.save']}
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
