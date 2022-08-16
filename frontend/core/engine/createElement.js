
import { diff } from "./diff.js";
import Element from "./element.js";
import listdiff from "./listDiff.js";

export default function d(tag, props, ...children) {

    if (typeof tag === 'function') {
        const component = new tag(props, children);

        if (typeof component.view === 'function') {
            const element = component.view();

            component.state = (n) => {
                const newobj = component.view()
                const patches = diff(newobj, element)


                element.patch(patches, newobj)
            }

            return element;
        };

        return component;
    };

    return new Element(tag, props, ...children);
}

