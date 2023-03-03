import { Link, useNavigate } from 'react-router-dom';
// import { defineMessages, useIntl } from 'react-intl';
import { Button, Form, Input, message, Typography } from 'antd';
import { authApi } from 'api/auth';
import { getCurrentUser } from 'app/slices/userSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { routes } from 'constants/routes';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { LoginInput } from 'models/auth.model';
import { en } from 'translations';

import './Login.scss';

// const messages = defineMessages({
//   buttonRegister: { id: 'auth.button.register', defaultMessage: 'Sign up' },
//   buttonSignIn: { id: 'auth.button.login', defaultMessage: 'Sign in' },
//   formHeading: {
//     id: 'auth.form.heading.login',
//     defaultMessage: 'Sign in',
//   },
//   labelLogin: { id: 'auth.form.label.login', defaultMessage: 'Login' },
//   labelPassword: { id: 'auth.form.label.password', defaultMessage: 'Password' },
//   placeholderLogin: {
//     id: 'auth.form.placeholder.login',
//     defaultMessage: 'Login',
//   },
//   placeholderPassword: {
//     id: 'auth.form.placeholder.password',
//     defaultMessage: 'Password',
//   },
//   textNoAccount: {
//     id: 'auth.question.no-account-question',
//     defaultMessage: 'No account?',
//   },
//   validationLoginMaxLength: {
//     id: 'validation.max-length.login',
//     defaultMessage: 'Login cannot be longer than 20 characters',
//   },
//   validationLoginMinLength: {
//     id: 'validation.min-length.login',
//     defaultMessage: 'Login must be at least 4 characters',
//   },
//   validationPasswordMaxLength: {
//     id: 'validation.max-length.password',
//     defaultMessage: 'Password cannot be longer than 40 characters',
//   },
//   validationPasswordMinLength: {
//     id: 'validation.min-length.password',
//     defaultMessage: 'Password must be at least 4 characters',
//   },
//   validationRequiredField: {
//     id: 'validation.required-field',
//     defaultMessage: 'This field is required',
//   },
// });

export const Login = () => {
  // const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  async function onSubmit(values: LoginInput) {
    try {
      const response = await authApi.login(values);

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

    form.resetFields();
  }

  return (
    <div className="formLogin">
      {contextHolder}
      <Typography.Title className="formLogin__heading">
        {/* {fm(messages.formHeading)} */}
        {en['auth.form.heading.login']}
      </Typography.Title>
      <Form form={form} name="formLogin" onFinish={onSubmit} layout="vertical">
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
              {/* {fm(messages.buttonSignIn)} */}
              {en['auth.button.login']}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="formLogin__linkText">
        {/* {fm(messages.textNoAccount)}{' '}
        <Link to={routes.REGISTER_PAGE_PATH}>
          {fm(messages.buttonRegister)} */}
        {en['auth.question.no-account-question']}{' '}
        <Link to={routes.REGISTER_PAGE_PATH}>{en['auth.button.register']}</Link>
      </Typography.Text>
    </div>
  );
};
