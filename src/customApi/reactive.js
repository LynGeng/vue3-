/*
 * @Author       : lg
 * @Date         : 2022-06-29 23:44:27
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-30 18:50:52
 * @FilePath     : \vue3-demo\src\customApi\reactive.js
 * @description  : 
 */

const hanlder = {
    get(target, prop) {
        console.log('劫持get', prop);
        return Reflect.get(target, prop);
    },
    set(target, prop, val) {
        console.log('劫持set', prop, val);
        return Reflect.set(target, prop, val);
    },
    deleteProperty(target, prop) {
        console.log('劫持delete', prop);
        return Reflect.deleteProperty(target, prop);
    }
}

function reactive(target) {
    // target存在并且是一个对象
    if(target && typeof target === 'object') {
        // 遍历目标对象中的对象属性，深度响应式
        // Object.entries(target).forEach(([key, value]) => {
        //     if(typeof value === 'object') {
        //         target[key] = reactive(value);
        //     }
        // });
        for(let key in target) {
            if(typeof target[key] === 'object') {
                target[key] = reactive(target[key]);
            }
        }
        return new Proxy(target, hanlder);
    }
    
}

function shallowReactive(target) {
    if(target && typeof target === 'object') {
        return new Proxy(target, hanlder);
    }
}

const obj = reactive({
    a: 100,
    b: 200,
    c: {
        d: 300,
    }
});

const obj2 = shallowReactive({
    a: 100,
    b: 200,
    c: {
        d: 300,
    }
});