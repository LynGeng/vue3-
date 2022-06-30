/*
 * @Author       : lg
 * @Date         : 2022-06-30 23:17:16
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 23:39:34
 * @FilePath     : \vue3-demo\src\store\modules\a.ts
 * @description  : 
 */
export default {
    namespace: true,
    state: {
        count: 0
    },
    getters: {
    },
    mutations: {
        update(state: any, value: number) {
            state.count = value;
        },
        plus(state: any) {
            state.count++;
        },
        minus(state: any) {
            state.count--;
        }
    },
    actions: {
        async getCount(context: any) {
            const count = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(parseInt((Math.random()*10).toString()));
                }, 3000);
            });
            context.commit('update', count);
            return Promise.resolve();
        }
    },
    modules: {
    }
}