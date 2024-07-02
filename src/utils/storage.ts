export const storage = (key: string) => ({
    // 传啥都能保存
    get<T>(): T | null {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    },
    set<T>(value: T) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    remove() {
        window.localStorage.removeItem(key)
    }
})
