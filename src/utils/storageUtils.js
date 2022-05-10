// 将信息保存在localStorage中的模块
import store from 'store'
const USER_KEY = 'user_key'
const SEARCH_KEY = 'search_key'
export default{
    // 保存user
    saveUser(user){
        store.set(USER_KEY, user);
    },
    // 获得user
    getUser(){
        return store.get(USER_KEY) || {};
    },
    // 删除user
    removeUser(){
        store.remove(USER_KEY);
    },

    // 保存搜索记录
    saveSearchList(search) {
        store.set(SEARCH_KEY, search)
    },

    // 获得搜索记录
    getSearchList() {
        return store.get(SEARCH_KEY) || '[]';
    },

    // 删除搜索记录
    removeSearchList() {
        store.remove(SEARCH_KEY);
    }
}