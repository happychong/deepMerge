function deepCopy(parent, c) {
  let child = c || {};
  for (var key in parent) {
    let current = parent[key];
    if (Object.prototype.toString.call(current) === '[object Object]'
        || Object.prototype.toString.call(current) === '[object Array]') {
      let temp = child[key];
      child[key] = Object.prototype.toString.call(current) === '[object Array]'
        ? []
        : {};
      // 仅针对object类型，延伸处理
      if (temp && Object.prototype.toString.call(temp) === '[object Object]'
        && Object.prototype.toString.call(parent[key]) === '[object Object]') {
        // temp存在，并且temp是对象类型，并且parent[key]也是对象类型
        deepCopy(temp, child[key]);
      }
      deepCopy(parent[key], child[key])
    } else {
      child[key] = parent[key];
    }
  }
  return child;
}

export default function c(...rest) {
  let resoult = null;
  if (rest.length > 1) {
    resoult = rest[0]
  } else {
    if (Object.prototype.toString.call(rest[0]) === '[object Array]') {
      // 参数为一个数组，则返回也是一个数组
      resoult = [];
    } else if (Object.prototype.toString.call(rest[0]) === '[object Object]') {
      // 参数为一个对象，那么返回也是一个{}
      resoult = {};
    }
  }
  for (let i = rest.length > 1 ?
      1 :
      0; i < rest.length; i++) {
    resoult = deepCopy(rest[i], resoult);
  }
  return resoult;
}
