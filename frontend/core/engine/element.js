import { foreach, isObj } from "../utils/utils";
import { patch } from "./patch";


export default class Element {
    constructor(tag, props, ...children) {
        this.type = tag;
        this.props = props || {};
        this.children = children.flat();
        this.el
    };

    render() {
        this.el = document.createElement(this.type)
        var props = this.props

        foreach(props, (value, name) => {
            if (name.startsWith("on") && name.toLowerCase() in window) value && this.el.addEventListener(name.toLowerCase().substring(2), value);

            else if (name === 'var') value && (this.el.var = value);

            else if (name === 'sh-if') value && (this.el.sh_if = value);

            else this.el.setAttribute(name, value && value.toString());
        })

        var children = this.children || []

        foreach(children, child => {
            var childEl = isObj(child) ? child.render() : document.createTextNode(child);
            this.el.appendChild(childEl);
        })

        return this.el;
    };

    patch(pt, newobj) {
        if (this.el) {
            console.log(pt)
            patch(this.el.parentNode, pt)

            Object.assign(this, newobj)
        }
    }
}

