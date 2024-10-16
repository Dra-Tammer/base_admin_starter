// 请求的实体
// .d是一个命名的习惯，这个文件里只定义了接口，没有逻辑，这个是被其他地方引入的
export interface User {
    username?: string; // 可选项，调用的时候可传可不传
    email: string;
    password: string
}

export interface UserInfo {
    email: string;
    password: string;
    token?: string;
    username: string;
    bio: string;
    image: string;
}

export interface CreateArticle {
    title: string,
    description: string,
    body: string,
    tagList: string[],
}

export interface Article extends CreateArticle {
    slug: string,
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    auth: Author,
}

export interface ArticleSearchParams {
    tag?: string,
    author?: string,
    favorited?: string,
    offset?: number,
    limit?: number
}
