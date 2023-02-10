import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import { authApi } from 'api/auth';
import {
  ALREADY_HAVE_ACCOUNT_QUESTION,
  EMAIL_INVALID_FORMAT,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  FIRST_NAME_LABEL,
  FIRST_NAME_PLACEHOLDER,
  LOGIN_BUTTON,
  LOGIN_LABEL,
  LOGIN_PLACEHOLDER,
  MAX_EMAIL_LENGTH,
  MAX_FIRST_NAME_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_SECOND_NAME_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_FIRST_NAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
  MIN_SECOND_NAME_LENGTH,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  PHONE_LABEL,
  PHONE_PLACEHOLDER,
  REGISTER_BUTTON,
  REGISTER_FORM_HEADING,
  SECOND_NAME_LABEL,
  SECOND_NAME_PLACEHOLDER,
} from 'constants/text/auth';
import { REQUIRED_FIELD_ERROR } from 'constants/text/default';
import { RegisterInput } from 'models/auth.model';
import { routes } from 'constants/routes';

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  async function onSubmit(values: RegisterInput) {
    console.log({ values });
    try {
      const response = await authApi.register(values);
      console.log({ response });

      if (response.status === 200) {
        navigate(routes.LOGIN_PAGE);
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
    <div className="form">
      {contextHolder}
      <Typography.Title className="form__heading">
        {REGISTER_FORM_HEADING}
      </Typography.Title>
      <Form
        form={form}
        name="registerForm"
        onFinish={onSubmit}
        layout="vertical">
        <Form.Item
          name="firstName"
          label={FIRST_NAME_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { min: 1, message: MIN_FIRST_NAME_LENGTH },
            { max: 30, message: MAX_FIRST_NAME_LENGTH },
          ]}>
          <Input placeholder={FIRST_NAME_PLACEHOLDER} />
        </Form.Item>
        <Form.Item
          name="secondName"
          label={SECOND_NAME_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { min: 1, message: MIN_SECOND_NAME_LENGTH },
            { max: 30, message: MAX_SECOND_NAME_LENGTH },
          ]}>
          <Input placeholder={SECOND_NAME_PLACEHOLDER} />
        </Form.Item>
        <Form.Item
          name="login"
          label={LOGIN_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { min: 3, message: MIN_LOGIN_LENGTH },
            { max: 20, message: MAX_LOGIN_LENGTH },
          ]}>
          <Input placeholder={LOGIN_PLACEHOLDER} />
        </Form.Item>
        <Form.Item
          name="email"
          label={EMAIL_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { type: 'email', message: EMAIL_INVALID_FORMAT },
            { min: 5, message: MIN_EMAIL_LENGTH },
            { max: 30, message: MAX_EMAIL_LENGTH },
          ]}>
          <Input placeholder={EMAIL_PLACEHOLDER} />
        </Form.Item>
        <Form.Item
          name="password"
          label={PASSWORD_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { min: 4, message: MIN_PASSWORD_LENGTH },
            { max: 40, message: MAX_PASSWORD_LENGTH },
          ]}>
          <Input.Password placeholder={PASSWORD_PLACEHOLDER} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={PHONE_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { min: 10, message: MIN_PHONE_LENGTH },
            { max: 15, message: MAX_PHONE_LENGTH },
          ]}>
          <Input placeholder={PHONE_PLACEHOLDER} />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="form__submitButton"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }>
              {REGISTER_BUTTON}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="form__linkText">
        {ALREADY_HAVE_ACCOUNT_QUESTION}{' '}
        <Link to={routes.LOGIN_PAGE}>{LOGIN_BUTTON}</Link>
      </Typography.Text>
    </div>
  );
};
