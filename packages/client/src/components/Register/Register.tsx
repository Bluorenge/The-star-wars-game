import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import { authApi } from 'api/auth';
import { routes } from 'constants/routes';
import { RegisterInput } from 'models/auth.model';
import { en } from 'translations';

import './Register.scss';

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  async function onSubmit(values: RegisterInput) {
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
    <div className="formRegister">
      {contextHolder}
      <Typography.Title className="formRegister__heading">
        {en['auth.form.heading.registration']}
      </Typography.Title>
      <Form
        form={form}
        name="formRegister"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label={en['auth.form.label.first-name']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 1, message: en['validation.min-length.first-name'] },
            { max: 30, message: en['validation.max-length.first-name'] },
          ]}
        >
          <Input placeholder={en['auth.form.placeholder.first-name']} />
        </Form.Item>
        <Form.Item
          name="secondName"
          label={en['auth.form.label.second-name']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 1, message: en['validation.min-length.second-name'] },
            { max: 30, message: en['validation.max-length.second-name'] },
          ]}
        >
          <Input placeholder={en['auth.form.placeholder.second-name']} />
        </Form.Item>
        <Form.Item
          name="login"
          label={en['auth.form.label.login']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 3, message: en['validation.min-length.login'] },
            { max: 20, message: en['validation.max-length.login'] },
          ]}
        >
          <Input placeholder={en['auth.form.placeholder.login']} />
        </Form.Item>
        <Form.Item
          name="email"
          label={en['auth.form.label.email']}
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
          <Input placeholder={en['auth.form.placeholder.email']} />
        </Form.Item>
        <Form.Item
          name="password"
          label={en['auth.form.label.password']}
          rules={[
            { required: true, message: en['validation.required-field'] },
            { min: 4, message: en['validation.min-length.password'] },
            { max: 40, message: en['validation.max-length.password'] },
          ]}
        >
          <Input.Password placeholder={en['auth.form.placeholder.password']} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={en['auth.form.label.phone']}
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
          <Input placeholder={en['auth.form.placeholder.phone']} />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="formRegister__submitButton"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }
            >
              {en['auth.button.register']}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="formRegister__linkText">
        {en['auth.question.already-have-account']}{' '}
        <Link to={routes.LOGIN_PAGE}>{en['auth.button.login']}</Link>
      </Typography.Text>
    </div>
  );
};
