import Input from "../components/input";
import d, { Component } from "../core";


export default class Home extends Component {
    preInit() {
        this.teste = 'kkkkk'
        this.eu = false
        this.olocck = 'teste'
        this.seq = []
    }

    onInit() {
        /* setInterval(() => {
            this.teste = `${Math.random()}`
            this.state()
            this.eu = !this.eu
        },1000) */
        this.teste = `${Math.random()}`

        this.eu = !this.eu
        this.olocck = '32123'
        this.seq = this.eu ? [1, 2, 3, 4, 5] : [5, 4, 3, 2, 1]
    }

    handle() {
        this.teste = `${Math.random()}`

        this.eu = !this.eu
        this.olocck = this.seq.join(', ')
        this.seq = this.eu ? [1, 2, 3, 4, 5] : [5, 4, 3, 2, 1]
        this.state()
    }

    view() {
        return (
            <div state={this.olocck}>
                <h2>{this.teste}</h2>

                <Input value={this.teste} />
                <div style="background: rgba(255, 0, 255, 0.2);">
                    {this.seq.map(el => (<h3 key={el + ''}>{el + 'str'}</h3>))}
                </div>
                {this.eu ? <h2>h2 h2</h2> : 'teste de no de texto'}

                <h1>{this.teste}</h1>

                <button onClick={() => {
                    this.handle()
                }}>sdasda</button>
            </div>
        )
    }
}