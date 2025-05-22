import instance from '@/http/index'

// 返回用户最近十条登录记录
export const searchOperation = (time:any):any=> {
    return instance({
        url: '/operation/searchOperation',
        method: 'POST',
        data: {
            time
        }
    })
}

// 返回操作日志列表
export const getOperationLogList = (pager:number):any=> {
    return instance({
        url: '/operation/getOperationLogList',
        method: 'POST',
        data: {
            pager
        }
    })
}


// 清空操作记录
export const clearOperationList = ():any=> {
    return instance({
        url: '/operation/clearOperationList',
        method: 'POST',
    })
}

// 返回操作日志列表总数
export const getOperationLogLength = ():any=> {
    return instance({
        url: '/operation/getOperationLogLength',
        method: 'POST',
    })
}

// 操作记录
export const operationLog = (account:number,name:string,
                             content:string,level:string,
                             status:string):any=> {
    return instance({
        url: '/operation/operationLog',
        method: 'POST',
        data: {
            account,
            name,
            content,
            level,
            status,
        }
    })
}