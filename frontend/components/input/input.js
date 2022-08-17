import h, { Component } from '../../core/index.js'


const id = 'temp_' + Math.random() + '_' + Math.random();

export default class Input extends Component {

    preInit() {
        this.type = this.props.type || 'text';
        this.isDisabled = this.props.disabled || false;
        this.title = this.props.title || '';
        this.typeDefine();

        const span = (<span style="display: none; white-space: nowrap; padding: 2px; font-size: 14px;">{this.title}</span>).render();

        document.querySelector('body').appendChild(span);

        span.style.display = '';

        this.width = this.props.type === 'textarea' ? 'auto; border-radius: 4px 4px 0 0;' : span.offsetWidth + 'px;';

        span.remove();
    };

    typeDefine() {
        let props = {};

        props['var'] = this.props['var'] || '';

        if (!this.isDisabled) {
            this.props.maxlength && (props.maxlength = this.props.maxlength);
            this.props.onKeydown && (props.onKeydown = this.props.onKeydown);
            this.props.onChange && (props.onChange = this.props.onChange);
            this.props.onKeyup && (props.onKeyup = this.props.onKeyup);
            this.props.onBlur && (props.onBlur = this.props.onBlur);
            this.props.min && (props.min = this.props.min);
        } else props.disabled = true;

        switch (this.type) {
            case 'text':
            case 'password':
            case 'number':
            case 'date': this.input = <input class="v-input" {...props} type={this.type} />;
                break;
            case 'select': this.input = <select class="v-input" {...props} ></select>;
                break;
            case 'textarea': this.input = <textarea class="ta-input" {...props} ></textarea>;
                break;
            case 'toogle': this.input = (
                <div>
                    <label class="switch">
                        <input type="checkbox" {...props} />
                        <span class="slider"></span>
                    </label>
                </div>
            ); break;
        };
    };

    view() {
        return (
            <article sh-if={this.props['sh-if'] || ''}
                class={this.type === 'textarea' ? "textarea-board" : (this.type === 'toogle' || this.type === 'number') ? 'toogle-board' : "input-board"}
                shadow-warning={this.props['shadow-warning'] || ''}>

                <input style={`width: ${this.width}`} value={this.title} class="t-input" disabled />

                {this.input}

                {this.children}

            </article >
        );
    };
};

