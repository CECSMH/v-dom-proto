
export default function data_binder(element, newScope) {
    let scope = {}

    varChilds(element, scope);

    if (!Object.keys(scope).length) return;

    for (let name in scope) { setObjProperty(name, scope[name], newScope); };

    return;
};


function varChilds(element, scope) {
    for (let el of element.childNodes) {
        if (el.var) scope[el.var] ? scope[el.var].push(el) : scope[el.var] = [el];
        else varChilds(el, scope);
    };
};


function setObjProperty(prop, elements, newScope) {
    if (!newScope.hasOwnProperty(prop)) {
        let value;

        const setter = newValue => {
            value = newValue;

            for (let element of elements) {

                if (element.type && ['text', 'textarea', 'date', 'number'].find(t => t === element.type)) element.value = newValue;

                else if (element.type && element.type === 'checkbox') element.checked = newValue ? true : false;

                else if (typeof newValue === 'object') {

                    if (newValue.style && !(newValue instanceof HTMLElement)) {
                        for (var stl in newValue.style) { element.style[stl] !== undefined && (element.style[stl] = newValue.style[stl]); };
                        return;
                    };

                    if (Array.isArray(newValue)) element.replaceChildren(...newValue);
                    else element.replaceChildren(newValue);

                    data_binder(element, newScope);

                } else if (!element.type) element.innerHTML = newValue;
            };
        };

        const getter = () => {
            let element = elements[0]
            if (element.type && ['text', 'textarea', 'date', 'select-one', 'password', 'number'].find(t => t === element.type)) return element.value;

            else if (element.type && element.type === 'checkbox') return element.checked

            else if (['SECTION', 'DIV'].find(t => t === element.tagName)) return element.childNodes;

            return value;
        }

        Object.defineProperty(newScope, prop, {
            set: setter,
            get: getter,
            enumerable: true
        });

        for (let element of elements) {
            if (element.type) {
                if (element.type === 'text' || element.type === 'textarea') element.addEventListener('keyup', () => newScope[prop] = element.value);

                if (element.type === 'date' || element.type === 'select-one') element.addEventListener('change', () => newScope[prop] = element.value);

                if (element.type === 'checkbox') element.addEventListener('change', () => newScope[prop] = element.checked);
            };
        };
    };
};
