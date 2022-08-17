import { CREATE, foreach, isStr, REMOVE, REMOVE_PROP, REPLACE, SET_PROP, TEXT, UPDATE } from "../utils/utils"

export function diff(newNode, oldNode) {
  if (!oldNode) return { type: CREATE, newNode };

  if (!newNode) return { type: REMOVE };

  if ((isStr(newNode) && isStr(oldNode)) && newNode !== oldNode) return { type: TEXT, value: newNode };

  if (typeof newNode !== typeof oldNode || newNode.type !== oldNode.type) return { type: REPLACE, newNode };

  if (newNode.type) return { type: UPDATE, props: diffProps(newNode, oldNode), children: diffChildren(newNode, oldNode) };
};


function diffProps(newNode, oldNode) {
  const patches = [];

  const props = Object.assign({}, newNode.props, oldNode.props);

  foreach(Object.keys(props), name => {
    const newVal = newNode.props[name], oldVal = oldNode.props[name];

    if (!newVal) patches.push({ type: REMOVE_PROP, name, value: oldVal });

    else if (!oldVal || newVal !== oldVal) patches.push({ type: SET_PROP, name, value: newVal });
  });

  return patches;
};


function diffChildren(newNode, oldNode) {
  const patches = [];

  const heigher = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < heigher; i++) { patches[i] = diff(newNode.children[i], oldNode.children[i]) };

  return patches;
};
