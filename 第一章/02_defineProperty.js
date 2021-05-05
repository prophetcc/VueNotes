function render() {
    console.log('模拟渲染了页面');
}

const obj = {
    name: 'cc',
    location: {
        x: 100,
        y: 100
    }
}

function observer(obj) {
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

// obj.name = 'zs';
obj.location.x = 200

