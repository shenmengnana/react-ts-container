# TS 笔记

#### 1. 函数入参是对象的情况

```js
const handle = ({x}: {x: number} = {x: 0}) => {
  console.log(x);
};
```

#### 2. 无法使用 for of 遍历 map 数据, 获取使用 es 新特性：结构...

解决办法：`tsconfig.json` 加上 `downlevelIteration: true`  
问：为什么 downlevelIteration 不是默认开启  
答：(因为您需要决定（通过配置）您希望 TypeScript 如何处理兼容性代码的编译（以支持旧版本的 Javascript）)[https://stackoverflow.com/questions/53441292/why-downleveliteration-is-not-on-by-default]

```js
// 不开启 downlevelIteration 以下写法会报错
// Type 'IterableIterator<string>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators
const map = new Map([
  ['F', 'no'],
  ['T', 'yes'],
]);
for (let key of map.keys()) {
  console.log(key);
}
// or
[...Array(3).keys()];
```

#### 3. 一些工具泛型

```js
type User = {id: string, name: string, email: string};
```

3.1 Omit 剔除属性

```js
type UserWithoutEmail = Omit<User, 'email'>; //等价于 {id: string, name: string}
```

3.2 keyof 取得一个对象接口的所有 key 值

```js
type T = keyof UserWithoutEmail // -> id | name
```

#### 4. 使用 import xxx = namespace.xxx 创建命名空间别名

```js
// a.ts
namespace Shape{
  export function circle(r: number){
    return Math.PI * r ** 2
  }
}
// b.ts
// 直接使用
Shape.circle(2)

// 或者通过以下方式来使用该命名空间下的 变量/函数/类
// 这里的 import 是创建一个别名
import newName = a.b.c.d // 用来给常用的，层级较深的对象取一个短的名字
import newCircle = Shape.circle
newCircle(2)
```
