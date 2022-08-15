import { pb, navigate, isCurrent } from "../index.js";


export default class Component {
    constructor(props, children) {
        this.props = props || {};
        this.children = children || {};
        this.params = this.props.params || {};
        this.query = this.props.query || {};

        this.router = {navigate, isCurrent};

        this.preInit();
        typeof this.onInit === "function" && this.listen('component', () => this.onInit(), true, true);
    };
    /**
     * @description Função chamada antes do carregamento da view
     *
     */
    preInit() { return; };
    /**
     *
     * @description Função chamada depois do carregamento ta view
     */
    /**
     *
     * @param {String} subject - Nome do canal a ser ouvido
     * @param {Function} callback - Função a ser executada quando canal for desparado, pode ou não receber argumentos.
     * @param {Boolean} justOne - Executa apenas uma vez
     */
    listen(subject, callback, afterExecute = false, justOne = false) {
        let sub = pb.subscribe(subject, data => { callback(...data); afterExecute && pb.unsubscribe(sub); }, justOne);
    };
    /**
     *
     * @param {String} subject - Nome do canal a ser desparado
     * @param  {...any} data - Parâmetros que serão passados a todos os ouvintes do canal desparado
     */
    dispatch(subject, ...data) { pb.publish(subject, ...data) };

    view() { return; };
};
