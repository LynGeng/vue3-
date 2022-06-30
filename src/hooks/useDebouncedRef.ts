/*
 * @Author       : lg
 * @Date         : 2022-06-29 23:17:00
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-29 23:28:36
 * @FilePath     : \vue3-demo\src\hooks\useDebouncedRef.ts
 * @description  : 
 */
import {
    customRef,
} from 'vue';

function useDebouncedRef<T>(value: T, delay: 200) {
    let timeout: number;
    return customRef((track, trigger) => {
        return {
            get() {
                // 告诉Vue追踪数据
                track();
                return value;
            },
            set(newValue: T) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    // 告诉Vue去触发界面
                    trigger();
                }, delay);
            }
        }
    });
}

export default useDebouncedRef;