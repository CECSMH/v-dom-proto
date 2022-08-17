import h from "../engine/createElement.js";
import { diff } from "../engine/diff.js";
import pb from "../engine/pubsub.js";
import Routes from "./routes.js";

let routeStack = [];
let currentRoute = {};
let rootElement = document.querySelector('#root');
let linkSelector = '[link]';
let defaultPath = '/';
let notFoundPath = '';
let currentDom;

export default function app() {
    return {
        run: () => { run() },
        routes: function (routes = []) { addRoutes(routes); return this; },
        anchorSelectors: function (selector) { addPreventLink(selector); return this; },
        root: function (element) { changeRoot(element); return this; },
        navigate: function (url) { navigate(url); return this; }
    };
};

export { navigate, isCurrent };

function run() {
    window.addEventListener('popstate', () => router());

    document.querySelector('body').addEventListener('click', e => {
        if (e.target.matches(linkSelector)) {
            e.preventDefault();
            navigate(e.target.href);
        }
    });

    router();
};

function addPreventLink(selector) { linkSelector = selector; };

function changeRoot(element) { rootElement = element; };

function addRoutes(routes = []) {
    if (routes instanceof Routes) routeStack.push(...routes.stack);
    else routeStack.push(...routes);
};

function routeMatch() {
    const routeMatch = routeStack.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let current = routeMatch.find(route => route.result != null);
    if (!current) return navigate(notFoundPath || defaultPath);

    let params = get_params(current), query = get_query(location.search);

    currentRoute = { route: current.route, params, query };
};

function router() {
    routeMatch();

    let idx = 0;

    const { route, params, query } = currentRoute;
    const { path, middlewares, component } = route;
    const Component = component;

    const exec_middleware_row = async (data) => {
        let prevIndex = -1

        const next = async (index) => {
            if (index === prevIndex) {
                throw new Error('next() foi chamado mais de uma vez em uma mesma função');
            };

            prevIndex = index;

            const middleware = middlewares[index];

            if (middleware) await middleware(() => { idx++; return next(index + 1) }, data);
        };

        await next(idx);
    };

    if (middlewares.length > 0) exec_middleware_row({ path, params, query });

    if (idx === middlewares.length) {
        pb.clearAll();


        const el = (<Component params={params} query={query} />)

        if(currentDom){
            currentDom.patch(diff(el, currentDom), el) 
        }else{
            rootElement.replaceChildren(el.render())
            currentDom = el
        }


        pb.publish('component', {});
    };
};

function navigate(url) {
    history.pushState(null, null, url);
    router();
};


function isCurrent(url = '') { return !!location.pathname.match(pathToRegex(url)); };


function get_params(route) {
    const values = route.result.slice(1);
    const keys = Array.from(route.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => { return [key, values[i]]; }));
};


function get_query(qrystr) {
    const search = new URLSearchParams(qrystr);

    return [...search.entries()].reduce((ac, el) => {
        const [key, val] = el;

        if (ac.hasOwnProperty(key)) {
            if (Array.isArray(ac[key])) ac[key].push(val);
            else ac[key] = [ac[key], val];

        } else ac[key] = val;

        return ac;
    }, {});
};


function pathToRegex(path) { return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "/?$"); };
