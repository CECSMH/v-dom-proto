
import h, { Component } from "../core";
import Main from '../components/main/main.js'
import Box from '../components/box/box.js'
import Input from '../components/input/input.js'


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
            <Main userName="carlos" >
                <section class="vertical-boxes"> 
                    <Box>
                        <Input title="data" type="date"/>
                        <Input title="switch" type="toogle"/>
                        <Input title="texto" />
                        <h2 id="nsd" class="nn">kkk</h2>
                    </Box>
                </section>
            </Main>
        )
    }
}