function render() {
    console.log('模拟视图的更新');
}

const obj = {
    name: 'zs',
    age: {
        age: 100
    },
    arr: []
}

const handler = {
    get(target, key) {
        // 可能target[key]也是一个对象,再对这个对象进行劫持
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler);
        }
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        if (key === 'length') return true;  // 对数组进行修改时会触发两次set，一次是修改值，一次是修改length
        render();
        return Reflect.set(target, key, value);
    }
}

const proxy = new Proxy(obj, handler);

// proxy.age.age = 100

// console.log(proxy);

proxy.arr.push(200)