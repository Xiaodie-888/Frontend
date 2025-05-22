import instance from '@/http/index'
export const bindAccount = (account:number,url:string):any=> {
    return instance({
        url: '/user/bindAccount',
        method: 'POST',
        data: {
            account,
            url
        }
    })
}

export const getUserInfo = (account:number):any => {
    return instance({
        url: '/user/getUserInfo',
        method: 'POST',
        data: {
            account
        }
    })
}

// 修改姓名
export const changeName = (name:string, id:number):any => {
    return instance({
        url: '/user/changeName',
        method: 'POST',
        data: {
            name,
            id
        }
    })
}

// 修改年龄
export const changeAge = (age:number, id:number):any => {
    return instance({
        url: '/user/changeAge',
        method: 'POST',
        data: {
            age,
            id
        }
    })
}

// 修改性别
export const changeSex = (sex:string, id:number):any => {
    return instance({
        url: '/user/changeSex',
        method: 'POST',
        data: {
            sex,
            id
        }
    })
}

// 修改密码
export const changePassword = (id:number, oldPassword:string, newPassword:string):any => {
    return instance({
        url: '/user/changePassword',
        method: 'POST',
        data: {
            id,
            oldPassword,
            newPassword
        }
    })
}

// 获取指定页码的用户
export const getUserListForPage = (pager:number):any => {
    return instance({
        url: '/user/getUserListForPage',
        method: 'POST',
        data: {
            pager
        }
    })
}

// 获取用户长度
export const getUserLength = ():any => {
    return instance({
        url: '/user/getUserLength',
        method: 'POST',
    })
}

// 冻结用户
export const banUser = (id:number):any => {
    return instance({
        url: '/user/banUser',
        method: 'POST',
        data:{
            id,
        }
    })
}

// 解冻用户
export const thawUser = (id:number):any => {
    return instance({
        url: '/user/thawUser',
        method: 'POST',
        data:{
            id,
        }
    })
}

// 通过部门筛选用户
export const getUserByDepartment = (pager:number,department:string):any => {
    return instance({
        url: '/user/getUserByDepartment',
        method: 'POST',
        data:{
            pager,
            department
        }
    })
}

// 返回制定部门的总人数
export const UserLengthForDepartment = (department:string):any => {
    return instance({
        url: '/user/UserLengthForDepartment',
        method: 'POST',
        data:{
            department
        }
    })
}

// 返回制定部门的总人数
export const UserLengthForStatus = (status:number):any => {
    return instance({
        url: '/user/UserLengthForStatus',
        method: 'POST',
        data:{
            status
        }
    })
}

// 获取状态用户列表
export const getStatusUserList = (pager:number,status:number):any => {
    return instance({
        url: '/user/getStatusUserList',
        method: 'POST',
        data:{
            pager,
            status
        }
    })
}

// 修改用户部门或职位
export const changeLevel =
    (id:number,department?:string,position?:string):any => {
    return instance({
        url: '/user/changeLevel',
        method: 'POST',
        data:{
            id,
            department,
            position
        }
    })
}

// 删除用户
export const deleteUser = (id:number):any => {
    return instance({
        url: '/user/deleteUser',
        method: 'POST',
        data:{
            id
        }
    })
}


