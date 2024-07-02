import request from '@/utils/request'
import type {
    User,
    UserInfo
} from "@/types";

export const register = (params: {
    user: User
}): Promise<{ data: { user: UserInfo } }> => request({
    method: 'POST',
    url: '/users',
    data: params
})

// token一般不在数据流里作传递，需要写一个拦截器
export const getUser = (): Promise<{ data: { user: UserInfo } }> => request({
    method: 'GET',
    url: '/user'
})
