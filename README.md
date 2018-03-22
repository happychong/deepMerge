# deepMerge

* 深层拷贝，对象类型的属性都会返回新的对象
* deepMerge可以有任何多个参数，多个参数时根据后面覆盖前面的原则执行
* 如果deepMerge只有一个参数时，会返回结构完全相同的新的对象
* 对相同的属性名后面的属性值覆盖前面的属性值
* 对于对象类型的属性值，有延展性，会返回包含所有属性的新对象
* 对于数组类型的属性值，后面的数组替换之前的数组（此处理方式参考工作用大多数需求）
* 如果原属性类型和目标属性类型不同，那么也会直接后面属性值替换前面的属性值。

## Install
`npm install deepMerge --save`

## Usage
```
import deepMerge from 'deepMerge';

let obj = {
    a: 1,
    b: '2',
    c: [4,5],
    d: {
        e: null,
        f: [6, 7]
    },
    g: undefined
};

let newObj = deepMerge(obj);
// {
//     a: 1,
//     b: '2',
//     c: [4,5],
//     d: {
//         e: null,
//         f: [6, 7]
//     },
//     g: undefined
// }


let target = {
    z: '123456789'
};
deepMerge(obj, target);
// {
//     "z": "123456789",
//     "a": 1,
//     "b": "2",
//     "c": [4, 5],
//     "d": {
//         "e": null,
//         "f": [6, 7]
//     }
// }
```
