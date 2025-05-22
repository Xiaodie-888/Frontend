import instance from '@/http/index'

// 产品入库
export const addProduct = (data:any):any=> {
    const {product_name,product_category,
        product_unit,warehouse_number,
        product_single_price,product_create_person} = data
    return instance({
        url: '/product/addProduct',
        method: 'POST',
        data: {
            product_name,
            product_category,
            product_unit,
            warehouse_number,
            product_single_price,
            product_create_person,
        }
    })
}

// 获取产品列表
export const getProductList = (pager:number):any=> {
    return instance({
        url: '/product/getProductList',
        method: 'POST',
        data: {
            pager,
        }
    })
}

// 获取在库产品总数量
export const getProductLength = ():any=> {
    return instance({
        url: '/product/getProductLength',
        method: 'POST',
    })
}

// 编辑产品
export const editProduct = (data:any):any=> {
    const {product_name,product_category,
        product_unit,warehouse_number,
        product_single_price,id} = data
    return instance({
        url: '/product/editProduct',
        method: 'POST',
        data: {
            product_name,
            product_category,
            product_unit,
            warehouse_number,
            product_single_price,
            id
        }
    })
}

// 搜索产品
export const searchProduct = (product_id:number):any=> {
    return instance({
        url: '/product/searchProduct',
        method: 'POST',
        data: {
            product_id,
        }
    })
}

// 删除产品
export const deleteProduct = (id:number):any=> {
    return instance({
        url: '/product/deleteProduct',
        method: 'POST',
        data: {
            id,
        }
    })
}

// 出库申请
export const Outbound = (data:any):any=> {
    const {
        id, product_out_number,
        apply_person, apply_notes,
    } = data
    return instance({
        url: '/product/Outbound',
        method: 'POST',
        data: {
            id,
            product_out_number,
            apply_person,
            apply_notes
        }
    })
}

// 获取审核列表
export const getApplyList = (pager:number):any=> {
    return instance({
        url: '/product/getApplyList',
        method: 'POST',
        data: {
            pager,
        }
    })
}

// 获取审核列表长度
export const getApplyLength = ():any=> {
    return instance({
        url: '/product/getApplyLength',
        method: 'POST',
    })
}

// 产品审核
export const audit = (data:any):any=> {
    const {
        audit_status, id,
        product_id, product_name,
        product_unit, warehouse_number,
        product_out_number,
        product_single_price,
        audit_person,
        apply_person,
        apply_time,
        audit_notes,
    } = data
    return instance({
        url: '/product/audit',
        method: 'POST',
        data: {
            audit_status, id,
            product_id, product_name,
            product_unit, warehouse_number,
            product_out_number,
            product_single_price,
            audit_person,
            apply_person,
            apply_time,
            audit_notes,
        }
    })
}

// 撤回申请
export const withdraw = (id:number):any=> {
    return instance({
        url: '/product/withdraw',
        method: 'POST',
        data: {
            id,
        }
    })
}

// 再次申请
export const againApply = (id:number):any=> {
    return instance({
        url: '/product/againApply',
        method: 'POST',
        data: {
            id,
        }
    })
}

// 出库产品列表
export const getOutboundList = (pager:number):any=> {
    return instance({
        url: '/product/getOutboundList',
        method: 'POST',
        data: {
            pager,
        }
    })
}

// 出库产品列表长度
export const getOutboundLength = ():any=> {
    return instance({
        url: '/product/getOutboundLength',
        method: 'POST',
    })
}

// 搜索出库数据
export const searchOutbound = (product_id:number):any=> {
    return instance({
        url: '/product/searchOutbound',
        method: 'POST',
        data: {
            product_id,
        }
    })
}

// 清空出库列表
export const cleanOutbound = ():any=> {
    return instance({
        url: '/product/cleanOutbound',
        method: 'POST',
    })
}

// 获取当前产品信息
export const productInfo = (id:number):any=> {
    return instance({
        url: '/product/productInfo',
        method: 'POST',
        data: {
            id,
        }
    })
}
