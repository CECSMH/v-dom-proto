
export function foreach(obj, fn) {
  for (var i in obj) { typeof fn === 'function' && fn(obj[i], i) };
  return;
};

function type(obj) { return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, ""); };

export function isArr(list) { return type(list) === "Array"; };

export function isObj(obj) { return type(obj) === "Object"; };

export function isStr(str) { return type(str) === "String"; };

export function isNotEmptyObj(obj) { return isObject(obj) && JSON.stringify(obj) != "{}"; };

export function changed(n1, n2) {
  return typeof n1 !== typeof n2 || //typeof n1 === 'string' && n1 !== n2 ||
    n1.type !== n2.type
}


const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const SET_PROP = 'SET_PROP'
const REMOVE_PROP = 'REMOVE PROP'
const TEXT = 'TEXT'
const REORDER = 'REORDER'

export {CREATE, REMOVE, REPLACE, UPDATE, SET_PROP, REMOVE_PROP, TEXT, REORDER}