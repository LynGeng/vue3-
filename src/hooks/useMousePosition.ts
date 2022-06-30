/*
 * @Author       : lg
 * @Date         : 2022-06-29 16:21:44
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-29 16:25:33
 * @FilePath     : \vue3-demo\src\hooks\useMousePosition.ts
 * @description  : 
 */
import {
    ref,
    onMounted,
    onBeforeUnmount
} from 'vue'

function useMousePosition() {
    // 初始化坐标数据
    const x = ref(-1);
    const y = ref(-1);

    // 用于手机点击事件坐标的函数
    const updatePosition = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    };
    // 挂载后绑定监听
    onMounted(() => {
        document.addEventListener('click', updatePosition);
    });
    // 卸载前解除绑定
    onBeforeUnmount(() => {
        document.removeEventListener('click', updatePosition);
    });

    return { x, y };
}

export default useMousePosition;