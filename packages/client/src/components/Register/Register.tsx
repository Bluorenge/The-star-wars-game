import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useIntl } from 'react-intl';
import { Button, Form, Input, Typography, message } from 'antd';
import { authApi } from 'api/auth';
import { routes } from 'constants/routes';
import { RegisterInput } from 'models/auth.model';
// import { messages } from './common';

import './Register.scss';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getCurrentUser } from 'app/slices/userSlice';
import { en } from 'translations';

export const Register = () => {
  // const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();
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

      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'true');
        dispatch(getCurrentUser());
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
  }

  return (
    <div className="formRegister">
      {contextHolder}
      <Typography.Title className="formRegister__heading">
        {/* {fm(messages.formHeading)} */}
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
          // label={fm(messages.labelFirstName)}
          label={en['auth.form.label.first-name']}
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
          <Input placeholder={en['auth.form.placeholder.first-name']} />
        </Form.Item>
        <Form.Item
          name="secondName"
          // label={fm(messages.labelSecondName)}
          label={en['auth.form.label.second-name']}
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
          <Input placeholder={en['auth.form.placeholder.second-name']} />
        </Form.Item>
        <Form.Item
          name="login"
          // label={fm(messages.labelLogin)}
          label={en['auth.form.label.login']}
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
          <Input placeholder={en['auth.form.placeholder.login']} />
        </Form.Item>
        <Form.Item
          name="email"
          // label={fm(messages.labelEmail)}
          label={en['auth.form.label.email']}
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
          <Input placeholder={en['auth.form.placeholder.email']} />
        </Form.Item>
        <Form.Item
          name="password"
          // label={fm(messages.labelPassword)}
          label={en['auth.form.label.password']}
          rules={[
            // { required: true, message: fm(messages.validationRequiredField) },
            // { min: 4, message: fm(messages.validationPasswordMinLength) },
            // { max: 40, message: fm(messages.validationPasswordMaxLength) },
            { required: true, message: en['validation.required-field'] },
            { min: 4, message: en['validation.min-length.password'] },
            { max: 40, message: en['validation.max-length.password'] },
          ]}
        >
          {/* <Input.Password placeholder={fm(messages.placeholderPassword)} /> */}
          <Input.Password placeholder={en['auth.form.placeholder.password']} />
        </Form.Item>
        <Form.Item
          name="phone"
          // label={fm(messages.labelPhone)}
          label={en['auth.form.label.phone']}
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
              {/* {fm(messages.buttonRegister)} */}
              {en['auth.button.register']}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="formRegister__linkText">
        {/* {fm(messages.textAlreadyHaveAccount)}{' '}
        <Link to={routes.LOGIN_PAGE}>{fm(messages.buttonLogin)}</Link> */}
        {en['auth.question.already-have-account']}{' '}
        <Link to={routes.LOGIN_PAGE}>{en['auth.button.login']}</Link>
      </Typography.Text>
    </div>
  );
};
