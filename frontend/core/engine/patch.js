import { CREATE, foreach, isStr, REMOVE, REMOVE_PROP, REORDER, REPLACE, SET_PROP, TEXT, UPDATE } from "../utils/utils"

export function patch(parent, patches, index = 0) {
  if (!patches) { return }
  const el = parent.childNodes[index]
  switch (patches.type) {
    case CREATE: {
      const newEl = createElement(patches?.newNode);
      return parent.appendChild(newEl);
    };

    case REMOVE: return parent.removeChild(el);
case REORDER: {

      return reorderChildren(el, patches.moves)
    }
    case REPLACE: {
      const newEl = createElement(patches?.newNode);
      return parent.replaceChild(newEl, el)
    };
    
    case TEXT: {
      if (el.textContent) el.textContent = patches.value
      else if(el.nodeValue)el.nodeValue = patches.value
      return;
    };




    case UPDATE: {
      const { props, children } = patches;

      patchProps(el, props);
      for (let i = 0; i < children.length; i++) { patch(el, children[i], i) };
    };
  }
};



function reorderChildren(node, moves) {
  var staticNodeList = [...node.childNodes]
  var maps = {}

  foreach(staticNodeList, function (i, node) {
    if (node.nodeType === 1) {
      var key = node.getAttribute('key')
      if (key) {
        maps[key] = node
      }
    }
  })

  foreach(moves, function (move, i) {
    var index = move.index
    if (move.type === 0) { // remove item
      if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
        node.removeChild(node.childNodes[index])
      }
      staticNodeList.splice(index, 1)
    } else if (move.type === 1) { // insert item
      var insertNode = maps[move.item.key]
        ? maps[move.item.key].cloneNode(true) // reuse old item
        : (typeof move.item === 'object')
          ? move.item.render()
          : document.createTextNode(move.item)
      staticNodeList.splice(index, 0, insertNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}


function createElement(node) {
  if (isStr(node)) return document.createTextNode(node);
  return node.render()
};


function patchProps(parent, patches) {
  for (let i = 0; i < patches.length; i++) {
    const { type, name, value } = patches[i];

    if (type === SET_PROP) {
      setProp(parent, name, value)
    }
    if (type === REMOVE_PROP) {
      removeProp(parent, name, value)
    }
  }
}

function setProp(target, name, value) {
  target.setAttribute && target.setAttribute(name, value)
}

function removeProp(target, name, value) {
  target.removeAttribute(name)
}
