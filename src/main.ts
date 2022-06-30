/*
 * @Author       : lg
 * @Date         : 2022-06-29 11:00:00
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-29 11:04:47
 * @FilePath     : \vue3-demo\src\main.ts
 * @description  : 
 */
import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 
Vue 2
new Vue({
    el: '#app',
    render: h => h(App);
    store,
    router
}) */

// 全局API 链式调用
createApp(App).use(store).use(router).mount('#app')
