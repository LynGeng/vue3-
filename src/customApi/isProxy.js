/*
 * @Author       : lg
 * @Date         : 2022-06-30 21:43:36
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 21:43:37
 * @FilePath     : \vue3-demo\src\customApi\isProxy.js
 * @description  : 
 */
function isProxy(obj) {
    return isReactive(obj) || isReadonly(obj);
}