import instance from '@/http/index'

// 返回用户最近十条登录记录
export const searchLoginLogList = (account:number):any=> {
    return instance({
        url: '/log/searchLoginLogList',
        method: 'POST',
        data: {
            account,
        }
    })
}

// 获取登录记录
export const getLoginLogList = (pager:number):any=> {
    return instance({
        url: '/log/getLoginLogList',
        method: 'POST',
        data: {
            pager,
        }
    })
}

// 清空登录记录
export const clearLoginLogList = ():any=> {
    return instance({
        url: '/log/clearLoginLogList',
        method: 'POST',
    })
}

// 返回登录日志总数
export const getLoginLogLength = ():any=> {
    return instance({
        url: '/log/getLoginLogLength',
        method: 'POST',
    })
}

// 记录登录
export const loginLog = (account:number,name:string,email:string):any=> {
    return instance({
        url: '/log/loginLog',
        method: 'POST',
        data: {
            account,
            name,
            email
        }
    })
}

// 返回一周每天登录次数
export const getDayAndNumber = ():any=> {
    return instance({
        url: '/log/getDayAndNumber',
        method: 'POST',
    })
}