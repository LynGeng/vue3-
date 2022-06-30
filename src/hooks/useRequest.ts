/*
 * @Author       : lg
 * @Date         : 2022-06-29 16:26:36
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-29 16:36:57
 * @FilePath     : \vue3-demo\src\hooks\useRequest.ts
 * @description  : 
 */

import { ref } from 'vue';
import axios from 'axios';

export default function useRequest<T>(url: string) {
    // result的数据类型用泛型T表示，因为不同接口返回的数据结构肯定是不一样的
    const result = ref<T | null>(null);
    const loading = ref(true);
    const errorMsg = ref("");

    axios
    .get(url)
    .then((response) => {
        loading.value = false;
        result.value = response.data;
        errorMsg.value = "";
    })
    .catch((e) => {
        loading.value = false;
        result.value = null;
        errorMsg.value = e.message || '未知错误';
    });

    return {result, loading, errorMsg};
}

// 使用则直接引入函数
// const { loading, result, errorMsg} = useRequest<T>('https://api'); 