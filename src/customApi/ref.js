/*
 * @Author       : lg
 * @Date         : 2022-06-30 19:08:44
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 19:27:06
 * @FilePath     : \vue3-demo\src\customApi\ref.js
 * @description  : 
 */

function ref(target) {
    // 设置值为对象，先将其变为响应式对象再进行ref
    if(target && typeof target === 'object') {
        target = reactive(target);
    }
    return {
        _value: target,
        get value() {
            console.log('劫持get', this._value);
            return this._value;
        },
        set value(newVal) {
            console.log('劫持get', this._value, newVal);
            this._value = newVal;
        }
    }
}

function shallowRef(target) {
    return {
        _value: target,
        get value() {
            console.log('劫持get', this._value);
            return this._value;
        },
        set value(newVal) {
            console.log('劫持get', this._value, newVal);
            this._value = newVal;
        }
    }
}

const str = ref('abc');

const obj = ref({
    a:1,
    b:{
        c:2
    }
})