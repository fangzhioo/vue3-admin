import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess } from '../_util';

const auser = {
  token: 'abcdefg',
  userInfo: {
    userId: 1,
    username: 'tongren',
    realName: 'fangzhi',
    desc: '666',
  },
  roleList: ['super', 'tester']
}

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'tongren' && body.password === '123456') {
        return resultSuccess(auser)
      }
      return resultError('用户名密码错误')
    },
  },
  {
    url: '/api/user/current',
    method: 'get',
    // timeout: 1000,
    response: ({ headers }) => {
      if (!headers.token) {
        return resultError('获取当前用户信息失败')
      }
      return resultSuccess(auser);
    },
  },
] as MockMethod[];