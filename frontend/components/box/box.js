import h, { Component } from "../../core/index.js";


export default class Box extends Component {
    preInit() {
        this.title = this.props.title || '';
        this.id = this.props.id ? { id: this.props.id } : {};
        this.min = this.props.minimizable ? (this.props.minimizable || '') : '';
    };

    minimizeHandle(e) { e.target.parentNode.parentNode.classList.toggle('minimized'); };

    view() {
        return (
            <section class={`box-container ${this.props.class || ''} ${this.min === 'min' ? 'minimized' : ''}`} {...this.id}>

                <div class="box-header">
                    {this.props.minimizable && <span onClick={this.minimizeHandle} class="box-btn-arrow"></span>}

                    
                        <div>
                            <span class="title">{this.title}</span>
                        </div>
                    

                    <div class="header-btns" var={this.props.btns_bind || ''}>
                        {this.props.btns}
                    </div>

                </div>

                <div class="cards" var={this.props.content_bind || ''}>
                    {this.children}
                </div>

            </section>
        );
    };
};
