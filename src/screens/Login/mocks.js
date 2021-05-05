import { fakeFetch } from 'services/utils'
import { postData } from 'services/client'

const responses = {
  login: { login: { user: { email: 'test@gmail.com' }, token: 'asd123', refreshToken: 'dsa123' } }
}

export const loginMutation = async () => {
  try {
    const data = await postData({ answer: 42 });
    return JSON.stringify(data)
  } catch (error) {
    console.error(error);
  }
}
