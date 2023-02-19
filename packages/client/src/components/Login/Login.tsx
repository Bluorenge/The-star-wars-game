import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Typography } from 'antd';
import { authApi } from 'api/auth';
import { routes } from 'constants/routes';
import { LoginInput } from 'models/auth.model';
import { en } from 'translations';

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
    <div className="formLogin">
      {contextHolder}
      <Typography.Title className="formLogin__heading">
        {en['auth.form.heading.login']}
      </Typography.Title>
      <Form form={form} name="formLogin" onFinish={onSubmit} layout="vertical">
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

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="formLogin__submitButton"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }
            >
              {en['auth.button.login']}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="formLogin__linkText">
        {en['auth.question.no-account-question']}{' '}
        <Link to={routes.REGISTER_PAGE_PATH}>{en['auth.button.register']}</Link>
      </Typography.Text>
    </div>
  );
};
