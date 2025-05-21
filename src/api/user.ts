import instance from '@/http/index'
//绑定用户与头像
export const bindAccount = (account: number, url: string): any => {
  return instance({
    url: '/user/bindAccount',
    method: 'POST',
    data: {
      account,
      url,
    },
  })
}

export const getUserInfo = (account: number): any => {
  return instance({
    url: '/user/getUserInfo',
    method: 'POST',
    data: {
      account,
    },
  })
}
