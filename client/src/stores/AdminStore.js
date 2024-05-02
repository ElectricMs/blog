import { defineStore } from 'pinia'
//全局状态存储
export const AdminStore = defineStore("admin", {

    state: () => {
        return {
            id: 0,
            account: "",
            token: ""
        }
    },
    actions: {},
    getters: {}

})