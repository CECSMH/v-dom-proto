import { App } from './core/index.js';
import routes from './routes.js';

const app = App();

app.routes(routes).anchorSelectors('[link-to]')

window.onload = app.run();
