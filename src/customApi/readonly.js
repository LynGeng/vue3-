/*
 * @Author       : lg
 * @Date         : 2022-06-30 19:30:25
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 21:39:06
 * @FilePath     : \vue3-demo\src\customApi\readonly.js
 * @description  : 
 */

const readonlyHanlder = {
    get(target, key) {
        if(key === '_is_readonly') return true;
        return Reflect.get(target, key);
    },
    set() {
        console.warn('只读的数据，不能修改');
        return true;
    },
    deleteProperty() {
        console.warn('只读的数据，不能修改');
        return true;
    }
}

function readonly(target) {
    if(target && typeof target === 'object') {
        if(target instanceof Array) {
            // 数组
            target.forEach((item, index) => {// 深度只读
                target[index] = readonly(item);
            });
        } else {
            // 对象
            Object.keys(target).forEach((key) => {// 深度只读
                target[key] = readonly(target[key]);
            });
        }
        const proxy = new Proxy(target, readonlyHanlder);
        return proxy;
    }
    return target;
}

function shallowReadonly(target) {
    return new Proxy(target, readonlyHanlder);
}
const obj = reactive({
    a:1,
    b: {
        c:2
    }
});
const obj1 = readonly(obj);

const obj2 = reactive({
    a:1,
    b: {
        c:2
    }
})
shallowReadonly(obj2)