import Component from "../component/component.js";

export default class MainView extends Component {
    constructor(props, children){
        super(props, children);
    };

    setTitle(title) {
        document.title = title;
    };

    localUserData() {
        let data = localStorage.getItem('auth');
        return JSON.parse(data);
    };
}
