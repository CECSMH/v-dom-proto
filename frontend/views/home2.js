
import h, { Component } from "../core";
import Main from '../components/main/main.js'
import Box from '../components/box/box.js'
import Input from '../components/input/input.js'


export default class Home2 extends Component {
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
                <section class="horizontal-boxes"> 
                    <Box>
                        <Input title="texto" />
                        <Input title="data" type="date"/>
                        <Input title="switch" type="toogle"/>
                    </Box>
                    <Box>
                        <Input title="texto" />
                        <Input title="data" type="date"/>
                        <Input title="switch" type="toogle"/>
                    </Box>
                </section>
            </Main>
        )
    }
}