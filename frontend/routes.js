import { Routes } from "./core/index.js";
import Home from "./views/home.js";

const routes = new Routes();

routes.add('/', Home);

export default routes;