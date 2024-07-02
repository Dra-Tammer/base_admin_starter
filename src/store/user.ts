import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserInfo} from "@/types";
import {storage} from "@/utils/storage";
import {getUser} from "@/api";

const userStorage = storage('user')

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// storage的内容在用户的刷新的时候会丢失
export const useUserStore = defineStore('user', () => {
    // 类型可能是userinfo或者是null，给一个默认值null
    const userInfo = ref<UserInfo | null>(null)
    const setUser = (user: userInfo) => {
        userInfo.value = user
        userStorage.set(user.token) // 持久化保存token
    };

    const verifyAuth = async () => {
        console.log('userInfo.value', userInfo.value)
        // 本地保存了token但是拿不到userinfo的值，说明用户刷新了页面，但是用户登录了，需要重新获取一下信息
        if (!userInfo.value && userStorage.get()) {
            const res = await getUser()
            setUser(res.data.user)
        }
    }
    return {
        setUser,
        userInfo,
        verifyAuth
    }
})
