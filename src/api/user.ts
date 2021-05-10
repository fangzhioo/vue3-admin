const auser = {
  token: 'abcdefg',
  userInfo: {
    userId: 1,
    username: 'tongren',
    realName: 'fangzhi',
    desc: '666',
  },
  roleList: ['super', 'tester'],
};

interface ApiResult {
  code: 200 | 500;
  message?: string;
  data: $TODO
}

// 用户登录
export async function postUserLogin(data: $TODO) {
  return new Promise<ApiResult>((resolve, reject) => {
    if(data.username === 'tongren' && data.password === '123456') {
      setTimeout(() => {
        resolve({
          code: 200,
          data: auser
        })
      }, 1000)
    } else {
      reject({ code: 500, message: '用户名密码错误' })
    }
  })
}

// 获取当前用户信息
export async function getCurrentUserInfo() {
  return new Promise<ApiResult>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: auser
      })
    }, 1000)
  })
}


