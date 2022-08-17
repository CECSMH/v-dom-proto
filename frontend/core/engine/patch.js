import { CREATE, isStr, REMOVE, REMOVE_PROP, REPLACE, SET_PROP, TEXT, UPDATE } from "../utils/utils.js";

export function patch(parent, patches, index = 0) {
  if (!patches) return;

  const el = parent.childNodes[index];

  switch (patches.type) {

    case CREATE: return parent.appendChild(createElement(patches?.newNode));

    case REMOVE: return parent.removeChild(el);

    case REPLACE: return parent.replaceChild(createElement(patches?.newNode), el);

    case TEXT: {
      if (el.textContent) el.textContent = patches.value
      else if (el.nodeValue) el.nodeValue = patches.value
      return;
    };

    case UPDATE: {
      const { props, children } = patches;
      patchProps(el, props);
      for (let i = 0; i < children.length; i++) { patch(el, children[i], i) };
    };
  };
};

function createElement(node) { return isStr(node) ? document.createTextNode(node) : node.render(); };

function patchProps(parent, patches) {
  for (let i = 0; i < patches.length; i++) {
    const { type, name, value } = patches[i];

    if (type === SET_PROP) setProp(parent, name, value);

    if (type === REMOVE_PROP) removeProp(parent, name, value);
  }
};

function setProp(target, name, value) {
  target.setAttribute && target.setAttribute(name, value)
};

function removeProp(target, name) {
  target.removeAttribute(name)
};
