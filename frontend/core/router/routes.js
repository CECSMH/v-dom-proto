
export default function Routes() {
    this.stack = [];
    this.middleware = [];
    this.prefix = '';
};


Routes.prototype.group = function (prefix, callback) {

    this.prefix = pathResolve(prefix);

    if (typeof callback === 'function') callback();

    this.prefix = '';
};


Routes.prototype.middlewares = function (callback, ...middlewares) {
    for (let middleware of middlewares) {
        if (typeof middleware === 'function') this.middleware.push(middleware);
        else throw new Error(`Grupo. Middleware(s) referenciado(s) não é(são) função!`);
    };

    if (typeof callback === 'function') callback();

    this.middleware = [];
};

Routes.prototype.name = function (name = ''){

};

Routes.prototype.add = function (path = '', ...args) {
    if (path === '' || typeof path !== 'string') return;

    let route = {}, uri = '';

    if (this.prefix !== '') uri += this.prefix;

    route.path = this.prefix && path === '/' ? uri : uri + pathResolve(path);

    route.middlewares = this.middleware.length > 0 ? this.middleware : [];

    if (args.length === 1) {

        if (typeof args[0] === 'function') route.component = args[0]
        else throw new Error(`Rota "${path}": Componente referenciado não é função!`);

    } else {
        let component = args.pop();
        let middles = args;

        if (!typeof component === 'function') throw new Error(`Rota "${path}": Componente referenciado não é função!`);

        for (var middle of middles) {
            if (!typeof middle === 'function') throw new Error(`Rota "${path}": Middleware(s) referenciado(s) não é(são) função!`);
        };

        route.component = component;
        route.middlewares.push(...middles);
    }

    if (route.component) this.stack.push(route);
};


function pathResolve(path) {
    let resolved = '';
    if (path !== '/') {
        resolved = path[0] === '/' ? path : '/' + path;
        resolved.at(-1) === '/' && (resolved = resolved.slice(0, -1));
    } else resolved = '/';

    return resolved;
};

