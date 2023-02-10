import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Typography } from 'antd';
import { authApi } from 'api/auth';
import {
  LOGIN_BUTTON,
  LOGIN_FORM_HEADING,
  LOGIN_LABEL,
  LOGIN_PLACEHOLDER,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  NO_ACCOUNT_QUESTION,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  REGISTER_BUTTON,
} from 'constants/text/auth';
import { REQUIRED_FIELD_ERROR } from 'constants/text/default';
import { routes } from 'constants/routes';
import { LoginInput } from 'models/auth.model';

import './Login.scss';

export const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  async function onSubmit(values: LoginInput) {
    console.log({ values });

    try {
      const response = await authApi.login(values);
      console.log({ response });

      if (response.status === 200) {
        navigate(routes.MAIN_PAGE_PATH);
      }
    } catch (err) {
      console.error({ err });
      messageApi.open({
        type: 'error',
        // @ts-expect-error: needs typing
        content: err.response.data.reason,
      });
    }

    form.resetFields();
  }

  return (
    <div className="form">
      {contextHolder}
      <Typography.Title className="form__heading">
        {LOGIN_FORM_HEADING}
      </Typography.Title>
      <Form form={form} name="loginForm" onFinish={onSubmit} layout="vertical">
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
          name="password"
          label={PASSWORD_LABEL}
          rules={[
            { required: true, message: REQUIRED_FIELD_ERROR },
            { min: 4, message: MIN_PASSWORD_LENGTH },
            { max: 40, message: MAX_PASSWORD_LENGTH },
          ]}>
          <Input.Password placeholder={PASSWORD_PLACEHOLDER} />
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
              {LOGIN_BUTTON}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="form__linkText">
        {NO_ACCOUNT_QUESTION}{' '}
        <Link to={routes.REGISTER_PAGE_PATH}>{REGISTER_BUTTON}</Link>
      </Typography.Text>
    </div>
  );
};
