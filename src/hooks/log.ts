import {getLoginLogList,
    clearLoginLogList,
    getLoginLogLength } from '@/api/login_log'
import {getOperationLogList,
    clearOperationList,
    getOperationLogLength} from '@/api/operation_log'
import { ref,reactive,watch} from 'vue'

export const logHooks = (logName:string) =>{
    // 分页数据
    const paginationData = reactive({
        // 总页数
        pageCount: 1,
        // 当前所处页数
        currentPage: 1,
    })
  // 返回日志长度得出页数
    const returnListLength = async  () => {
        let res:any = ref()
        if(logName=='operation'){
            res = await getOperationLogLength() as any
        }else{
            res = await getLoginLogLength() as any
        }
        paginationData.pageCount = Math.ceil(res.length / 10)
    }
    // 数组对象
    const tableData = ref([])

    // 获取第一页数据
    const getFirstPageList = async () => {
        if(logName=='operation'){
            tableData.value = await getOperationLogList(1) as any
        }else{
            tableData.value = await getLoginLogList(1) as any
        }
    }

    // 监听换页
    const changePage = async (value: number) => {
        paginationData.currentPage = value
        if(logName=='operation'){
            tableData.value = await getOperationLogList(value) as any
        }else{
            tableData.value = await getLoginLogList(value) as any
        }
    }

    // 清空内容
    const clearLog =async  () => {
        if(logName=='operation'){
            await clearOperationList()
        }else{
            await clearLoginLogList
        }
    }
    watch(
        paginationData,
        ()=>{
            returnListLength()
            getFirstPageList()
        },
        {immediate:true,deep:true}
    )
    watch(
        ()=>paginationData.currentPage,
        ()=>{
            changePage(paginationData.currentPage)
        },
        {immediate:true}
    )
    return{
        tableData,
        paginationData,
        getFirstPageList,
        changePage,
        clearLog
    }
}