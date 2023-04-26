import { Link, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button, Form, Input, Typography } from 'antd';

import { authApi } from 'api/auth';
import { getCurrentUser } from 'app/actions/userActions';
import window from 'helpers/window';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'constants/routes';
import { handleErrorFromServer } from 'helpers/errorNotification';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RegisterInput } from 'models/auth.model';
import { messages } from './common';

import './Register.scss';

export const Register = () => {
  const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  async function onSubmit(values: RegisterInput) {
    try {
      const response = await authApi.register(values);

      if (response.status === 200) {
        window.localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'true');
        await dispatch(getCurrentUser());

        navigate(ROUTES.MAIN_PAGE_PATH);
      }
    } catch (err) {
      handleErrorFromServer(err);
    }
  }

  return (
    <div className="formRegister">
      <Typography.Title className="formRegister__heading">
        {fm(messages.formHeading)}
      </Typography.Title>
      <Form
        form={form}
        name="formRegister"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label={fm(messages.labelFirstName)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            { min: 1, message: fm(messages.validationFirstNameMinLength) },
            { max: 30, message: fm(messages.validationFirstNameMaxLength) },
          ]}
        >
          <Input placeholder={fm(messages.placeholderFirstName)} />
        </Form.Item>
        <Form.Item
          name="secondName"
          label={fm(messages.labelSecondName)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            { min: 1, message: fm(messages.validationSecondNameMinLength) },
            { max: 30, message: fm(messages.validationSecondNameMaxLength) },
          ]}
        >
          <Input placeholder={fm(messages.placeholderSecondName)} />
        </Form.Item>
        <Form.Item
          name="login"
          label={fm(messages.labelLogin)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            { min: 3, message: fm(messages.validationLoginMinLength) },
            { max: 20, message: fm(messages.validationLoginMaxLength) },
          ]}
        >
          <Input placeholder={fm(messages.placeholderLogin)} />
        </Form.Item>
        <Form.Item
          name="email"
          label={fm(messages.labelEmail)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            {
              pattern: new RegExp(/[a-z0-9\-_]+@[a-z0-9\-_]+\.[a-z0-9]+/gi),
              message: fm(messages.validationEmailInvalidFormat),
            },
            { min: 5, message: fm(messages.validationEmailMinLength) },
            { max: 30, message: fm(messages.validationEmailMaxLength) },
          ]}
        >
          <Input placeholder={fm(messages.placeholderEmail)} />
        </Form.Item>
        <Form.Item
          name="password"
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
          name="phone"
          label={fm(messages.labelPhone)}
          rules={[
            { required: true, message: fm(messages.validationRequiredField) },
            {
              pattern: new RegExp(/^[+*\d]{10,15}$/),
              message: fm(messages.validationPhoneInvalidFormat),
            },
            { min: 10, message: fm(messages.validationPhoneMinLength) },
            { max: 15, message: fm(messages.validationPhoneMaxLength) },
          ]}
        >
          <Input placeholder={fm(messages.placeholderPhone)} />
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
              {fm(messages.buttonRegister)}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Typography.Text className="formRegister__linkText">
        {fm(messages.textAlreadyHaveAccount)}{' '}
        <Link to={ROUTES.LOGIN_PAGE}>{fm(messages.buttonLogin)}</Link>
      </Typography.Text>
    </div>
  );
};
