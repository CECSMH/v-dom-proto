import { foreach, isObj } from "../utils/utils";
import { patch } from "./patch";


export default class Element {
    constructor(tag, props, ...children) {
        this.type = tag;
        this.props = props || {};
        this.children = children.flat();
        this.element
    };

    render() {
        this.element = document.createElement(this.type)
        var props = this.props

        foreach(props, (value, name) => {
            if (name.startsWith("on") && name.toLowerCase() in window) value && this.element.addEventListener(name.toLowerCase().substring(2), value);

            else if (name === 'var') value && (this.el.var = value);

            else if (name === 'sh-if') value && (this.el.sh_if = value);

            else this.element.setAttribute(name, value && value.toString());
        })

        var children = this.children || []

        foreach(children, child => {
            var childEl = isObj(child) ? child.render() : document.createTextNode(child);
            this.element.appendChild(childEl);
        })

        return this.element;
    };

    patch(pt, newobj) {
        if (this.element) {
            console.log(pt)
            patch(this.element.parentNode, pt)

            Object.assign(this, newobj)
        }
    }
}

