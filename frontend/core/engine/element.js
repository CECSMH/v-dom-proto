import { foreach, isObj } from "../utils/utils";
import { patch } from "./patch";


export default class Element {
    constructor(tag, props, ...children) {
        this.type = tag;
        this.props = props || {};
        this.children = children.flat().filter(el => el);

        this.element
    };

    render() {
        this.element = document.createElement(this.type)
        var props = this.props

        foreach(props, (value, name) => {
            if (name.startsWith("on") && name.toLowerCase() in window) value && this.element.addEventListener(name.toLowerCase().substring(2), value);

            else if (name === 'var') value && (this.element.var = value);

            else if (name === 'sh-if') value && (this.element.sh_if = value);

            else this.element.setAttribute(name, value && value.toString());
        })

        var children = this.children || []

        foreach(children, child => {
            var childEl = isObj(child) ? child.render() : document.createTextNode(child);
            this.element.appendChild(childEl);
        })

        this.element._owner_ = this;
        return this.element;
    };

    patch(patches, newobj) {
        if (this.element) {console.log(patches)
            patch(this.element.parentNode, patches)

            Object.assign(this, newobj)
        };
    };
}

