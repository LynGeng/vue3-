/*
 * @Author       : lg
 * @Date         : 2022-06-30 21:40:52
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 21:40:53
 * @FilePath     : \vue3-demo\src\customApi\isReadonly.js
 * @description  : 
 */
function isReadonly(obj) {
    return obj && obj._is_readonly;
}