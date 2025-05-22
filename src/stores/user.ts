import { defineStore } from 'pinia'
import {
    getUserInfo
} from '@/api/user'
import {ref} from "vue";
export const useUserInfo = defineStore('userInfo',()=> {
    const imageUrl = ref<string>()
    const userInfo = async (account:number) =>{
        const res = await getUserInfo(account) as any
        imageUrl.value = res.image_url
    }

    return {
        imageUrl,userInfo
    }
},{
    persist:true
})