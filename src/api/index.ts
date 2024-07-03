import request from '@/utils/request'
import type {
    User,
    UserInfo,
    Article,
    ArticleSearchParams
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

export const updateUser = (params: {
    user: UserInfo
}): Promise<{ data: { user: UserInfo } }> => request({
    method: 'PUT',
    url: '/user',
    data: params
})

export const login = (params: {
    user: User
}): Promise<{ data: { user: UserInfo } }> => request({
    method: 'POST',
    url: '/users/login',
    data: params
})


export const getArticles = (
    params: ArticleSearchParams
): Promise<{
    data: {
        articles: Article[],
        articlesCount: number;
    }
}> => {
    return request({
        method: 'GET',
        url: '/articles',
        params: params
    })
}

export const getTags = (): Promise<{ data: { tags: string[] } }> => request({
    method: 'GET',
    url: '/tags'
})
