import h from '../../core/index.js'

import Header from '../header/header.js';
import Footer from '../footer/footer.js';

export default function Main(props = {}, children) {
    const userName = props.userName || '';

    return (
        <section class="container">

            <Header ref={props.ref || ''} userName={userName} hide={props.hideHeader} />

            <main>
                <section class="container">
                    {children}
                </section>
            </main>

            <Footer />

        </section>
    );
};
