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
  let resoult = rest.length > 1
    ? rest[0]
    : {};
  for (let i = rest.length > 1
    ? 1
    : 0; i < rest.length; i++) {
    resoult = deepCopy(rest[i], resoult);
  }
  return resoult;
}
