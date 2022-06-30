/*
 * @Author       : lg
 * @Date         : 2022-06-30 21:39:31
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 21:39:31
 * @FilePath     : \vue3-demo\src\customApi\isRef.js
 * @description  : 
 */

function isRef(obj) {
    return obj && obj._is_ref;
}