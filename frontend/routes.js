import { Routes } from "./core/index.js";
import Home from "./views/home.js";
import Home2 from "./views/home2.js";

const routes = new Routes();

routes.add('/', Home);
routes.add('/t2', Home2);

export default routes;