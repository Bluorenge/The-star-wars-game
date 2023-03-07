import { message } from 'antd';

// @ts-expect-error: needs typing
export function handleErrorFromServer(err) {
  console.error(err);

  message.open({
    type: 'error',
    content: err.response.data.reason,
  });
}
