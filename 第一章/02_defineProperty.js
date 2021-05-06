function render() {
    console.log('模拟渲染了页面');
}

// const obj = {
//     name: 'cc',
//     location: {
//         x: 100,
//         y: 100
//     }
// }

let obj = [1, 2, 3];

const methods = ['pop', 'push', 'shift', 'unshift', 'sort', 'splice', 'reverse'];

const arrProto = Array.prototype;
const proto = Object.create(arrProto);

methods.forEach(method => {
    proto[method] = function () {
        arrProto[method].call(this, ...arguments);
        render();
    }
})

function observer(obj) {
    if (Array.isArray(obj)) {
        obj.__proto__ = proto;
        return;
    }
    if (typeof obj === 'object') {
        for (let key in obj) {
            defineReactive(obj, key, obj[key]);
        }
    }
}

function defineReactive(data, key, value) {
    observer(value); // 如果value也是对象，如obj.location，则递归处理
    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            observer(newValue);
            if (newValue !== value) {
                render();
                value = newValue;
            }
        }
    })
}

observer(obj);

function $set(target, key, value) {
    if (Array.isArray(target)) {
        return target.splice(key, 1, value);
    }
    defineReactive(target, key, value)
}

// obj.name = 'zs';
// obj.location.x = 200
// obj.push(123);
// console.log(obj);

$set(obj, 0, 999);
console.log(obj);
