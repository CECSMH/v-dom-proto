
export default function structure_binder(element) {

    let sh_s = {}, sh_n = {};

    shChilds(element, sh_s);

    if(!Object.keys(sh_s).length) return;

    for (let name in sh_s) {
        setObjProperty(name, sh_s[name], sh_n);
    };

    return sh_n;
};


function setObjProperty(prop, elements, sh_n) {
    if (!sh_n.hasOwnProperty(prop)) {

        const setter = value => {
            for (var element of elements) { !!value ? show(element) : hide(element); };
        };

        const getter = () => { return elements.some(el => el.isConnected === true); };

        Object.defineProperty(sh_n, prop, {
            set: setter,
            get: getter,
            enumerable: true
        });
    };
};


function hide(element) {
    if (!element.isConnected) return;
    element.parentNode.replaceChild(element._marker_, element);
};


function show(element) {
    if (element.isConnected) return;
    element._marker_.parentNode.replaceChild(element, element._marker_);
};


function shChilds(element, sh) {
    for (let el of element.childNodes) {
        if (el.sh_if) {

            el._marker_ = document.createComment(' ');

            sh[el.sh_if] ? sh[el.sh_if].push(el) : sh[el.sh_if] = [el];

        } else shChilds(el, sh);
    };
};
